<template>
  <div>
    <ModulesProcessesDirectReleaseOrderReturnEditorHeroCard
      :module-name="moduleName"
    />

    <ModulesProcessesDirectReleaseOrderReturnEditorHeroCardd
      :module-name="moduleName"
    />

    <ModulesProcessesDirectReleaseOrderReturnEditorDetailsCard
      :module-name="moduleName"
    />

    <ModulesProcessesDirectReleaseOrderReturnEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'DirectreleaseEditor',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/directReleaseOrderReturn/editor'
    // await store.dispatch(`${moduleName}/resetData`)
    await store.commit(`${moduleName}/setListsValue`, {
      key: 'detailsTable',
      value: []
    })

    const params = {
      loadCategories: true
    }

    const { data } = await $axios.$get('/directReleaseOrderReturn/new', {
      params
    })

    await store.dispatch(`${moduleName}/getAllListsFromApiNew`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'itemName',
          label: 'اسم الصنف',
          sortable: true
        },

        {
          key: 'quantity',
          label: 'الكمية',
          sortable: true
        },

        {
          key: 'cost',
          label: 'اجمالي التكلفة',
          sortable: true
        },
        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },

        {
          key: 'newQuantity',
          label: 'الكمية الجديدة',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: '  استرجاع المصروفات المباشرة | جديد'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
