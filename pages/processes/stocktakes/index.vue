<template>
  <div>
    <ModulesProcessesStocktakesHeroCard :module-name="moduleName" />
    <ModulesProcessesStocktakesButtonsCard :module-name="moduleName" />
    <!-- <ModulesAdministrativeJopTitleSearchCard :module-name="moduleName" /> -->
    <UtilsTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
      path="/processes/stocktakes"
    />
  </div>
</template>

<script>
export default {
  name: 'Stocktakes',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/stocktakes'

    const { data } = await $axios.$get('/stocktakes/2')

    // await store.dispatch(`${moduleName}/getAllDataFromApi`, data.jobTitles)
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
          sortable: true
        },

        {
          key: 'storeName',
          label: 'المخزن',
          sortable: true
        },

        {
          key: 'isConfirmed',
          label: 'الحالة',
          sortable: true,
          formatter: value => (value ? 'معتمد' : 'غير معتمد')
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
      title: 'الجرد'
    }
  }
}
</script>

<style lang="scss" scoped></style>
