<template>
  <div>
    <!-- <ModulesProcessesStocktakesHeroCard :module-name="moduleName" /> -->
    <ModulesProcessesDirectReleaseOrderReturnButtonsCard
      :module-name="moduleName"
    />
    <UtilsTheTable
      :not-id="true"
      :headers="headers"
      :module-name="moduleName"
      del-key="number"
      path="/processes/direct-release-order-return"
    />
  </div>
</template>

<script>
export default {
  name: 'Stocktakes',

  asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/directReleaseOrderReturn'

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        {
          key: 'number',
          label: 'رقم الطلب',
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
          key: 'employeeFullName',
          label: 'الموظف',
          sortable: true
        },

        {
          key: 'departmentName',
          label: 'الادارة',
          sortable: true
        },

        {
          key: 'note',
          label: 'ملاحظة',
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
      title: 'استرجاع المصروفات المباشرة'
    }
  }
}
</script>

<style lang="scss" scoped></style>
