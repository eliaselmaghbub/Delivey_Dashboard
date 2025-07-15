export const state = () => ({
  apiModule: '/userGroups',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    typeList: [
      {
        title: 'الصلاحيات',
        type: 'Permission',
        permissions: ['selectAll']
      },
      {
        title: 'المستخدمين',
        type: 'User',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الصلاحيات',
        type: 'UserGroup',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الإعدادات',
        type: 'Settings',
        permissions: ['All', 'View', 'Edit']
      },
      {
        title: 'أنشطة المستخدمين',
        type: 'Activity',
        permissions: ['All', 'View']
      },
      {
        title: 'بيانات النظام',
        type: 'CompanyInfo',
        permissions: ['All', 'View', 'Edit']
      },
      {
        title: 'الموظفين',
        type: 'Employee',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الهيكلية الادارية',
        type: 'Department',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'تصنيف الفروع',
        type: 'DepartmentClassifications',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الأختام الإلكترونية',
        type: 'DigitalStamp',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'UnConfirm'
        ]
      },
      {
        title: 'الصفة الوظيفية',
        type: 'JobTitle',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'التصنيفات',
        type: 'Category',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الموردين',
        type: 'Supplier',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'طلبات الأصناف',
        type: 'MaterialRequest',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'ApprovalRequest',
          'AmendRequest',
          'Reject',
          'Approved',
          'Suspend',
          'Release'
        ]
      },
      {
        title: 'فواتير الشراء',
        type: 'PurchaseInvoice',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'جرد أول المدة',
        type: 'InitialStocktake',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'المخازن',
        type: 'Store',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'البحث فى المخازن',
        type: 'StoredItem',
        permissions: ['All', 'View']
      },
      {
        title: 'الوحدات',
        type: 'Unit',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'اللجان',
        type: 'Committee',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الوحدات التنظيمية لطلبات الأصناف',
        type: 'ListOfDepartments',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الاصناف',
        type: 'Item',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'الجرد',
        type: 'Stocktake',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'إرجاع أصناف الطلب',
        type: 'ReturnReleaseOrder',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'استرجاع المصروفات المباشرة',
        type: 'DirectReleaseOrdersReturn',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'طلب عرض',
        type: 'OfferRequest',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      },
      {
        title: 'أمر التكليف',
        type: 'CommissioningOrder',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'فواتير الاسترجاع',
        type: 'CustodySettlement',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'السنة المالية',
        type: 'FiscalYear',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Close',
          'Reopen'
        ]
      },
      {
        title: 'صرف إلى مخزن',
        type: 'Transfer',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm',
          'ConfirmForm'
        ]
      },
      {
        title: 'أوامر الصرف',
        type: 'ReleaseOrder',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'الصرف المباشر',
        type: 'DirectReleaseOrder',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'المشتريات',
        type: 'PurchaseOrder',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'UpdateOffer',
          'Close',
          'Reopen',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'أذونات الاستلام',
        type: 'DeliveryNote',
        permissions: [
          'All',
          'View',
          'Create',
          'Edit',
          'Delete',
          'Confirm',
          'Unconfirm'
        ]
      },
      {
        title: 'العروض المستلمة',
        type: 'ArchiveSupplierOffers',
        permissions: ['All', 'View', 'Create', 'Edit', 'Delete']
      }
    ],

    permissionList: {
      selectAll: 'اختيار الكل',
      All: 'الكل',
      View: 'مشاهدة',
      Create: 'إضافة',
      Edit: 'تعديل',
      Delete: 'حذف',
      Close: 'إغلاق',
      Cancel: 'إلغاء',
      Reopen: 'إعادة فتح',
      Reject: 'عدم الموافقة',
      Release: 'إفراج',
      Confirm: 'اعتماد',
      ConfirmForm: 'اعتماد',
      ApprovalRequest: 'اعتماد',
      UpdateOffer: 'إدخال العرض المقبول',
      AmendRequest: 'طلب تعديل',
      Suspend: 'تعليق',
      Approved: 'الموافقة على الطلب',
      Unconfirm: 'إلغاء الاعتماد',
      UnConfirm: 'إلغاء الاعتماد'
    },
    abilitiesList: [],
    refreshLists: false
  },
  fields: {
    name: null
  },
  display: {
    id: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  setDefaultValue({ state, commit }, payload) {
    const { lists } = state

    lists.typeList.forEach((item, i) => {
      item.permissions.forEach((permission, x) => {
        commit('setFieldValue', {
          key: `${item.type}_${permission}`,
          value: false
        })
      })
    })
  },

  getAllDataFromApi({ commit }, payload) {
    commit('setTableValue', { key: 'allData', value: payload })
  },

  async addToDB({ state, dispatch, commit }) {
    const { apiModule, fields } = state
    const abilities = []

    const requiredFields = [
      {
        field: fields.name,
        message: 'قم بادخال اسم المجموعة اولا'
      }
    ]

    const missingField = requiredFields.find(f => !f.field)
    if (missingField) {
      this.$toast.warning(missingField.message)
      return
    }

    const schemaFilter = { ...fields }

    delete schemaFilter.name

    // filter any key that has a value of true and push it to the abilities array to be sent to the backend
    Object.entries(schemaFilter).forEach(([key, value]) => {
      if (value) {
        const [type, permission] = key.split('_')

        if (permission === 'All') {
          return
        }

        abilities.push({
          type,
          permission
        })
      }
    })

    const schema = {
      name: fields.name,
      abilities
    }

    const { data, message } = await this.$axios.$post(apiModule, schema)

    commit('setTableValue', { key: 'allData', value: [data], push: true })

    this.$toast.success(message)
    dispatch('resetData')
  },

  boxChange({ state, commit }, payload) {
    const { lists, fields } = state

    if (payload.key === 'Permission_selectAll' && payload.data) {
      return lists.typeList.forEach((item, i) => {
        item.permissions.forEach((permission, x) => {
          commit('setFieldValue', {
            key: `${item.type}_${permission}`,
            value: true
          })
        })
      })
    } else if (payload.key === 'Permission_selectAll' && !payload.data) {
      return lists.typeList.forEach((item, i) => {
        item.permissions.forEach((permission, x) => {
          commit('setFieldValue', {
            key: `${item.type}_${permission}`,
            value: false
          })
        })
      })
    }

    const typeListCopy = JSON.parse(JSON.stringify(lists.typeList))

    const [module, permission] = payload.key.split('_')

    const modulePermissions = typeListCopy.find(
      x => x.type === module
    ).permissions

    // if module_ and any item in modulePermissions is true then set module_All to true
    const isModuleAll = modulePermissions.slice(1).every((item, i) => {
      return fields[`${module}_${item}`]
    })

    if (permission === 'All') {
      if (payload.data) {
        modulePermissions.slice(1).forEach((item, i) => {
          commit('setFieldValue', {
            key: `${module}_${item}`,
            value: true
          })
        })
      } else {
        modulePermissions.slice(1).forEach((item, i) => {
          commit('setFieldValue', {
            key: `${module}_${item}`,
            value: false
          })
        })
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isModuleAll) {
        commit('setFieldValue', {
          key: `${module}_All`,
          value: true
        })
      } else {
        commit('setFieldValue', {
          key: `${module}_All`,
          value: false
        })
      }
    }

    const allKeysList = []

    typeListCopy.forEach((item, i) => {
      const { type } = item

      if (fields[`${type}_All`]) {
        allKeysList.push(`${type}_All`)
      }
    })

    if (allKeysList.length === typeListCopy.length - 1) {
      commit('setFieldValue', {
        key: 'Permission_selectAll',
        value: true
      })
    } else {
      commit('setFieldValue', {
        key: 'Permission_selectAll',
        value: false
      })
    }
  },

  async updateInDB({ state, dispatch, commit }, payload) {
    const { apiModule, table, fields } = state
    const abilities = []

    const allDataCopy = [...table.allData]

    const requiredFields = [
      {
        field: fields.name,
        message: 'قم بادخال اسم المجموعة اولا'
      }
    ]

    const missingField = requiredFields.find(f => !f.field)
    if (missingField) {
      this.$toast.warning(missingField.message)
      return
    }

    const schemaFilter = { ...fields }

    delete schemaFilter.name

    // filter any key that has a value of true and push it to the abilities array to be sent to the backend
    Object.entries(schemaFilter).forEach(([key, value]) => {
      if (value) {
        const [type, permission] = key.split('_')

        if (permission === 'All') {
          return
        }

        abilities.push({
          type,
          permission
        })
      }
    })

    const schema = {
      name: fields.name,
      abilities
    }

    const url = `${apiModule}/${payload}`

    const { data, message } = await this.$axios.$put(url, schema)

    // replace the old data with the new one in the table data array
    const index = allDataCopy.findIndex(item => item.id === payload)
    allDataCopy.splice(index, 1, data)

    commit('setTableValue', { key: 'allData', value: allDataCopy })

    this.$toast.success(message)
    dispatch('resetData')
  },

  async editRow({ commit, dispatch }, { item }) {
    await commit('setListsValue', { key: 'refreshLists', value: true })
    await commit('setFieldValue', { key: 'name', value: item.name })
    await commit('setDisplayValue', { key: 'id', value: item.id })

    await dispatch('getAllAbilities', item.id)
    await commit('setListsValue', { key: 'refreshLists', value: false })
  },

  async getAllAbilities({ state, dispatch }, payload) {
    const { apiModule } = state

    const url = `${apiModule}/${payload}`
    const { data } = await this.$axios.$get(url)

    if (!data.abilities.length) {
      dispatch('setDefaultValue')

      return
    }

    dispatch('setPermissionValue', data.abilities)
  },

  setPermissionValue({ state, commit, dispatch }, payload) {
    dispatch('setDefaultValue')
    const { lists } = state

    const filterObject = {}

    const allTrue = []

    lists.typeList.forEach((item, i) => {
      const { type, permissions } = item

      payload
        .filter(f => f.type === type)
        .forEach((x, z) => {
          const key = `${x.type}_${x.permission}`

          if (!filterObject[x.type]) {
            filterObject[x.type] = { type, permissions: [] }
          }

          filterObject[x.type].permissions.push(x.permission)

          if (filterObject[type]) {
            commit('setFieldValue', {
              key,
              value: true
            })
          } else {
            commit('setFieldValue', {
              key,
              value: false
            })
          }

          if (
            filterObject[type].permissions.length ===
            permissions.length - 1
          ) {
            allTrue.push(type)
            commit('setFieldValue', {
              key: `${type}_All`,
              value: true
            })
          }
        })
    })

    if (allTrue.length === lists.typeList.length - 1) {
      commit('setFieldValue', {
        key: 'Permission_selectAll',
        value: true
      })
    } else {
      commit('setFieldValue', {
        key: 'Permission_selectAll',
        value: false
      })
    }
  },

  deleteFromDB({ state }, payload) {
    return this.$axios.$delete(`${state.apiModule}/${payload}`)
  },

  resetData({ state, commit, dispatch }) {
    commit('setFieldValue', { key: 'name', value: null })

    for (const [key] of Object.entries(state.display)) {
      commit('setDisplayValue', { key, value: null })
    }
    dispatch('setDefaultValue')
  }
}

export const mutations = {
  setTableValue(state, { key, value, push = false }) {
    if (push) {
      state.table[key] = [...state.table[key], ...value]
      return
    }
    state.table[key] = value
  },
  setListsValue(state, { key, value }) {
    state.lists[key] = value
  },
  setFieldValue(state, { key, value }) {
    state.fields[key] = value
  },
  setDisplayValue(state, { key, value }) {
    state.display[key] = value
  }
}
