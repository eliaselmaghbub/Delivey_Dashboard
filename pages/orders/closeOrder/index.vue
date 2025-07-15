<template>
  <div>
    <ModulesOrdersCloseOrderHeroCard :module-name="moduleName" />

    <ModulesOrdersCloseOrderHeroCardCode :module-name="moduleName" />

    <ModulesOrdersCloseOrderTheTable
      :headers="headers"
      :module-name="moduleName"
      :edit-icon="true"
    />
  </div>
</template>

<script>
export default {
  name: 'orders',

  async asyncData({ $axios, store, $toast }) {
    const moduleName = 'modules/orders/closeOrder'

    try {
      const content = await $axios.$get('/Order/ShearchOrder')

      await store.dispatch(`${moduleName}/getAllDataFromApi`, content)

      const contentRepresentatives = await $axios.$get(
        '/UserManagement/GetRepresentatives'
      )

      await store.dispatch(
        `${moduleName}/getAllListsFromApiUser`,
        contentRepresentatives
      )
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
          key: 'orderNo',
          label: 'رقم الطلبية',
          sortable: true
        },

        {
          key: 'branchName',
          label: 'الفرع',
          sortable: true
        },

        {
          key: 'representative.name',
          label: 'اسم المندوب',
          sortable: true
        },

        // {
        //   key: 'customer.phoneNumber',
        //   label: 'رقم المرسل',
        //   sortable: true
        // },

        {
          key: 'orderPrice',
          label: 'سعر الطرد',
          sortable: true
        },

        {
          key: 'price',
          label: 'سعر التوصيل',
          sortable: true
        },

        {
          key: 'recipientAddress',
          label: 'العنوان',
          sortable: true
        },

        {
          key: 'recipientPhoneNo',
          label: 'رقم المستلم',
          sortable: true
        },

        {
          key: 'updatedAt',
          label: 'تاريخ آخر حالة ',
          sortable: true
        },
        {
          key: 'orderState',
          label: 'حالة الطلبية',
          sortable: true,
          formatter: value => (value ? 'في المخزن' : 'في المخزن')
        },
        {
          key: 'orderStateName',
          label: 'حالة الطلبية',
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
      title: 'قبول الطلبية'
    }
  }
}
</script>

<style lang="scss" scoped></style>
