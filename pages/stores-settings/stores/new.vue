<template>
  <div>
    <ModulesStoresSettingsStoresEditorHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsStoresEditorDetailsCard :module-name="moduleName" />

    <ModulesStoresSettingsStoresEditorButtonsCard :module-name="moduleName" />
  </div>
</template>

<script>
export default {
  name: 'StoresEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/stores/editor'

    const { data } = await $axios.$get('/stores/new')

    await store.dispatch(`${moduleName}/getAllListsFromApiNew`, data)

    await store.dispatch(`${moduleName}/resetData`)
    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'الأصناف | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
