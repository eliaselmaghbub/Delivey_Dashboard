<template>
  <div>
    <ModulesAdministrativeEmployeesHeroCard :module-name="moduleName" />
    <ModulesAdministrativeEmployeesButtonsCard :module-name="moduleName" />
  </div>
</template>

<script>
export default {
  name: 'DirectreleaseEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/administrative/employees/editor'

    const { data } = await $axios.$get(`/employees/${params.slug}`)

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
      title: `  سترجاع المصروفات المباشرة | ${this.title}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
