<template>
  <div>
    <ModulesProcessesPurchaseOrdersHeroCard :module-name="moduleName" />
    <ModulesProcessesPurchaseOrdersButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      del-key="fullName"
      path="/processes/purchase-orders"
    />
  </div>
</template>

<script>
export default {
  name: 'PurchaseOrders',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/purchaseOrders'

    const { data } = await $axios.$get('/purchase-orders')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.purchaseOrders)
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
          key: 'requesterEmployeeName',
          label: 'معد الطلب',
          tdClass: 'td-fit',
          sortable: true
        },
        {
          key: 'state',
          label: 'حالة طلب الشراء',
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
          key: 'isClosed',
          label: 'حالة المستند',
          sortable: true
          // formatter: this.formatDeliveryState
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
      title: 'المشتريات'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
