<template>
  <div>
    <ModulesStoresSettingsSuppliersEditorHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsSuppliersEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'SuppliersEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/suppliers/editor'

    await store.dispatch(`${moduleName}/resetData`)
    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'الموردين | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
