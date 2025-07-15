<template>
  <div>
    <ModulesProcessesPurchaseOrdersEditorHeroCard :module-name="moduleName" />
    <ModulesProcessesPurchaseOrdersEditorDetailsCard
      :module-name="moduleName"
    />
    <ModulesProcessesPurchaseOrdersEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'PurchaseOrdersEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/purchaseOrders/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get('/purchase-orders/new')

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'المشتريات | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
