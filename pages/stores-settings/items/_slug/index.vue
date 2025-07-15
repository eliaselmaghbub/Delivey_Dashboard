<template>
  <div>
    <ModulesStoresSettingsItemsEditorHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsItemsEditorButtonsCard :module-name="moduleName" />
  </div>
</template>

<script>
export default {
  name: 'ItemsEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/storesSettings/items/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/items/${params.slug}`)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)
    await store.dispatch(`${moduleName}/showSingleData`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'الاصناف | مشاهدة'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
