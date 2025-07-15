<template>
  <WrapTheCard title="الهيكلية الإدارية">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم الوحدة التنظيمية"
            store-key="name"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="يتبع ل"
            store-key="parentId"
            list-key="departmentList"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFInput
            label="رقم القسم"
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
