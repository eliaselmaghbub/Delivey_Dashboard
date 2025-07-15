<template>
  <div>
    <ModulesOrdersSendOrderHeroCard :module-name="moduleName" />
    <!-- <ModulesCityButtonsCard :module-name="moduleName" /> -->

    <ModulesOrdersSendOrderHeroCardRepresentative :module-name="moduleName" />

    <ModulesOrdersSendOrderTheTable
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
    const moduleName = 'modules/orders/sendOrder'

    try {
      const content = await $axios.$get('/Order/ShearchOrder?OrderState=2')

      await store.dispatch(`${moduleName}/getAllDataFromApi`, content)

      const contentRepresentatives = await $axios.$get(
        '/UserManagement/GetRepresentatives'
      )

      await store.dispatch(
        `${moduleName}/getAllListsFromApiUser`,
        contentRepresentatives
      )

      const contentCity = await $axios.$get('/City/GetCities?culture=ar-LY')

      await store.dispatch(`${moduleName}/getAllListsFromApi`, contentCity)
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
