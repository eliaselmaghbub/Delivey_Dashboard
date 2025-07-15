<template>
  <div>
    <ModulesSettingsFiscalYearsHeroCard :module-name="moduleName" />
    <ModulesSettingsFiscalYearsButtonsCard :module-name="moduleName" />
    <ModulesSettingsFiscalYearsTheTable
      del-key="year"
      :headers="headers"
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'FiscalYears',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/settings/fiscalYears'

    const { data } = await $axios.$get('/fiscal-years')
    await store.dispatch(`${moduleName}/getAllDataFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'year',
          label: 'السنة',
          sortable: true
        },
        {
          key: 'isClosed',
          label: 'الحالة',
          sortable: true,
          formatter: (value, i) => {
            return value ? 'مغلق' : 'مفتوح'
          }
        },
        {
          key: 'close',
          label: 'إغلاق',
          sortable: true
        },
        {
          key: 'reopen',
          label: 'إعادة فتح',
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
      title: 'السنوات المالية'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
