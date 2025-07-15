<template>
  <div>
    <ModulesProcessesInitialStocktakesHeroCard :module-name="moduleName" />
    <ModulesProcessesInitialStocktakesButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      del-key="fullSerialNumber"
      path="/processes/initial-stocktakes"
      prevent-delete-if-is-confirmed="isConfirmed"
    />
  </div>
</template>

<script>
export default {
  name: 'InitialStocktakes',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/initialStocktakes'

    const { data } = await $axios.$get('/initial-stocktakes')

    await store.dispatch(
      `${moduleName}/getAllDataFromApi`,
      data.initialStocktakes
    )
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'fullSerialNumber',
          label: 'الرقم التسلسلي',
          sortable: true
        },
        {
          key: 'date',
          label: 'التاريخ',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },
        {
          key: 'statement',
          label: 'البيان',
          tdClass: 'td-truncate',
          sortable: true
        },
        {
          key: 'storeName',
          label: 'المخازن',
          tdClass: 'td-fit',
          sortable: true
        },
        {
          key: 'isConfirmed',
          label: 'الحالة',
          tdClass: 'td-fit',
          sortable: true,
          formatter: value => (value ? 'معتمد' : 'غير معتمد')
        },
        {
          key: 'totalCost',
          label: 'إجمالي التكلفة',
          sortable: true,
          formatter: this.formatValue
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
      title: 'جرد أول المدة'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
