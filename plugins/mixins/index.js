// We haven't added icon's computed property because it makes this mixin coupled with UI

import Vue from 'vue'

const mixins = {
  computed: {
    reportSystemType() {
      return process.env.REPORT_SYSTEM_TYPE
    },
    appName() {
      return process.env.APP_NAME
    }
  },

  methods: {
    // التاريخ
    formatDate(value) {
      return value ? this.$moment(value).format('YYYY-MM-DD') : null
    },

    // القيمة
    formatValue(value) {
      return value?.toLocaleString()
    },

    // نوع العملية
    formatAction(value) {
      switch (value) {
        case 'Create':
          return 'إضافة'
        case 'Update':
          return 'تعديل'
        case 'Delete':
          return 'حذف'
        case 'Confirm':
          return 'اعتماد'
        case 'Unconfirm':
          return 'إلغاء الاعتماد'
        case 'Close':
          return 'إغلاق'
        case 'Reopen':
          return 'فتح'
        case 'Other':
          return 'أخرى'
        default:
          return ''
      }
    },

    // حالة الطلب
    formatRequestState(value) {
      switch (value) {
        case 1:
          return 'فعال'
        case 2:
          return 'معلق'
        case 3:
          return 'طلب تعديل'
        case 4:
          return 'طلب موافق عليه'
        case 5:
          return 'طلب مرفوض'
        case 6:
          return 'طلب مكتمل'
      }
    },

    // حالة الطلب
    formatDeliveryState(value) {
      switch (value) {
        case 1:
          return 'مستلم كامل'
        case 2:
          return 'مستلمة جزئ'
        case 3:
          return 'غير مستلمة'
      }
    },

    // { name: 'اعتماد', id: 1 },
    // { name: 'طلب تعديل', id: 2 },
    // { name: 'تعليق', id: 3 },
    // { name: 'الموافقة على الطلب', id: 4 },
    // { name: 'عدم الموافقة', id: 5 },
    // { name: 'افراج', id: 6 }

    // نوع الحركة
    formatMovementProcess(value) {
      switch (value) {
        case 1:
          return 'اعتماد'
        case 2:
          return 'طلب تعديل'
        case 3:
          return 'تعليق'
        case 4:
          return 'الموافقة على الطلب'
        case 5:
          return 'عدم الموافقة'
        case 6:
          return 'افراج'
      }
    }
  }
}

Vue.mixin(mixins)
