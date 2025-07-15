<template>
  <WrapTheCard title="الموردين">
    <b-card no-body>
      <!-- <b-card-header>
        <b-card-title class="text-primary fw-bold fs-4">الأصناف</b-card-title>
      </b-card-header> -->

      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم المورد"
            store-key="fullName"
            :module-name="moduleName"
          />

          <FormFInput
            label="العنوان"
            store-key="address"
            :module-name="moduleName"
          />

          <FormFInput
            label="رقم الموبايل"
            store-key="phone1"
            :module-name="moduleName"
          />

          <FormFInput
            label="اسم المندوب"
            store-key="representative"
            :module-name="moduleName"
          />

          <FormFInput
            label="الهاتف الارضي"
            store-key="internationalPhone"
            :module-name="moduleName"
          />

          <FormFInput
            label="البريد الإلكتروني"
            store-key="email"
            :module-name="moduleName"
          />

          <FormFInput
            label="الجودة %"
            store-key="quality"
            :module-name="moduleName"
            type="number"
            change
          />

          <FormFInput
            label=" حسن المعاملة %"
            store-key="transaction"
            :module-name="moduleName"
            type="number"
            change
          />

          <FormFInput
            label=" سرعة التنفيذ % "
            store-key="executionSpeed"
            :module-name="moduleName"
            type="number"
            change
          />

          <FormFSwitcher
            label="توفر بيع بالأجل"
            store-key="saleOnCredit"
            :module-name="moduleName"
            lg="4"
          />
        </b-row>
      </b-card-body>
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
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async generateBarcode() {
      this.loading = true
      await this.$store.dispatch(`${this.moduleName}/generateBarcode`)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
