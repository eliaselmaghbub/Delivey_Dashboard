<template>
  <div>
    <ModulesStoresSettingsSuppliersHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsSuppliersButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      del-key="fullName"
      path="/stores-settings/suppliers"
    />
  </div>
</template>

<script>
export default {
  name: 'Suppliers',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/suppliers'

    const { data } = await $axios.$get('/suppliers')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data)

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
          key: 'fullName',
          label: 'اسم المورد',
          sortable: true
        },
        {
          key: 'address',
          label: 'العنوان',
          sortable: true
        },
        {
          key: 'phone1',
          label: 'رقم الموبايل',
          sortable: true
        },
        {
          key: 'representative',
          label: 'اسم المندوب',
          sortable: true
        },
        {
          key: 'internationalPhone',
          label: 'الهاتف الارضي',
          sortable: true
        },
        {
          key: 'email',
          label: 'البريد الإلكتروني',
          sortable: true
        },
        {
          key: 'quality',
          label: 'الجودة',
          sortable: true
        },
        {
          key: 'transaction',
          label: 'حسن المعاملة',
          sortable: true
        },
        {
          key: 'executionSpeed',
          label: 'سرعة التنفيذ',
          sortable: true
        },
        {
          key: 'saleOnCredit',
          label: 'توفر بيع بالأجل',
          sortable: true,
          formatter: value => (value ? 'نعم' : 'لا')
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
      title: 'الموردين'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
