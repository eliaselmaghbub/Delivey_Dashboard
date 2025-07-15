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
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/initialStocktakes/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const params = {
      loadCategories: true
    }

    const { data } = await $axios.$get('/initial-stocktakes/new', {
      params
    })

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: 'جرد أول المدة | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
