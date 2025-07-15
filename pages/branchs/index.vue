<template>
  <div>
    <ModulesBranchsHeroCard :module-name="moduleName" />
    <ModulesBranchsButtonsCard :module-name="moduleName" />
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
  name: 'branchs',

  async asyncData({ $axios, store, $toast }) {
    const moduleName = 'modules/branchs'

    try {
      if (localStorage.getItem('roles') === 'Owner') {
        const { content } = await $axios.$get('/Branch/GetBranchs')
        await store.dispatch(`${moduleName}/getAllDataFromApi`, content)

        console.log(content)
      }
      if (localStorage.getItem('roles') !== 'Owner') {
        $toast.error('ليس لديك صلاحية')
        const { content } = await $axios.$get('/Branch/GetBranchs')
        await store.dispatch(`${moduleName}/getAllDataFromApi`, null)
        console.log(content)
      }
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
          key: 'branchName',
          label: 'اسم الفرع',
          sortable: true
        },

        // {
        //   key: 'isMajor',
        //   label: 'فرع رئيسي',
        //   sortable: true,
        //   formatter: value => (value ? 'نعم' : 'لا')
        // },

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
      title: 'الفروع'
    }
  }
}
</script>

<style lang="scss" scoped></style>
