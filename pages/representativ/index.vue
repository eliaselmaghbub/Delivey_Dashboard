<template>
  <div>
    <ModulesRepresentativHeroCard :module-name="moduleName" />
    <ModulesRepresentativButtonsCard :module-name="moduleName" />

    <ModulesRepresentativHeroCardPass :module-name="moduleName" />
    <ModulesRepresentativHeroCardR :module-name="moduleName" />

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
  name: 'Representativ',

  async asyncData({ $axios, store, $toast }) {
    const moduleName = 'modules/representativ'

    try {
      const Branch = await $axios.$get('/Branch/GetBranchs')

      await store.dispatch(`${moduleName}/getAllListsFromApiBranch`, Branch)
      const { content } = await $axios.$get(
        '/UserManagement/GetRepresentatives'
      )
      await store.dispatch(`${moduleName}/getAllDataFromApi`, content)
    } catch (error) {
      $toast.error('ليس لديك صلاحية')
    }

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
          label: 'اسم المندوب',
          sortable: true
        },

        {
          key: 'phoneNumber',
          label: 'رقم الهاتف',
          sortable: true
        },

        {
          key: 'branchName',
          label: 'الفرع',
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
      title: 'المندوبين'
    }
  }
}
</script>

<style lang="scss" scoped></style>
