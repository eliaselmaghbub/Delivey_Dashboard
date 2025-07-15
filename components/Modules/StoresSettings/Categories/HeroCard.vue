<template>
  <WrapTheCard title="التصنيفات">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الاسم"
            store-key="name"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="يتبع ل"
            store-key="parentId"
            list-key="categoriesList"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFInput
            label="رقم التصنيف"
            store-key="number"
            :module-name="moduleName"
            disabled
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
  }
}
</script>

<style lang="scss" scoped></style>
