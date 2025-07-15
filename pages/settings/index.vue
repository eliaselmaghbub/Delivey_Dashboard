<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <b-tabs pills>
      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <div
            class="ml-0 ml-sm-50"
            v-html="$feathericons['user'].toSvg()"
          />

          <span class="d-none d-sm-inline">الحساب</span>
        </template>
        <b-card class="py-2">
          <b-row>
            <FormFInput
              label="اسم المستخدم"
              store-key="userName"
              :module-name="moduleName"
              lg="6"
            />
            <FormFInput
              label="اسم الدخول"
              store-key="loginName"
              :module-name="moduleName"
              lg="6"
            />
            <FormFInput
              label="كلمة المرور السابقة"
              store-key="oldPassword"
              :module-name="moduleName"
              type="password"
              lg="4"
            />
            <FormFInput
              label="كلمة المرور الجديدة"
              store-key="newPassword"
              :module-name="moduleName"
              type="password"
              lg="4"
            />
            <FormFInput
              label="تأكيد كلمة المرور"
              store-key="confirmPassword"
              :module-name="moduleName"
              type="password"
              lg="4"
            />
          </b-row>
          <div class="text-left mt-3">
            <b-button variant="primary">حفظ</b-button>
          </div>
        </b-card>
        <b-card
          v-if="$auth.user.enableTowFact"
          v-show="false"
        >
          <div class="d-flex justify-content-between align-items-center py-2">
            <h4>Two-Factor Authentication (2FA)!</h4>
            <b-form-checkbox
              v-model="toggleToDisabled"
              switch
            >
              {{ toggleToDisabled ? 'مفعل' : 'غير مفعل' }}
            </b-form-checkbox>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2" />
          <div class="text-left">
            <b-button
              :disabled="activeLoading2"
              variant="primary"
              class="btn"
              @click="disabled2Fa"
            >
              حفظ
              <b-spinner
                v-if="activeLoading2"
                small
              />
            </b-button>
          </div>
        </b-card>
        <b-card
          v-else
          v-show="false"
        >
          <div class="d-flex justify-content-between align-items-center py-2">
            <h4>Two-Factor Authentication (2FA)!</h4>
            <b-form-checkbox
              v-model="toggle"
              switch
            >
              {{ toggle ? 'مفعل' : 'غير مفعل' }}
            </b-form-checkbox>
          </div>
          <div class="d-flex justify-content-center align-items-center py-2">
            <img
              v-if="url"
              class="img-qr"
              :src="url"
              alt="qr"
            />
          </div>
          <div class="text-left">
            <b-button
              :disabled="activeLoading"
              variant="primary"
              class="btn"
              @click="enable2Fa"
            >
              حفظ
              <b-spinner
                v-if="activeLoading"
                class="ml-1"
                small
              />
            </b-button>
          </div>
        </b-card>
      </b-tab>

      <!-- Tab: Information -->
      <b-tab disabled>
        <template #title>
          <div
            class="ml-0 ml-sm-50"
            v-html="$feathericons['info'].toSvg()"
          />
          <span class="d-none d-sm-inline">المعلومات</span>
        </template>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'Setting',

  asyncData({ store }) {
    const moduleName = 'modules/settings/profile'
    const user = store.$auth.user
    store.dispatch(`${moduleName}/setData`, user)
    return {
      moduleName
    }
  },

  data() {
    return {
      toggle: false,
      toggleToDisabled: true,
      url: null,
      key: null,
      activeLoading: false,
      activeLoading2: false
    }
  },
  watch: {
    toggle(newValue, oldValue) {
      if (newValue) {
        this.getQrCode()
      } else {
        this.url = null
      }
    }
  },
  methods: {
    async getQrCode() {
      const params = {
        userName: this.$auth.user.loginName
      }
      const { data } = await this.$axios.$get('/Profile/generate_two_factor', {
        params
      })
      this.url = data.qrCodeImageUrl
      this.key = data.key
    },
    async enable2Fa() {
      this.activeLoading = true
      const schema = {
        enableTowFact: true,
        key: this.key
      }

      const { data } = await this.$axios.$put('/Profile/edit_tow_fact', schema)
      if (data.enableTowFact) {
        await this.$auth.fetchUser()
        this.$toast.success('تم التفعيل بنجاح')
        this.toggleToDisabled = true
        this.activeLoading = false
      }
      // console.warn("data", data);
    },
    async disabled2Fa() {
      this.activeLoading2 = true
      const schema = {
        enableTowFact: false,
        key: null
      }

      await this.$axios.$put('/Profile/edit_tow_fact', schema)
      await this.$auth.fetchUser()
      this.$toast.success('تم إلغاء التفعيل بنجاح')
      this.toggle = false
      this.activeLoading2 = false
    }
  }
}
</script>

<style lang="scss" scoped>
.img-qr {
  width: 171px;
  height: 171px;
}
</style>
