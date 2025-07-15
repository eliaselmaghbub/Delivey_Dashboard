<template>
  <div>
    <ModulesAdministrativeDepartmentHeroCard :module-name="moduleName" />
    <ModulesAdministrativeDepartmentButtonsCard :module-name="moduleName" />
    <ModulesAdministrativeDepartmentSearchCard :module-name="moduleName" />
    <UtilsTheTable
      :not-id="false"
      :headers="headers"
      :module-name="moduleName"
      :edit-icon="true"
    />
  </div>
</template>

<script>
export default {
  name: 'Departments',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/administrative/departments'

    const { data } = await $axios.$get('/departments')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.departments)
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'num',
          label: '',
          sortable: true
        },
        {
          key: 'number',
          label: 'رقم القسم',
          sortable: true
        },
        {
          key: 'name1',
          label: 'الإدارات',
          sortable: true
        },

        {
          key: 'name3',
          label: 'الأقسام/المكاتب',
          sortable: true
        },

        {
          key: 'name4',
          label: 'الوحدات',
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

<style lang="scss" scoped>
</style>
