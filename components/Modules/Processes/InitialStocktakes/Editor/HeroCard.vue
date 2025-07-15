<template>
  <WrapTheCard title="جرد أول المدة">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الرقم التسلسلي"
            store-key="fullSerialNumber"
            :module-name="moduleName"
            lg="4"
            disabled
          />

          <FormFDate
            label="التاريخ"
            store-key="date"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="المخازن"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
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
