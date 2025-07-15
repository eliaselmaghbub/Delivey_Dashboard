<template>
  <WrapTheCard title="الموظفين">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الاسم"
            store-key="FirstName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="اسم الاب"
            store-key="fatherName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="اسم الجد"
            store-key="grandFatherName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="اللقب"
            store-key="lastName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="الرقم الوطني"
            store-key="nationalNumber"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="رقم الهاتف"
            store-key="phone"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            label="تاريخ الميلاد"
            store-key="birthDate"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="الاقامة"
            store-key="residence"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="الرقم الوظيفي"
            store-key="JobNumber"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="يتبع ل"
            store-key="DepartmentId"
            list-key="departmentList"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFVSelect
            label="الصفة الوظيفية"
            store-key="JobTitleId"
            list-key="jobTitlesList"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFVSelect
            label="صفة الوظيفية للمدير المباشر"
            store-key="directManagerJobTitleId"
            list-key="directManagerJobTitleList"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="البريد الالكتروني"
            store-key="email"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="مخول بالإعتماد"
            store-key="IsManager"
            :module-name="moduleName"
            ok="نعم"
            no="لا"
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
  }
}
</script>

<style lang="scss" scoped></style>
