<template>
  <WrapTheCard title="الصفة الوظيفية">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الاسم"
            store-key="Name"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="الوحدة التنظيمية"
            store-key="OrganizationId"
            list-key="departmentList"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFVSelect
            label="تصنيف المسمى الوظيفي"
            store-key="JobtitelClassification"
            list-key="jobtitelClassificationList"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFSwitcher
            label="كل الادارات"
            store-key="IsAllDepartment"
            :module-name="moduleName"
          />

          <FormFSwitcher
            label="مخول بالاعتماد"
            store-key="IsManager"
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
  }
}
</script>

<style lang="scss" scoped></style>
