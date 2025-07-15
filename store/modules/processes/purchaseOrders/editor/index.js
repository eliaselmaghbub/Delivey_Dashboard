import { set } from 'vue'

const format = require('@/composables/format')

/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
export const state = () => ({
  apiModule: '/purchase-orders',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    stateList: [
      { name: 'بانتظار العروض', id: 1 },
      { name: 'به عروض معروضة', id: 2 }
    ],
    deliveryStateList: [
      { name: 'مستلم كامل', id: 1 },
      { name: 'مستلمة جزئ', id: 2 },
      { name: 'غير مستلمة', id: 3 }
    ],
    isClosedList: [
      { name: 'طلبات موافق عليها', id: true },
      { name: 'مفتوح', id: false }
    ],

    detailsTable: [],
    deleteDetails: [],
    classificationList: [
      { name: 'الإدارة', id: 1 },
      { name: 'اللجان', id: 2 }
    ],
    unitList: [],
    itemsList: []
  },

  fields: {
    number: null,
    fullNumber: null,
    date: null,
    preparedByName: null,
    state: 1,
    deliveryState: 3,
    isClosed: false,
    statement: null,

    singelItemId: null,
    item: null,
    features: null,
    quantity: null,
    unitId: null,
    note: null
  },
  display: {
    selectItem: null,
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
      key: 'unitList',
      value: payload.units
    })

    commit('setListsValue', {
      key: 'itemsList',
      value: payload.items
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
      key: 'preparedByName',
      value: payload.preparedByName
    })
  },

  singelItemIdChange({ commit, state, dispatch }, payload) {
    dispatch('emptyDetails')

    const { lists, fields } = state
    if (!fields.singelItemId) {
      return
    }

    const find = format.findItem(lists.itemsList, fields.singelItemId)

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

      const singelItemId = fields.singelItemId

      if (!singelItemId && !fields.item) {
        return this.$toast.warning('يجب اختيار الصنف أولا')
      }

      if (!fields.quantity) {
        return this.$toast.warning('يجب ادخال الكمية أولا')
      }

      if (!fields.unitId) {
        return this.$toast.warning('يجب اختيار الوحدة أولا')
      }

      const dataArray = [...lists.detailsTable]

      const issingelItemIdExist = format.findItem(
        dataArray,
        singelItemId,
        'singelItemId'
      )
      const isItemNameExist = format.findItem(dataArray, fields.item, 'item')

      if (
        (issingelItemIdExist && singelItemId) ||
        (isItemNameExist && fields.item)
      ) {
        return this.$toast.warning('الصنف موجود بالفعل')
      }

      const findItem = format.findItem(lists.itemsList, singelItemId)
      const findUnit = format.findItem(lists.unitList, fields.unitId)

      dataArray.push({
        itemName: findItem ? findItem.name : fields.item,
        singelItemId: findItem ? findItem.id : null,
        item: fields.item,
        features: fields.features,
        quantity: Number(fields.quantity),
        unit: findUnit.name,
        unitId: findUnit.id,
        note: fields.note
      })

      commit('setListsValue', {
        key: 'detailsTable',
        value: dataArray
      })

      dispatch('emptyDetails', true)
    } catch (error) {}
  },

  updateLocalTable({ commit, state, dispatch }) {
    try {
      const { fields, lists, display } = state

      const findItem = format.findItem(lists.itemsList, fields.singelItemId)
      const findUnit = format.findItem(lists.unitList, fields.unitId)

      const find = structuredClone(lists.detailsTable[display.index])
      if (find.id) {
        find.isUpdate = true
        find.isDelete = false
      }

      find.name = findItem ? findItem.name : fields.item
      find.singelItemId = findItem ? findItem.id : null
      find.itemName = findItem ? findItem.name : fields.item
      find.features = fields.features
      find.quantity = Number(fields.quantity)
      find.unit = findUnit.name
      find.unitId = findUnit.id
      find.note = fields.note

      commit('updateItem', {
        key: 'detailsTable',
        value: find,
        index: display.index
      })

      dispatch('emptyDetails', true)
    } catch (error) {
      console.warn('error', error)
    }
  },

  async addToDB({ state, commit, dispatch }) {
    try {
      const { apiModule, fields, lists } = state

      const requiredFields = [
        { field: fields.statement, message: 'قم بادخال البيان اولا' }
      ]

      const missingField = requiredFields.find(f => !f.field)
      if (missingField) {
        this.$toast.warning(missingField.message)
        return
      }

      const schema = {
        number: fields.number,
        date: fields.date,
        statement: fields.statement,
        createItems: lists.detailsTable.map(x => ({
          quantity: x.quantity,
          item: x.item,
          features: x.features,
          unitId: x.unitId,
          note: x.note,
          singelItemId: x.singelItemId
        }))
      }

      const { message, data } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await this.$router.push(`/processes/purchase-orders/${data.id}`)
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const requiredFields = [
        { field: fields.statement, message: 'قم بادخال البيان اولا' }
      ]

      const missingField = requiredFields.find(f => !f.field)
      if (missingField) {
        this.$toast.warning(missingField.message)
        return
      }

      const schema = {
        number: fields.number,
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
            singelItemId: x.singelItemId
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
            singelItemId: x.singelItemId
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

  showSingleData({ state, commit, dispatch }, payload) {
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

    commit('setFieldValue', {
      key: 'fullNumber',
      value: payload.fullNumber
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
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
      key: 'preparedByName',
      value: payload.preparedByName
    })
  },

  showData({ commit, dispatch }, payload) {
    dispatch('emptyDetails')

    commit('setDisplayValue', {
      key: 'index',
      value: payload.index
    })

    commit('setFieldValue', {
      key: 'singelItemId',
      value: payload.item.singelItemId
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
      key: 'note',
      value: payload.item.note
    })
  },

  deleteFromLocalTable({ state, commit }, payload) {
    const { lists } = state

    console.warn('payload', payload)

    const find = lists.detailsTable[payload.index]
    commit('deleteItem', { key: 'detailsTable', index: payload.index })

    commit('setListsValue', {
      key: 'deleteDetails',
      value: [...lists.deleteDetails, find]
    })
  },

  emptyDetails({ state, commit }, payload) {
    if (payload) {
      commit('setFieldValue', { key: 'singelItemId', value: null })
    }

    const fields = ['item', 'features', 'quantity', 'unitId', 'note']

    fields.forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setDisplayValue', { key: 'index', value: null })
  },

  resetData({ commit, state, dispatch }, payload) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setListsValue', {
      key: 'detailsTable',
      value: []
    })

    commit('setListsValue', {
      key: 'deleteDetails',
      value: []
    })

    commit('setFieldValue', {
      key: 'state',
      value: 1
    })

    commit('setFieldValue', {
      key: 'deliveryState',
      value: 3
    })

    commit('setFieldValue', {
      key: 'isClosed',
      value: false
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
