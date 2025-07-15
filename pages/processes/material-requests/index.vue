<template>
  <div>
    <ModulesProcessesMaterialRequestsHeroCard :module-name="moduleName" />
    <ModulesProcessesMaterialRequestsButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      del-key="fullName"
      path="/processes/material-requests"
    />
  </div>
</template>

<script>
export default {
  name: 'MaterialRequests',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/materialRequests'

    const { data } = await $axios.$get('/material-requests')

    await store.dispatch(
      `${moduleName}/getAllDataFromApi`,
      data.materialRequests
    )
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'fullNumber',
          label: 'رقم الطلب',
          tdClass: 'td-fit',
          sortable: true
        },
        {
          key: 'date',
          label: 'التاريخ',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },
        {
          key: 'statement',
          label: 'البيان',
          tdClass: 'td-truncate',
          sortable: true
        },
        {
          key: 'storeName',
          label: 'المخزن',
          tdClass: 'td-truncate',
          sortable: true
        },
        {
          key: 'requesterDepartmentName',
          label: 'الجهة الطالبة',
          tdClass: 'td-fit',
          sortable: true
        },
        {
          key: 'requesterEmployeeName',
          label: 'معد الطلب',
          tdClass: 'td-fit',
          sortable: true
        },
        {
          key: 'state',
          label: 'حالة الطلب',
          sortable: true,
          formatter: this.formatRequestState
        },
        {
          key: 'deliveryState',
          label: 'حالة الاستلام',
          sortable: true,
          formatter: this.formatDeliveryState
        },
        {
          key: 'endNote',
          label: 'ملاحظات',
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
      title: 'طلبات الأصناف'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
