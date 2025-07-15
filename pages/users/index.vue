<template>
  <div>
    <ModulesUsersHeroCard :module-name="moduleName" />
    <ModulesUsersButtonsCard :module-name="moduleName" />

    <ModulesUsersHeroCardPass :module-name="moduleName" />

    <ModulesUsersHeroCardU :module-name="moduleName" />

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
  name: 'users',

  async asyncData({ $axios, store, $toast }) {
    const moduleName = 'modules/users'

    try {
      const { content } = await $axios.$get('/UserManagement/GetEmployees')

      await store.dispatch(`${moduleName}/getAllDataFromApi`, content)

      const Branch = await $axios.$get('/Branch/GetBranchs')

      await store.dispatch(`${moduleName}/getAllListsFromApiBranch`, Branch)

      // const Permission = await $axios.$get('/Permission/GetAllPermissions')

      // await store.dispatch(`${moduleName}/getAllListsFromApi`, Permission)
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
          label: 'اسم الموظف',
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
      title: 'الموظفين'
    }
  }
}
</script>

<style lang="scss" scoped></style>
