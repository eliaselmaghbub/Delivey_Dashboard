<template>
  <div>
    <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageTheEditorHeroCard
      :module-name="moduleName"
    />
    <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageTheEditorCurrentTable
      :headers="headers"
      :module-name="moduleName"
    />
    <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageTheEditorButtonsCard
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  props: {
    moduleName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'itemName',
          label: 'اسم الصنف',
          tdClass: 'td-full-width',
          sortable: true
        },
        {
          key: 'requestQuantity',
          label: 'الكمية',
          tdClass: 'td-min-width',
          sortable: true
        },
        {
          key: 'unitName',
          label: 'الوحده',
          sortable: true
        },
        {
          key: 'note',
          label: 'ملاحظات',
          tdClass: 'td-full-width',
          sortable: true
        },
        {
          key: 'storedItemId',
          label: 'الصنف المطلوب صرفه من المخزن',
          sortable: true
        },
        {
          key: 'quantity',
          label: 'الكمية حسب الفرد',
          tdClass: 'td-min-width',
          sortable: true
        },
        {
          key: 'unit',
          label: 'الوحدة حسب الفرد',
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
  computed: {
    currentId() {
      return this.$route.params.slug
    }
  },
  async mounted() {
    await this.$store.dispatch(
      `${this.moduleName}/getAllDataFromApi`,
      this.currentId
    )
    await this.$store.commit(
      'modules/processes/materialRequests/editor/releaseOrders/setDisplayValue',
      {
        key: 'tabLoading',
        value: false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
</style>
