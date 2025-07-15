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
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/storesSettings/suppliers/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/suppliers/${params.slug}`)

    await store.dispatch(`${moduleName}/showSingleData`, data)

    return {
      moduleName,
      title: data.fullName
    }
  },
  head() {
    return {
      title: `الموردين | ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
