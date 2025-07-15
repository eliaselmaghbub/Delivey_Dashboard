<template>
  <WrapTheCard title="المستخدمين">
    <b-card
      no-body
      class="card-statistics"
    >
      <b-card-header>
        <b-card-title>{{ title }}</b-card-title>
      </b-card-header>
      <b-card-body class="statistics-body">
        <b-row>
          <FormFInput
            label="اسم المستخدم"
            store-key="name"
            :module-name="moduleName"
          />

          <FormFVSelect
            label="المجموعة"
            store-key="groupId"
            list-key="groupList"
            label-select="value"
            value-select="key"
            :module-name="moduleName"
          />

          <FormFSwitcher
            v-if="fields.isEdit"
            label="تغيير كلمة المرور"
            store-key="changePassword"
            :module-name="moduleName"
          />

          <FormFSwitcher
            label="حالة المستخدم"
            store-key="isActive"
            :module-name="moduleName"
            ok="نشط"
            no="غير نشط"
          />

          <FormFInput
            v-if="fields.changePassword"
            label="اسم الدخول"
            store-key="loginName"
            :module-name="moduleName"
          />

          <FormFInput
            v-if="fields.changePassword"
            label="كلمة المرور"
            store-key="password"
            type="password"
            :module-name="moduleName"
          />

          <FormFInput
            v-if="fields.changePassword"
            label="تأكيد كلمة المرور"
            store-key="confirmPassword"
            type="password"
            :module-name="moduleName"
          />
        </b-row>
        <b-row class="justify-content-center">
          <!-- <ButtonsButton /> -->
          <b-col
            class="text-center mt-1"
            lg="3"
            md="6"
            sm="12"
          >
            <b-button
              class="px-5"
              variant="primary"
              @click="newData"
            >
              جديد
            </b-button>
          </b-col>
          <!-- <ButtonsButton @click.native="searchData" label="بحث" /> -->
          <b-col
            class="text-center mt-1"
            lg="3"
            md="6"
            sm="12"
          >
            <b-button
              :disabled="loading"
              class="px-5"
              variant="primary"
              @click="save"
            >
              حفظ
              <b-spinner
                v-if="loading"
                class="me-2"
                small
              />
            </b-button>
          </b-col>
          <FormFSwitchToggle
            label="البحث المتقدم"
            store-key="toggle"
            :module-name="moduleName"
          />
        </b-row>
      </b-card-body>
    </b-card>
  </WrapTheCard>
</template>

<script>
export default {
  filters: {
    methodText: (value, i) => {
      switch (value) {
        case 1:
          return 'رقم الإيصال'
        case 2:
          return 'رقم الصك'
        case 3:
          return 'رقم الحوالة'
        default:
          return ''
      }
    },
    stateFilter(value, i) {
      switch (value) {
        case 1:
          return 'مفتوح'
        case 2:
          return 'مقفل'
        case 3:
          return 'ملغي'
        default:
          return null
      }
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    moduleName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    }
  },
  methods: {
    async save() {
      this.loading = await true
      await this.$store.dispatch(`${this.moduleName}/addToDB`).finally(() => {
        this.loading = false
      })
    },
    async newData() {
      await this.$store.dispatch(`${this.moduleName}/resetData`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
