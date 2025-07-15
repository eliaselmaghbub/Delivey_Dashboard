<template>
  <div>
    <WrapTheCard title="تم اعتماد الطلب من قبل">
      <ModulesProcessesMaterialRequestsEditorMovementsTheTable
        :headers="headers"
        :module-name="moduleName"
        selected-list="approvalsList"
      />
    </WrapTheCard>

    <WrapTheCard title="فى انتظار اعتماد الطلب من قبل">
      <ModulesProcessesMaterialRequestsEditorMovementsTheTable
        :headers="headers"
        :module-name="moduleName"
        selected-list="awaitingApprovalsList"
      />
    </WrapTheCard>

    <WrapTheCard title="الحركة المستندية للطلب">
      <ModulesProcessesMaterialRequestsEditorMovementsTheTable
        :headers="headers2"
        :module-name="moduleName"
        selected-list="movementsList"
      />
    </WrapTheCard>
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
          key: 'employeeJobNumber',
          label: 'الرقم وظيفي',
          sortable: true
        },
        {
          key: 'employeeName',
          label: 'الاسم',
          sortable: true
        },
        {
          key: 'employeeJobTitle',
          label: 'الصفة الوظيفية',
          sortable: true
        },
        {
          key: 'departmentName',
          label: 'يتبع الى',
          sortable: true
        }
      ],
      headers2: [
        {
          key: 'senderEmployeeName',
          label: 'من',
          sortable: true
        },
        {
          key: 'senderEmployeeJobTitle',
          label: 'الصفة الوظيفية',
          sortable: true
        },
        {
          key: 'receiverEmployeeName',
          label: 'إلى',
          sortable: true
        },
        {
          key: 'receiverEmployeeJobTitle',
          label: 'الصفة الوظيفية',
          sortable: true
        },
        {
          key: 'sentAt',
          label: 'وقت الإرسال',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        },
        {
          key: 'process',
          label: 'نوع الحركة',
          sortable: true,
          formatter: this.formatMovementProcess
        },
        {
          key: 'note',
          label: 'ملاحظة',
          sortable: true
        },
        {
          key: 'statement',
          label: 'البيان',
          sortable: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
