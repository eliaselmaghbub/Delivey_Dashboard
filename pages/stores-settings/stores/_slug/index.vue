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
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/storesSettings/stores/editor'
    const { data } = await $axios.$get(`/stores/${params.slug}`)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'تعديل المخزن'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
