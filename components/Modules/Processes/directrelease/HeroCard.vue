<template>
  <b-card no-body>
    <b-card-header>
      <!-- <b-card-title class="text-primary fw-bold fs-4">البحث</b-card-title> -->
    </b-card-header>

    <b-card-body>
      <b-row>
        <FormFInput
          label="رقم اذن الصرف"
          store-key="fullNumber"
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

        <FormFVSelect
          label="الجيهة المستلمة"
          store-key="deparmentId  "
          list-key="departments"
          :module-name="moduleName"
          label-select="name"
          value-select="id"
          lg="4"
        />

        <FormFVSelect
          label="الموظف المستلم"
          store-key="employeeId"
          list-key="employees"
          label-select="fullName"
          value-select="id"
          :module-name="moduleName"
          lg="4"
        />

        <FormFVSelect
          label="حالة امر الصرف"
          store-key="isConfirmed"
          list-key="isConfirmedList"
          :module-name="moduleName"
          lg="4"
        />

        <FormFDate
          label="من تاريخ"
          store-key="dateFrom"
          :module-name="moduleName"
          lg="4"
        />

        <FormFDate
          label="إلي تاريخ"
          store-key="dateTo"
          :module-name="moduleName"
          lg="4"
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
