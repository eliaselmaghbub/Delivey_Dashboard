<template>
  <WrapTheCard title="بيانات الموظف">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم الموظف"
            store-key="firstName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="رقم الهاتف"
            store-key="phoneNumber"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="العنوان"
            store-key="address"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            v-if="table.roles === 'Owner'"
            label="المناطق"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
            lg="4"
          />

          <!-- <FormFVSelect
            v-else
            label="الفروع"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
            lg="4"
            disabled
          /> -->

          <FormFInput
            label="اسم المستخدم"
            store-key="userName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="كلمة المرور"
            store-key="password"
            :module-name="moduleName"
            lg="4"
          />

          <!-- <FormFVSelect
            label="الصلاحية"
            store-key="permissions"
            list-key="permissionList"
            :module-name="moduleName"
            label-select="roleName"
            value-select="roleName"
            lg="4"
            multiple
          /> -->
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
    table() {
      return this.$store.getters[`${this.moduleName}/table`]
    }
  }
}
</script>

<style lang="scss" scoped></style>
