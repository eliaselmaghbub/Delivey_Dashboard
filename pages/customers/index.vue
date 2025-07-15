<template>
  <div>
    <ModulesCustomersHeroCard :module-name="moduleName" />
    <ModulesCustomersButtonsCard :module-name="moduleName" />
    <ModulesCustomersTheTable
      :headers="headers"
      :module-name="moduleName"
      :edit-icon="true"
    />
  </div>
</template>

<script>
export default {
  name: 'Customers',

  async asyncData({ $axios, store, $toast }) {
    const moduleName = 'modules/customers'
    try {
      const content = await $axios.$get('/UserManagement/GetCustomers')

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
          key: 'name',
          label: 'اسم الزبون',
          sortable: true
        },

        {
          key: 'userName',
          label: 'اسم الدخول',
          sortable: true
        },

        {
          key: 'phoneNumber',
          label: 'رقم الهاتف',
          sortable: true
        },

        {
          key: 'address',
          label: 'العنوان',
          sortable: true
        },

        {
          key: 'activateState',
          label: 'حالة المستخدم',
          sortable: true,
          formatter: value => (value === 1 ? 'نشط' : 'غير نشط')
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
