<template>
  <div>
    <ModulesAdministrativeListOfDepartmentsSearchCard
      :module-name="moduleName"
    />
    <ModulesAdministrativeListOfDepartmentsSearchButtonsCard
      :module-name="moduleName"
    />

    <ModulesAdministrativeListOfDepartmentsTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
      path="/administrative/employees"
    />
  </div>
</template>

<script>
export default {
  name: 'employees',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/administrative/employees'

    const { data } = await $axios.$get('/Employees')

    // const data2 = await $axios.$get('/Employees/new')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.employees)

    // await store.dispatch(`${moduleName}/getAllListsFromApi`, data2.data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'jobNumber',
          label: 'الرقم الوظيفي',
          sortable: true
        },
        {
          key: 'fullName',
          label: 'الاسم',
          sortable: true
        },

        {
          key: 'nationalNumber',
          label: 'الرقم الوطني',
          sortable: true
        },

        {
          key: 'phone',
          label: 'رقم الهاتف',
          sortable: true
        },

        {
          key: 'birthDate',
          label: 'تاريخ الميلاد',
          sortable: true
        },

        {
          key: 'residence',
          label: 'الاقامة',
          sortable: true
        },

        {
          key: 'departmentName',
          label: 'يتبع ل',
          sortable: true
        },

        {
          key: 'isManager',
          label: 'مخول بالإعتماد',
          sortable: true,
          formatter: (value, key) => {
            return value ? 'نعم' : 'لا'
          }
        },
        {
          key: 'jobTitle',
          label: 'الصفة الوظيفية',
          sortable: true
        },

        {
          key: 'actions',
          label: 'إجراءات',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: 'الموظفين'
    }
  }
}
</script>

<style lang="scss" scoped></style>
