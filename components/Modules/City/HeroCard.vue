<template>
  <WrapTheCard title="المدن">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم المدينة"
            store-key="name"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="سعر التوصيل"
            store-key="price"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            v-if="fields.roles === 'Owner'"
            label="المناطق"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
            lg="4"
          />

          <FormFVSelect
            v-else
            label="المناطق"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
            lg="4"
            disabled
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
