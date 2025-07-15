<template>
  <div>
    <ModulesProcessesStocktakesEditorHeroCard :module-name="moduleName" />
    <ModulesProcessesStocktakesEditorButtonsCard :module-name="moduleName" />

    <ModulesProcessesStocktakesEditorTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'DirectreleaseEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/stocktakes/editor'
    await store.dispatch(`${moduleName}/resetData`)
    await store.commit(`${moduleName}/setListsValue`, {
      key: 'detailsTable',
      value: []
    })

    const params = {
      loadCategories: true
    }

    const { data } = await $axios.$get('/stocktakes/new', {
      params
    })

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'itemName',
          label: 'اسم الصنف',
          sortable: true
        },

        {
          key: 'quantity',
          label: 'الكمية',
          sortable: true
        },

        {
          key: 'cost',
          label: 'اجمالي التكلفة',
          sortable: true
        },
        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },

        {
          key: 'newQuantity',
          label: 'الكمية الجديدة',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: '  الجرد | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
