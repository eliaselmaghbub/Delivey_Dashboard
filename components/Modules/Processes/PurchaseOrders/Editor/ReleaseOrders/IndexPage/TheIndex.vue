
<template>
  <div>
    <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageButtonsCard
      :module-name="moduleName"
    />
    <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageTheTable
      :headers="headers"
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
          key: 'number',
          label: 'رقم إذن الصرف',
          sortable: true
        },
        {
          key: 'date',
          label: 'التاريخ',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },
        {
          key: 'note',
          label: 'ملاحظات',
          sortable: true
        },
        {
          key: 'isConfirmed',
          label: 'الحالة',
          sortable: true,
          formatter: value => (value ? 'معتمد' : 'غير معتمد')
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
  mounted() {
    this.$store.dispatch(`${this.moduleName}/getAllDataFromApi`, this.currentId)
  }
}
</script>

<style lang="scss" scoped>
</style>
