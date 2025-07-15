<template>
  <div>
    <b-card
      no-body
      class="card-statistics"
    >
      <b-card-body class="statistics-body">
        <b-row>
          <FormFVSelect
            label="اللغة الافتراضية"
            store-key="defaultCulture"
            list-key="langsList"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            label="تاريخ بداية النظام"
            store-key="startingDate"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="وحدة المخازن"
            store-key="warehouseDepartmentId"
            list-key="warehouseDepartmentList"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="إظهار أسعار التكلفة في تقارير الصرف"
            store-key="showCost"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="آلية الصرف"
            store-key="exchangeMechanism"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="إظهار الأصناف التي تمتلك كمية تساوي صفر"
            store-key="showThenZero"
            :module-name="moduleName"
            lg="4"
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
      moduleName: 'modules/settings/systemConfiguration'
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
