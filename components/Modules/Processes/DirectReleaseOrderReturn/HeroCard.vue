<template>
  <WrapTheCard title="الجرد">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="رقم التسلسلي"
            store-key="Barcode"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="نوع الفاتورة"
            store-key="IsConfirmed"
            list-key="isConfirmedList"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            label="من تاريخ"
            store-key="DateFrom"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            label="الى تاريخ"
            store-key="DateTo"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="المخازن"
            store-key="StoredItemId"
            list-key="storesList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
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
  computed: {
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    }
  }
}
</script>

<style lang="scss" scoped></style>
