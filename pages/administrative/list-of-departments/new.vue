<template>
  <div>
    <ModulesAdministrativeListOfDepartmentsHeroCard :module-name="moduleName" />
    <ModulesAdministrativeListOfDepartmentsEmployeesHeroCard
      :module-name="moduleName"
    />

    <ModulesAdministrativeListOfDepartmentsButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'listOfDepartments',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/administrative/listOfDepartments/editor'

    const { data } = await $axios.$get('/listOfDepartments/new')

    await store.dispatch(`${moduleName}/getAllListsFromApiNew`, data)

    return {
      moduleName
    }
  },
  data() {
    return {}
  },
  head() {
    return {
      title: '  الوحدات التنظيمية لطلبات الأصناف | جديد'
    }
  }
}
</script>

<style lang="scss" scoped></style>
