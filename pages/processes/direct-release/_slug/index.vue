<template>
  <div>
    <ModulesProcessesDirectrEditorHeroCard :module-name="moduleName" />
    <ModulesProcessesDirectrEditorDetailsCard :module-name="moduleName" />
    <ModulesProcessesDirectrEditorButtonsCard :module-name="moduleName" />
  </div>
</template>

<script>
export default {
  name: 'DirectreleaseEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/processes/direct/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/directrelease-orders/${params.slug}`)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)
    // await store.dispatch(`${moduleName}/showSingleData`, data)

    return {
      moduleName,
      title: 'تعديل'
    }
  },
  head() {
    return {
      title: ` الصرف المباشر | ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
