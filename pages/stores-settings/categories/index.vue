<template>
  <div>
    <ModulesStoresSettingsCategoriesHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsCategoriesButtonsCard :module-name="moduleName" />
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
  name: 'Categories',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/categories'

    const { data } = await $axios.$get('/categories')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data)
    await store.dispatch(`${moduleName}/getFirstLevelNumber`)

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
          key: 'number',
          label: 'رقم التصنيف',
          sortable: true
        },
        {
          key: 'name1',
          label: 'التصنيف الرئيسي',
          sortable: true
        },

        {
          key: 'name2',
          label: 'التصنيف الفرعي',
          sortable: true
        },
        {
          key: 'name3',
          label: 'التصنيف التحليلي',
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
      title: 'التصنيفات'
    }
  }
}
</script>

<style lang="scss" scoped></style>
