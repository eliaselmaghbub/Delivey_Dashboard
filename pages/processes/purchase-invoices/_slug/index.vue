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
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/processes/purchaseInvoices/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/purchase-invoices/${params.slug}`)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)
    await store.dispatch(`${moduleName}/showSingleData`, data)

    return {
      moduleName,
      title: data.fullSerialNumber
    }
  },
  head() {
    return {
      title: `فواتير الشراء | ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
