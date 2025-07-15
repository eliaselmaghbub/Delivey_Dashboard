<template>
  <div>
    <ModulesProcessesInitialStocktakesEditorHeroCard
      :module-name="moduleName"
    />
    <ModulesProcessesInitialStocktakesEditorDetailsCard
      :module-name="moduleName"
    />
    <ModulesProcessesInitialStocktakesEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'InitialStocktakesEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/processes/initialStocktakes/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/initial-stocktakes/${params.slug}`)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)
    await store.dispatch(`${moduleName}/showSingleData`, data)

    return {
      moduleName,
      title: data.serialNumber
    }
  },
  head() {
    return {
      title: `جرد أول المدة | ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
