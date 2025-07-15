<template>
  <div>
    <ModulesStoresSettingsStoresHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsStoresButtonsCard :module-name="moduleName" />
    <UtilsTheFrontTable
      :headers="headers"
      path="/stores-settings/stores"
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'Stores',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/stores'
    const { data } = await $axios.$get('/stores')
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
          key: 'address',
          label: 'العنوان',
          sortable: true
        },
        {
          key: 'mobile',
          label: 'رقم النقال',
          sortable: true
        },
        {
          key: 'phone',
          label: 'رقم الهاتف',
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
      title: 'المخازن'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
