<template>
  <div>
    <ModulesProcessesMaterialRequestsEditorHeroCard :module-name="moduleName" />
    <ModulesProcessesMaterialRequestsEditorDetailsCard
      :module-name="moduleName"
    />
    <ModulesProcessesMaterialRequestsEditorMovementCard
      :module-name="moduleName"
    />
    <ModulesProcessesMaterialRequestsEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'MaterialRequestsEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/materialRequests/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get('/material-requests/new')

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: ' طلبات الأصناف | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
