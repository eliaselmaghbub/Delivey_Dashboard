import { set } from 'vue'

const format = require('@/composables/format')

/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
export const state = () => ({
  apiModule: '/material-requests',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    detailsTable: [],
    deleteDetails: [],
    classificationList: [
      { name: 'الإدارة', id: 1 },
      { name: 'اللجان', id: 2 }
    ],
    deliveryStateList: [
      { name: 'مستلم كامل', id: 1 },
      { name: 'مستلمة جزئ', id: 2 },
      { name: 'غير مستلمة', id: 3 }
    ],
    materialRequestStateList: [
      { name: 'فعال', id: 1 },
      { name: 'معلق', id: 2 },
      { name: 'طلب تعديل', id: 3 },
      { name: 'طلب موافق عليه', id: 4 },
      { name: 'طلب مرفوض', id: 5 },
      { name: 'طلب مكتمل', id: 6 }
    ],
    committeesList: [],
    storeList: [],
    unitList: [],
    itemsList: [],
    movementProcessList: [
      { name: 'اعتماد', id: 1 },
      { name: 'طلب تعديل', id: 2 },
      { name: 'تعليق', id: 3 },
      { name: 'الموافقة على الطلب', id: 4 },
      { name: 'عدم الموافقة', id: 5 },
      { name: 'افراج', id: 6 }
    ],

    departmentsList: [],
    receiverEmployeeList: [],
    awaitingApprovalsList: [],
    movementsList: [],
    approvalsList: []
  },

  fields: {
    number: null,
    fullNumber: null,
    date: null,
    storeId: null,
    classificationId: null,
    requesterDepartmentName: null,
    committeeId: null,
    requesterEmployeeName: null,
    materialRequestState: null,
    deliveryState: 3,
    statement: null,
    itemId: null,
    item: null,
    features: null,
    quantity: null,
    unitId: null,
    detailsNote: null,
    movementProcess: 1,
    departmentId: null,
    receiverEmployeeId: null,
    note: null
  },
  display: {
    selectItem: null,
    isActive: null,
    userIsRequester: false,
    index: null,
    isConfirm: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'committeesList',
      value: payload.committees
    })

    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })

    commit('setListsValue', {
      key: 'departmentsList',
      value: payload.departments
    })

    commit('setListsValue', {
      key: 'unitList',
      value: payload.units
    })

    commit('setListsValue', {
      key: 'itemsList',
      value: payload.items
    })

    commit('setDisplayValue', {
      key: 'userIsRequester',
      value: payload.userIsRequester
    })

    commit('setFieldValue', {
      key: 'number',
      value: payload.number
    })

    commit('setFieldValue', {
      key: 'fullNumber',
      value: payload.fullNumber
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })

    commit('setFieldValue', {
      key: 'requesterDepartmentName',
      value: payload.requesterDepartmentName
    })

    commit('setFieldValue', {
      key: 'requesterEmployeeName',
      value: payload.requesterEmployeeName
    })
  },

  async movementProcessChange({ commit, state, dispatch }, payload) {
    try {
      const { apiModule, fields } = state

      const params = {
        val: fields.movementProcess,
        id: payload.id
      }

      const { data } = await this.$axios.$get(`${apiModule}/val/id`, {
        params
      })

      commit('setFieldValue', {
        key: 'departmentId',
        value: data?.departmentId
      })

      dispatch('departmentIdChange', data?.employeeId)
    } catch (error) {}
  },

  itemIdChange({ commit, state, dispatch }, payload) {
    dispatch('emptyDetails')

    const { lists, fields } = state
    if (!fields.itemId) {
      return
    }

    const find = format.findItem(lists.itemsList, fields.itemId)

    commit('setFieldValue', {
      key: 'unitId',
      value: find.singleUnitsId
    })
  },

  addToLocalTable({ commit, state, dispatch }, payload) {
    try {
      const { fields, lists, display } = state

      if (display.index != null) {
        return dispatch('updateLocalTable')
      }

      const itemId = fields.itemId

      if (!itemId && !fields.item) {
        return this.$toast.warning('يجب اختيار الصنف أولا')
      }

      // if (!fields.features) {
      //   return this.$toast.warning('يجب ادخال المواصفات أولا')
      // }

      if (!fields.quantity) {
        return this.$toast.warning('يجب ادخال الكمية أولا')
      }

      if (!fields.unitId) {
        return this.$toast.warning('يجب اختيار الوحدة أولا')
      }

      const dataArray = [...lists.detailsTable]

      const isItemIdExist = format.findItem(dataArray, itemId, 'itemId')
      const isItemNameExist = format.findItem(dataArray, fields.item, 'item')

      if ((isItemIdExist && itemId) || (isItemNameExist && fields.item)) {
        return this.$toast.warning('الصنف موجود بالفعل')
      }

      const findItem = format.findItem(lists.itemsList, itemId)
      const findUnit = format.findItem(lists.unitList, fields.unitId)

      dataArray.push({
        itemName: findItem ? findItem.name : fields.item,
        itemId: findItem ? findItem.id : null,
        item: fields.item,
        features: fields.features,
        quantity: Number(fields.quantity),
        unitName: findUnit.name,
        unitId: findUnit.id,
        note: fields.detailsNote
      })

      commit('setListsValue', {
        key: 'detailsTable',
        value: dataArray
      })

      dispatch('emptyDetails', true)
    } catch (error) {}
  },

  updateLocalTable({ commit, state, dispatch }) {
    const { fields, lists, display } = state

    const findItem = format.findItem(lists.itemsList, fields.itemId)
    const findUnit = format.findItem(lists.unitList, fields.unitId)

    const find = structuredClone(lists.detailsTable[display.index])
    if (find.id) {
      find.isUpdate = true
      find.isDelete = false
    }

    find.name = findItem ? findItem.name : fields.item
    find.itemId = findItem ? findItem.id : null
    find.itemName = findItem ? findItem.name : fields.item
    find.features = fields.features
    find.quantity = Number(fields.quantity)
    find.unitName = findUnit.name
    find.unitId = findUnit.id
    find.note = fields.detailsNote

    commit('updateItem', {
      key: 'detailsTable',
      value: find,
      index: display.index
    })

    dispatch('emptyDetails', true)
  },

  async departmentIdChange({ commit, state, dispatch }, payload) {
    try {
      const { fields, lists } = state

      const departmentId = fields.departmentId

      if (!departmentId) {
        commit('setFieldValue', {
          key: 'receiverEmployeeId',
          value: null
        })
        return
      }

      const url = `/employees/load?department=${departmentId}&=&getManagersOnly={getManagersOnly}`

      const { data } = await this.$axios.$get(url)

      commit('setListsValue', {
        key: 'receiverEmployeeList',
        value: data
      })

      commit('setFieldValue', {
        key: 'receiverEmployeeId',
        value: payload || null
      })
    } catch (error) {}
  },

  async addToDB({ state, commit, dispatch }) {
    try {
      const { apiModule, fields, lists } = state

      const requiredFields = [
        { field: fields.statement, message: 'قم بادخال البيان اولا' },
        {
          field: fields.departmentId,
          message: 'قم باختيار الجهة المستقبلة اولا'
        },
        {
          field: fields.receiverEmployeeId,
          message: 'قم باختيار الموظف المستقبل أولا'
        }
      ]

      const missingField = requiredFields.find(f => !f.field)
      if (missingField) {
        this.$toast.warning(missingField.message)
        return
      }

      const schema = {
        number: fields.number,
        note: fields.note,
        receiverEmployeeId: fields.receiverEmployeeId,
        committeeId: fields.committeeId,
        storeId: fields.storeId,
        date: fields.date,
        statement: fields.statement,
        createItems: lists.detailsTable.map(x => ({
          quantity: x.quantity,
          item: x.item,
          features: x.features,
          unitId: x.unitId,
          note: x.note,
          itemId: x.itemId
        }))
      }

      const { message, data } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await this.$router.push(`/processes/material-requests/${data.id}`)
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const requiredFields = [
        { field: fields.statement, message: 'قم بادخال البيان اولا' },
        {
          field: fields.departmentId,
          message: 'قم باختيار الجهة المستقبلة اولا'
        },
        {
          field: fields.receiverEmployeeId,
          message: 'قم باختيار الموظف المستقبل أولا'
        }
      ]

      const missingField = requiredFields.find(f => !f.field)
      if (missingField) {
        this.$toast.warning(missingField.message)
        return
      }

      const schema = {
        number: fields.number,
        note: fields.note,
        receiverEmployeeId: fields.receiverEmployeeId,
        committeeId: fields.committeeId,
        storeId: fields.storeId,
        date: fields.date,
        statement: fields.statement,
        createItems: lists.detailsTable
          .filter(f => !f.id)
          .map(x => ({
            quantity: x.quantity,
            item: x.item,
            features: x.features,
            unitId: x.unitId,
            note: x.note,
            itemId: x.itemId
          })),
        editItems: lists.detailsTable
          .filter(f => f.isUpdate)
          .map(x => ({
            id: x.id,
            quantity: x.quantity,
            item: x.item,
            features: x.features,
            unitId: x.unitId,
            note: x.note,
            itemId: x.itemId
          })),
        deleteItems: lists.deleteDetails.map(x => ({
          id: x.id
        }))
      }

      const { message } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        schema
      )
      await this.$toast.success(message)
    } catch (error) {}
  },

  async sendMovement({ state, commit }, payload) {
    try {
      const { fields } = state

      const url = `/material-requests/${payload}`

      const schema = {
        process: fields.movementProcess,
        note: fields.note,
        receiverEmployeeId: fields.receiverEmployeeId,
        committeeId: fields.committeeId
      }

      const { data, message } = await this.$axios.$patch(url, schema)

      console.warn('data', data)

      commit('setDisplayValue', {
        key: 'isActive',
        value: data.isActive
      })

      await this.$toast.success(message)
    } catch (error) {}
  },

  async showSingleData({ state, commit, dispatch }, payload) {
    commit('setListsValue', {
      key: 'approvalsList',
      value: payload.approvals
    })
    commit('setListsValue', {
      key: 'awaitingApprovalsList',
      value: payload.awaitingApprovals
    })
    commit('setListsValue', {
      key: 'movementsList',
      value: payload.movements
    })
    commit('setListsValue', {
      key: 'committeesList',
      value: payload.committees
    })

    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })

    commit('setListsValue', {
      key: 'departmentsList',
      value: payload.departments
    })

    commit('setListsValue', {
      key: 'unitList',
      value: payload.units
    })

    commit('setListsValue', {
      key: 'itemsList',
      value: payload.itemsList
    })

    commit('setListsValue', {
      key: 'detailsTable',
      value: payload.items
    })

    commit('setFieldValue', {
      key: 'number',
      value: payload.number
    })

    commit('setDisplayValue', {
      key: 'userIsRequester',
      value: payload.userIsRequester
    })
    commit('setDisplayValue', {
      key: 'isActive',
      value: payload.isActive
    })

    commit('setFieldValue', {
      key: 'fullNumber',
      value: payload.fullNumber
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })

    commit('setFieldValue', {
      key: 'requesterDepartmentName',
      value: payload.requesterDepartmentName
    })

    commit('setFieldValue', {
      key: 'requesterEmployeeName',
      value: payload.requesterEmployeeName
    })

    commit('setFieldValue', {
      key: 'note',
      value: payload.endNote
    })

    commit('setFieldValue', {
      key: 'storeId',
      value: payload.storeId
    })

    commit('setFieldValue', {
      key: 'statement',
      value: payload.statement
    })

    commit('setFieldValue', {
      key: 'deliveryState',
      value: payload.deliveryState
    })

    commit('setFieldValue', {
      key: 'materialRequestState',
      value: payload.state
    })

    commit('setFieldValue', {
      key: 'departmentId',
      value: payload.receiverDepartmentId
    })

    await dispatch('departmentIdChange')

    commit('setFieldValue', {
      key: 'receiverEmployeeId',
      value: payload.receiverEmployeeId
    })
  },

  showData({ commit }, payload) {
    commit('setDisplayValue', {
      key: 'index',
      value: payload.index
    })

    commit('setFieldValue', {
      key: 'itemId',
      value: payload.item.itemId
    })

    commit('setFieldValue', {
      key: 'item',
      value: payload.item.item
    })

    commit('setFieldValue', {
      key: 'features',
      value: payload.item.features
    })

    commit('setFieldValue', {
      key: 'quantity',
      value: payload.item.quantity
    })

    commit('setFieldValue', {
      key: 'unitId',
      value: payload.item.unitId
    })

    commit('setFieldValue', {
      key: 'detailsNote',
      value: payload.item.note
    })
  },

  deleteFromLocalTable({ state, commit }, payload) {
    const { lists } = state

    const find = lists.detailsTable[payload.index]
    commit('deleteItem', { key: 'detailsTable', value: null })

    commit('setListsValue', {
      key: 'deleteDetails',
      value: [...lists.deleteDetails, find]
    })
  },

  emptyDetails({ state, commit }, payload) {
    if (payload) {
      commit('setFieldValue', { key: 'itemId', value: null })
    }

    const fields = ['item', 'features', 'quantity', 'unitId', 'detailsNote']

    fields.forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setDisplayValue', { key: 'index', value: null })
  },

  resetData({ commit, state, dispatch }, payload) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setFieldValue', {
      key: 'movementProcess',
      value: 1
    })

    commit('setFieldValue', {
      key: 'deliveryState',
      value: 3
    })

    commit('setListsValue', {
      key: 'detailsTable',
      value: []
    })

    commit('setListsValue', {
      key: 'deleteDetails',
      value: []
    })

    commit('setListsValue', {
      key: 'receiverEmployeeList',
      value: []
    })

    commit('setDisplayValue', {
      key: 'isActive',
      value: true
    })
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
  },
  updateItem(state, payload) {
    const { key, value, index } = payload
    set(state.lists[key], index, value)
  },
  deleteItem(state, payload) {
    const { key, index } = payload
    state.lists[key].splice(index, 1)
  }
}
