<template>
  <div>
    <ModulesAdministrativeEmployeesSearchCard :module-name="moduleName" />
    <ModulesAdministrativeEmployeesSearchButtonsCard
      :module-name="moduleName"
    />

    <ModulesAdministrativeEmployeesTheTable
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

    // const data2 = await $axios.$get('/employeesw')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.employees)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'nationalNumber',
          label: 'الرقم الوطني',
          sortable: true
        },

        {
          key: 'fullName',
          label: 'اسم الموظف',
          sortable: true
        },

        {
          key: 'jobNumber',
          label: 'رقم الموظف',
          sortable: true
        },

        {
          key: 'departmentName',
          label: 'الإدارة',
          sortable: true
        },

        {
          key: 'jobTitle',
          label: 'الصفة الوظيفية',
          sortable: true
        },

        {
          key: 'phone',
          label: 'رقم الهاتف',
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
