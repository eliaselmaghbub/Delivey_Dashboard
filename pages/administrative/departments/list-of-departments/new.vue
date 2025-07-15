<template>
  <div>
    <ModulesAdministrativeEmployeesHeroCard :module-name="moduleName" />
    <ModulesAdministrativeEmployeesButtonsCard :module-name="moduleName" />
  </div>
</template>

<script>
export default {
  name: 'employees',
  async asyncData({ $axios, store }) {
    const moduleName = 'modules/administrative/employees/editor'

    const data = await $axios.$get('/Employees/new')

    await store.dispatch(`${moduleName}/getAllListsFromApiNew`, data.data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'itemName',
          label: 'اسم الصنف',
          sortable: true
        },

        {
          key: 'quantity',
          label: 'الكمية',
          sortable: true
        },

        {
          key: 'cost',
          label: 'اجمالي التكلفة',
          sortable: true
        },
        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },

        {
          key: 'newQuantity',
          label: 'الكمية الجديدة',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: '  استرجاع المصروفات المباشرة | جديد'
    }
  }
}
</script>

<style lang="scss" scoped></style>
