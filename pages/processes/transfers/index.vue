<template>
  <div>
    <ModulesAdministrativeTransfersHeroCard :module-name="moduleName" />
    <ModulesAdministrativeTransfersButtonsCard :module-name="moduleName" />
    <ModulesAdministrativeTransfersSearchCard :module-name="moduleName" />
    <!-- <UtilsTheTable
      :not-id="false"
      :headers="headers"
      :module-name="moduleName"
      :edit-icon="true"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'Departments',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/administrative/employees'

    const { data } = await $axios.$get('/Employees')

    const data2 = await $axios.$get('/Employees/new')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.employees)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data2.data)

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
          key: 'isManagerString',
          label: 'المنصب',
          sortable: true
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
      title: 'الهيكلية الإدارية'
    }
  }
}
</script>

<style lang="scss" scoped></style>
