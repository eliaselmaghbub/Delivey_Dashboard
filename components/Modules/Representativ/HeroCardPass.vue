<template>
  <WrapTheCard title="تغيير كلمة المرور">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم المستخدم"
            store-key="userNameChang"
            :module-name="moduleName"
            lg="4"
            disabled
          />

          <FormFInput
            label="كلمة المرور"
            store-key="passwordChang"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="تاكيد كلمة المرور"
            store-key="confirmNewPassWord"
            :module-name="moduleName"
            lg="4"
          />

          <!-- <FormFSwitcher
            label="تغيير كلمة المرور"
            store-key="ChangePass"
            :module-name="moduleName"
            ok="نعم"
            no="لا"
          /> -->
        </b-row>
      </b-card-body>
    </b-card>
    <b-card>
      <b-row class="justify-content-center align-items-center row-buttons">
        <b-button
          variant="primary"
          class="btn-w"
          :disabled="loading"
          @click="save"
        >
          حفظ
          <b-spinner
            v-if="loading"
            class="me-2"
            small
          />
        </b-button>
      </b-row>
    </b-card>
  </WrapTheCard>
</template>

<script>
export default {
  props: {
    moduleName: {
      type: String,
      default: null
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
      if (this.fields.id) {
        await this.$store.dispatch(`${this.moduleName}/updatePass`)
      }
      await this.$nuxt.refresh()
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
