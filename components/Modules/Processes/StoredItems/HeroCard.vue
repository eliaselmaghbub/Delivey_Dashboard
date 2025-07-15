<template>
  <WrapTheCard title="البحث في المخازن">
    <b-card no-body>
      <!-- <b-card-header>
        <b-card-title class="text-primary fw-bold fs-4">
          البحث في المخازن
        </b-card-title>
      </b-card-header> -->

      <b-card-body>
        <b-row>
          <FormFInput
            label="رمز الباركود"
            store-key="Barcode"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="اسم الصنف"
            store-key="ItemId"
            list-key="itemsList"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="التصنيف"
            store-key="CategoryId"
            list-key="categoriesList"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            lg="4"
          />

          <FormFVSelect
            label="المخازن"
            store-key="StoreId"
            list-key="storesList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
          />

          <FormFInput
            label="اقل كمية"
            store-key="MinQuantity"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="اكبر كمية"
            store-key="MaxQuantity"
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

          <FormFDate
            v-if="fields.IsExpire"
            label="تاريخ صلاحية من"
            store-key="ExpireDateFrom"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            v-if="fields.IsExpire"
            label="تاريخ صلاحية الى"
            store-key="ExpireDateTo"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="البحث بتاريخ الصلاحية"
            store-key="IsExpire"
            :module-name="moduleName"
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
