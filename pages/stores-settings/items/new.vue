<template>
  <div>
    <ModulesStoresSettingsItemsEditorHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsItemsEditorButtonsCard :module-name="moduleName" />
  </div>
</template>

<script>
export default {
  name: 'ItemsEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/items/editor'

    const { data } = await $axios.$get('/items/new')

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

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
