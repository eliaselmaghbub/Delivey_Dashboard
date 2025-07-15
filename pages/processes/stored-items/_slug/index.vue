<template>
  <div>
    <UtilsTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
      :edit-icon="false"
      :delete-icon="false"
    />
  </div>
</template>

<script>
export default {
  name: 'DirectreleaseEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/processes/storedItems'

    // const schema = {
    //   itemId: params.slug
    // }

    const { data } = await $axios.$get(
      `/stored-items/getByDate?StoredItemId=${params.slug}`
    )

    // await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    await store.dispatch(`${moduleName}/getAllDataVFromApi`, data)

    return {
      moduleName,
      title: 'مشاهدة'
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
          key: 'typestring',
          label: 'نوع المستند',
          sortable: true
        },

        {
          key: 'serialNumber',
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

        {
          key: 'quantity',
          label: 'الكمية',
          sortable: true,
          formatter: (value, key, item) => {
            console.log(item)
            if (item.item.groupUnitsId) {
              const quantityInGroup = parseInt(
                item.quantity / item.item.quantityInGroup
              )
              const quantityInSingle = parseInt(
                item.quantity % item.item.quantityInGroup
              )

              return `${quantityInGroup} ${item.item.groupUnits} + ${quantityInSingle} ${item.item.singleUnits}`
            } else {
              return `${item.quantity} ${item.item.singleUnits}`
            }
          }
        },

        {
          key: 'cost',
          label: 'إجمالي التكلفة',
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
      title: ` الصرف المباشر | ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
