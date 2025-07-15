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
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/direct/editor'
    await store.dispatch(`${moduleName}/resetData`)
    await store.commit(`${moduleName}/setListsValue`, {
      key: 'detailsTable',
      value: []
    })

    const params = {
      loadCategories: true
    }

    const { data } = await $axios.$get('/directrelease-orders/new', {
      params
    })

    await store.dispatch(`${moduleName}/getAllListsFromApiNew`, data)

    return {
      moduleName
    }
  },
  head() {
    return {
      title: ' الصرف المباشر | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
