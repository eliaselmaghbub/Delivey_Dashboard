<template>
  <div>
    <ModulesProcessesDirectrHeroCard :module-name="moduleName" />
    <ModulesProcessesDirectrButtonsCard :module-name="moduleName" />
    <UtilsTheTable
      :headers="headers"
      :module-name="moduleName"
      del-key="fullNumber"
      path="/processes/direct-release"
    />
  </div>
</template>

<script>
export default {
  name: 'Directreleas',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/processes/direct'

    const { data } = await $axios.$get('/directrelease-orders')

    await store.dispatch(
      `${moduleName}/getAllDataFromApi`,
      data.directReleaseOrders
    )
    await store.dispatch(`${moduleName}/getAllListsFromApi`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      headers: [
        // {
        //   key: 'num',
        //   label: '',
        //   sortable: true
        // },
        {
          key: 'fullNumber',
          label: 'رقم إذن الصرف',
          sortable: true
        },

        // {
        //   key: 'employeeFullName',
        //   label: 'الموظف المستلم',
        //   sortable: true
        // },

        {
          key: 'departmentName',
          label: 'الجهة المستلمة',
          sortable: true
        },

        {
          key: 'storeName',
          label: 'اسم المخزن',
          sortable: true
        },
        {
          key: 'date',
          label: 'التاريخ',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },

        // {
        //   key: 'note',
        //   label: 'ملاحظة',
        //   sortable: true
        // },

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
  head() {
    return {
      title: 'الصرف المباشر'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
