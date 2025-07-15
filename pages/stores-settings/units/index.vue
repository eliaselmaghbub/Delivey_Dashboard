<template>
  <div>
    <ModulesStoresSettingsUnitsHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsUnitsButtonsCard :module-name="moduleName" />
    <UtilsTheFrontTable
      :not-id="false"
      :headers="headers"
      :module-name="moduleName"
      :edit-icon="true"
    />
  </div>
</template>

<script>
export default {
  name: 'Units',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/units'

    const { data } = await $axios.$get('/units')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'num',
          label: '',
          sortable: true
        },
        {
          key: 'name',
          label: 'الاسم',
          sortable: true
        },

        {
          key: 'actions',
          label: 'إجراءات',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: 'الوحدات'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
