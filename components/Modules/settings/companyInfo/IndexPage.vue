<template>
  <div>
    <b-card
      no-body
      class="card-statistics"
    >
      <b-card-body class="statistics-body">
        <b-row>
          <FormFInput
            label="اسم الجهة"
            store-key="fullName"
            :module-name="moduleName"
          />
          <FormFInput
            label="الوصف الوظيفي لعمل الجهة"
            store-key="shortName"
            :module-name="moduleName"
          />
          <FormFInput
            label="الاسم الإنجليزي"
            store-key="englishName"
            :module-name="moduleName"
          />
          <FormFInput
            label="العنوان"
            store-key="address"
            :module-name="moduleName"
          />
          <FormFInput
            label="رقم الهاتف"
            store-key="phone"
            :module-name="moduleName"
          />
          <FormFInput
            label="البريد الإلكتروني"
            store-key="email"
            :module-name="moduleName"
          />
          <FormFInput
            label="الفاكس"
            store-key="fax"
            :module-name="moduleName"
          />
          <FormFInput
            label="الموقع الإلكتروني"
            store-key="web"
            :module-name="moduleName"
          />
        </b-row>
      </b-card-body>
    </b-card>
    <b-card
      no-body
      class="card-statistics mt-2"
    >
      <b-card-body class="statistics-body">
        <b-row class="justify-content-center">
          <b-button
            class="btn-w"
            variant="primary"
            @click="saveToDB"
          >
            حفظ
          </b-button>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moduleName: 'modules/settings/companyInfo'
    }
  },
  methods: {
    saveToDB() {
      this.$store.dispatch(`${this.moduleName}/saveToDB`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
