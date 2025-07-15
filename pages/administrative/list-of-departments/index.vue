<template>
  <div>
    <ModulesAdministrativeListOfDepartmentsSearchButtonsCard
      :module-name="moduleName"
    />

    <ModulesAdministrativeListOfDepartmentsTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
      path="/administrative/list-of-departments"
    />
  </div>
</template>

<script>
export default {
  name: 'listOfDepartments',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/administrative/listOfDepartments'

    const { data } = await $axios.$get('/listOfDepartments')

    await store.dispatch(
      `${moduleName}/getAllDataFromApi`,
      data.listOfDepartments
    )

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'name',
          label: 'الإدارة',
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
      title: 'الوحدات التنظيمية لطلبات الأصناف'
    }
  }
}
</script>

<style lang="scss" scoped></style>
