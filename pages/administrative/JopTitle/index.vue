<template>
  <div>
    <ModulesAdministrativeJopTitleHeroCard :module-name="moduleName" />
    <ModulesAdministrativeJopTitleButtonsCard :module-name="moduleName" />
    <!-- <ModulesAdministrativeJopTitleSearchCard :module-name="moduleName" /> -->
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
    const moduleName = 'modules/administrative/jopTitle'

    const { data } = await $axios.$get('/JobTitle')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.jobTitles)
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'name',
          label: 'الاسم',
          sortable: true
        },
        {
          key: 'organizationName',
          label: 'الوحدة التنظيمية',
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
          key: 'actions',
          label: 'إجراءات',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: 'الصفة الوظيفية'
    }
  }
}
</script>

<style lang="scss" scoped></style>
