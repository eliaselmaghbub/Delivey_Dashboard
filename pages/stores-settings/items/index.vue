<template>
  <div>
    <ModulesStoresSettingsItemsHeroCard :module-name="moduleName" />
    <ModulesStoresSettingsItemsButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      path="/stores-settings/items"
    />
  </div>
</template>

<script>
export default {
  name: 'Items',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/storesSettings/items'

    const { data } = await $axios.$get('/items')

    await store.dispatch(`${moduleName}/getAllDataFromApi`, data.items)
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

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
          key: 'number',
          label: 'رقم الصنف',
          sortable: true
        },
        {
          key: 'name',
          label: 'اسم التصنيف',
          sortable: true
        },
        {
          key: 'fullCategoryName',
          label: 'التصنيف',
          sortable: true
        },
        {
          key: 'barcode',
          label: 'رمز الباركود',
          sortable: true
        },
        {
          key: 'haveExpireDate',
          label: 'هل لديه تاريخ صلاحية',
          sortable: true,
          formatter: (value, key) => {
            return value || 'غير محدد'
          }
        },
        {
          key: 'minimumQuantity',
          label: 'أقل كمية',
          sortable: true
        },
        {
          key: 'maximumQuantity',
          label: 'أكبر كمية',
          sortable: true
        },
        {
          key: 'singleUnits',
          label: 'وحدة الفرد',
          sortable: true
        },
        {
          key: 'groupUnits',
          label: 'وحدة المجموعة',
          sortable: true
        },
        {
          key: 'quantityInGroup',
          label: 'الكمية في المجموعة',
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
      title: 'الأصناف'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
