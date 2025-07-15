<template>
  <div>
    <ModulesProcessesPurchaseInvoicesHeroCard :module-name="moduleName" />
    <ModulesProcessesPurchaseInvoicesButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      del-key="fullName"
      path="/processes/purchase-invoices"
    />
  </div>
</template>

<script>
export default {
  name: 'PurchaseInvoices',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/purchaseInvoices'

    const { data } = await $axios.$get('/purchase-invoices')

    await store.dispatch(
      `${moduleName}/getAllDataFromApi`,
      data.purchaseInvoices
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
          key: 'fullSerialNumber',
          label: 'الرقم التسلسلي',
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
          key: 'supplierName',
          label: 'الموردين',
          tdClass: 'td-truncate',
          sortable: true
        },
        {
          key: 'storeName',
          label: 'المخازن',
          tdClass: 'td-fit',
          sortable: true
        },
        {
          key: 'isConfirmed',
          label: 'الحالة',
          tdClass: 'td-fit',
          sortable: true,
          formatter: value => (value ? 'معتمد' : 'غير معتمد')
        },
        {
          key: 'totalCost',
          label: 'إجمالي التكلفة',
          sortable: true,
          formatter: this.formatValue
        },
        // {
        //   key: 'totalQuantity',
        //   label: 'إجمالي الكمية',
        //   sortable: true
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
      title: 'فواتير الشراء'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
