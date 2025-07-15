<template>
  <WrapTheCard title="فواتير الشراء">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الرقم التسلسلي"
            store-key="serialNumber"
            :module-name="moduleName"
            lg="6"
            disabled
          />

          <FormFDate
            label="التاريخ"
            store-key="date"
            :module-name="moduleName"
            lg="6"
          />

          <FormFVSelect
            label="الموردين"
            store-key="supplierId"
            list-key="supplierList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="6"
          />

          <FormFVSelect
            label="المخازن"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="6"
          />

          <FormFInput
            label="البيان"
            store-key="statement"
            :module-name="moduleName"
            md="12"
            lg="12"
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
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
