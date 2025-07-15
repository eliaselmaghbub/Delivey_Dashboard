<template>
  <div>
    <ModulesCityHeroCard :module-name="moduleName" />
    <ModulesCityButtonsCard :module-name="moduleName" />
    <ModulesCityHeroCardCity :module-name="moduleName" />

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
  name: 'city',

  async asyncData({ $axios, store, $toast }) {
    const moduleName = 'modules/city'

    try {
      const Branch = await $axios.$get('/Branch/GetBranchs')

      await store.dispatch(`${moduleName}/getAllListsFromApiBranch`, Branch)
      const { content } = await $axios.$get('/City/GetCities?culture=ar-LY')

      await store.dispatch(`${moduleName}/getAllDataFromApi`, content)
    } catch (error) {}

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
          label: 'اسم المدينة',
          sortable: true
        },

        {
          key: 'price',
          label: 'سعر التوصيل',
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

  // computed: {
  //   fields() {
  //     return this.$store.getters[`${this.moduleName}/fields`]
  //   }
  // },
  head() {
    return {
      title: 'المدن'
    }
  }
}
</script>

<style lang="scss" scoped></style>
