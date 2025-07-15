<template>
  <div>
    <ModulesOrdersAcceptanceOrderHeroCard :module-name="moduleName" />
    <!-- <ModulesCityButtonsCard :module-name="moduleName" /> -->
    <ModulesOrdersAcceptanceOrderTheTable
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
    const moduleName = 'modules/orders/acceptanceOrder'
    try {
      const content = await $axios.$get('/Order/ShearchOrder?OrderState=1')

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
          key: 'orderNo',
          label: 'رقم الطلبية',
          sortable: true
        },

        {
          key: 'customer.name',
          label: 'اسم المرسل',
          sortable: true
        },

        {
          key: 'customer.phoneNumber',
          label: 'رقم المرسل',
          sortable: true
        },

        {
          key: 'orderPrice',
          label: 'سعر الطرد',
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
          key: 'createdAt',
          label: 'تاريخ انشاء الطلبية',
          sortable: true
        },

        {
          key: 'orderState',
          label: 'حالة الطلبية',
          sortable: true,
          formatter: value => (value ? 'انتظار' : 'انتظار')
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
