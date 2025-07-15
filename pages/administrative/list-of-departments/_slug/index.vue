<template>
  <div>
    <ModulesAdministrativeListOfDepartmentsHeroCard :module-name="moduleName" />
    <ModulesAdministrativeListOfDepartmentsEmployeesHeroCard
      :module-name="moduleName"
    />

    <ModulesAdministrativeListOfDepartmentsButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'listOfDepartments',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/administrative/listOfDepartments/editor'

    const { data } = await $axios.$get(`/listOfDepartments/${params.slug}`)

    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName,
      title: 'مشاهدة'
    }
  },

  data() {
    return {
      headers: [
        {
          key: 'storedItem.itemName',
          label: 'اسم الصنف',
          sortable: true
        },

        {
          key: 'storedItem.quantity',
          label: 'الكمية',
          sortable: true
        },

        {
          key: 'storedItem.cost',
          label: 'اجمالي التكلفة',
          sortable: true
        },
        {
          key: 'storedItem.expireDate',
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
      title: `الوحدات التنظيمية لطلبات الأصناف| ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
