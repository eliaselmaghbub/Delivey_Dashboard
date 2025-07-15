<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title class="text-primary fw-bold fs-4">
        صرف الى مخزن
      </b-card-title>
    </b-card-header>

    <b-card-body>
      <b-row>
        <FormFInput
          label="الرقم التسلسلي"
          store-key="firstName"
          :module-name="moduleName"
          lg="4"
        />

        <FormFDate
          label="التاريخ"
          store-key="birthDate"
          :module-name="moduleName"
          lg="4"
        />

        <FormFInput
          label="البيان"
          store-key="firstName"
          :module-name="moduleName"
          lg="4"
        />

        <FormFVSelect
          label="صرف من"
          store-key="departmentId"
          list-key="departmentList"
          :module-name="moduleName"
          lg="4"
          change
        />

        <FormFVSelect
          label="صرف الى"
          store-key="departmentId"
          list-key="departmentList"
          :module-name="moduleName"
          lg="4"
          change
        />
      </b-row>
    </b-card-body>
  </b-card>
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
