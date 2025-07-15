<template>
  <div>
    <ModulesProcessesPurchaseInvoicesEditorHeroCard :module-name="moduleName" />
    <ModulesProcessesPurchaseInvoicesEditorDetailsCard
      :module-name="moduleName"
    />
    <ModulesProcessesPurchaseInvoicesEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'PurchaseInvoicesEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/purchaseInvoices/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const params = {
      loadCategories: true
    }

    const { data } = await $axios.$get('/purchase-invoices/new', {
      params
    })

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'فواتير الشراء | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
