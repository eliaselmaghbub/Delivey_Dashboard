<template>
  <div>
    <ModulesProcessesStoredItemsHeroCard :module-name="moduleName" />
    <ModulesProcessesStoredItemsButtonsCard :module-name="moduleName" />
    <!-- <ModulesAdministrativeJopTitleSearchCard :module-name="moduleName" /> -->
    <UtilsTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
      path="/processes/stored-items"
      :edit-icon="false"
      :delete-icon="false"
      selected-id="id"
    />
  </div>
</template>

<script>
export default {
  name: 'Departments',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/storedItems'

    const { data } = await $axios.$get('/stored-items')

    // await store.dispatch(`${moduleName}/getAllDataFromApi`, data.jobTitles)
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'item.name',
          label: 'اسم الصنف',
          sortable: true
        },
        {
          key: 'item.categoryName',
          label: 'التصنيف',
          sortable: true
        },

        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          sortable: true
        },

        {
          key: 'store.name',
          label: 'المخازن',
          sortable: true
        },

        // {
        //   key: 'quantity',
        //   label: 'الكمية',
        //   sortable: true,
        //   formatter: (value, key, item) => {
        //     console.log(item)
        //     if (item.item.groupUnitsId) {
        //       const quantityInGroup = parseInt(
        //         item.quantity / item.item.quantityInGroup
        //       )
        //       const quantityInSingle = parseInt(
        //         item.quantity % item.item.quantityInGroup
        //       )

        //       return `${quantityInGroup} ${item.item.groupUnits} + ${quantityInSingle} ${item.item.singleUnits}`
        //     } else {
        //       return `${item.quantity} ${item.item.singleUnits}`
        //     }
        //   }
        // },

        {
          key: 'cost',
          label: 'تكلفة الوحدة',
          sortable: true
        },

        // {
        //   key: 'organizationNameqqq',
        //   label: 'رقم الفاتورة',
        //   sortable: true
        // },

        {
          key: 'purchaseInvoiceNumber',
          label: 'فاتورة الشراء',
          sortable: true
        },
        {
          key: 'deliveryNotenumber',
          label: 'رقم اذن الاستلام',
          sortable: true
        }

        // {
        //   key: 'actions',
        //   label: 'إجراءات',
        //   sortable: true
        // }
      ]
    }
  },
  head() {
    return {
      title: 'البحث في المخازن'
    }
  }
}
</script>

<style lang="scss" scoped></style>
