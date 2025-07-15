<template>
  <WrapTheCard title="الوحدات التنظيمية لطلبات الأصناف">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="الهيكلية الإدارية"
            store-key="DepartmentId"
            list-key="departmentList"
            :module-name="moduleName"
            lg="4"
            change
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
