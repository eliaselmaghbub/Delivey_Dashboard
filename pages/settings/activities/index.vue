<template>
  <div>
    <ModulesSettingsActivitiesHeroCard :module-name="moduleName" />
    <ModulesSettingsActivitiesButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :not-id="false"
      :headers="headers"
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'Activities',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/settings/activities'

    const { data } = await $axios.$get('/Activities')

    store.dispatch(`${moduleName}/getAllDataFromApi`, data.activities)
    store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'userName',
          label: 'إسم الدخول',
          sortable: true
        },
        {
          key: 'dateTime',
          label: 'التاريخ',
          sortable: true,
          formatter: this.formatDate
        },
        {
          key: 'type',
          label: 'واجهة',
          sortable: true
        },
        {
          key: 'action',
          label: 'نوع العملية',
          sortable: true,
          formatter: this.formatAction
        },
        {
          key: 'message',
          label: 'بيان النشاط',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: 'أنشطة المستخدمين'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
