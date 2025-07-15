const format = require('@/composables/format')

/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
export const state = () => ({
  apiModule: '/purchase-invoices',
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
    supplierList: [],
    storeList: [],
    categoriesList: [],
    itemsList: [],
    constItemsList: []
  },

  fields: {
    serialNumber: null,
    date: null,
    supplierId: null,
    storeId: null,
    statement: null,
    // barcode: null,
    // name: null,
    categoryId: null,
    itemId: null,
    quantityInStock: 0,
    singleUnitsQuantity: 0,
    groupUnitsQuantity: 0,
    total: 0,
    expireDate: null,
    singleUnitsCost: 0,
    groupUnitsCost: 0,
    cost: 0
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
      key: 'supplierList',
      value: payload.suppliers
    })

    commit('setListsValue', {
      key: 'itemsList',
      value: payload.items
    })

    commit('setListsValue', {
      key: 'constItemsList',
      value: payload.items
    })

    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })

    commit('setListsValue', {
      key: 'categoriesList',
      value: payload.categories
    })

    commit('setFieldValue', {
      key: 'serialNumber',
      value: payload.fullSerialNumber
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })
  },

  categoryIdChange({ commit, state, dispatch }, payload) {
    const { lists, fields } = state

    dispatch('emptyDetails')

    if (fields.categoryId) {
      const itemsFilterByCategory = lists.constItemsList.filter(
        item => item.categoryId === fields.categoryId
      )

      commit('setListsValue', {
        key: 'itemsList',
        value: itemsFilterByCategory
      })
    } else {
      commit('setListsValue', {
        key: 'itemsList',
        value: lists.constItemsList
      })
    }
  },

  async itemIdChange({ commit, state, dispatch }, payload) {
    dispatch('emptyDetails', true)

    const { lists, fields } = state
    if (!fields.itemId) {
      return
    }

    const item = lists.itemsList.find(item => item.id === fields.itemId)

    const url = `/stored-items/GetQuntity/${fields.storeId},${fields.itemId}`
    const { data } = await this.$axios.$get(url)

    commit('setFieldValue', {
      key: 'quantityInStock',
      value: data
    })

    await commit('setDisplayValue', {
      key: 'selectItem',
      value: item || null
    })
  },

  singleUnitsQuantityChange({ dispatch }, payload) {
    dispatch('calcTotal')
  },

  groupUnitsQuantityChange({ dispatch }, payload) {
    dispatch('calcTotal')
  },

  calcTotal({ commit, state }, payload) {
    const { singleUnitsQuantity, groupUnitsQuantity } = state.fields
    const { selectItem } = state.display

    const quantityInGroup = selectItem?.quantityInGroup || 0

    commit('setFieldValue', {
      key: 'total',
      value:
        Number(singleUnitsQuantity) +
        Number(groupUnitsQuantity) * quantityInGroup
    })
  },

  singleUnitsCostChange({ commit, state }, payload) {
    const { singleUnitsCost, total } = state.fields

    const { selectItem } = state.display

    const quantityInGroup = selectItem?.quantityInGroup || 0

    const singleCost = Number(singleUnitsCost) * Number(total)

    const groupCost = Number(singleUnitsCost) * quantityInGroup

    commit('setFieldValue', {
      key: 'groupUnitsCost',
      value: groupCost
    })

    commit('setFieldValue', {
      key: 'cost',
      value: singleCost
    })
  },

  addToLocalTable({ commit, state, dispatch }, payload) {
    try {
      const { fields, lists, display } = state

      if (!fields.itemId) {
        return this.$toast.warning('يجب اختيار الصنف أولا وتحديد الكمية')
      }

      if (display.index != null) {
        return dispatch('updateLocalTable')
      }

      const allData = format.deepCopy(lists.detailsTable)

      if (!fields.supplierId) {
        return this.$toast.warning('يجب اختيار مورد أولا')
      }

      if (!fields.storeId) {
        return this.$toast.warning('يجب اختيار المخزن أولا')
      }

      const item = lists.itemsList.find(item => item.id === fields.itemId)

      const itemSchema = {}

      itemSchema.cost = Number(fields.singleUnitsCost)
      itemSchema.expireDate = format.formatDate(fields.expireDate, this)
      itemSchema.item = item
      itemSchema.itemId = fields.itemId
      itemSchema.quantity = fields.total

      const findItem = allData.find(item => item.itemId === fields.itemId)

      if (findItem && !findItem.isDelete) {
        if (findItem.item.haveExpireDate) {
          const findItemWithSameExpireDate = allData.find(
            item =>
              item.itemId === fields.itemId &&
              item.expireDate === itemSchema.expireDate &&
              item.cost === itemSchema.cost
          )
          if (
            findItemWithSameExpireDate.expireDate === itemSchema.expireDate &&
            findItemWithSameExpireDate.cost === itemSchema.cost
          ) {
            findItemWithSameExpireDate.quantity += itemSchema.quantity
          } else {
            allData.push(itemSchema)
          }
        } else if (findItem.cost === itemSchema.cost) {
          findItem.quantity += itemSchema.quantity
        } else {
          allData.push(itemSchema)
        }
      } else {
        allData.push(itemSchema)
      }

      commit('setListsValue', {
        key: 'detailsTable',
        value: allData
      })

      dispatch('emptyDetails')
    } catch (error) {}
  },

  updateLocalTable({ commit, state, dispatch }) {
    const { fields, lists, display } = state

    const allData = format.deepCopy(lists.detailsTable)

    const find = allData[display.index]
    if (find.id) {
      find.isUpdate = true
      find.isDelete = false
    }
    find.cost = Number(fields.singleUnitsCost)
    find.quantity = fields.total
    find.expireDate = fields.expireDate

    commit('setListsValue', {
      key: 'detailsTable',
      value: allData
    })

    dispatch('emptyDetails')
  },

  async addToDB({ state, commit, dispatch }) {
    try {
      const { apiModule, fields, lists } = state
      const schema = {
        supplierId: fields.supplierId,
        storeId: fields.storeId,
        date: fields.date,
        statement: fields.statement,
        createDetails: lists.detailsTable.map(x => ({
          itemId: x.itemId,
          quantity: x.quantity,
          cost: x.cost,
          expireDate: x.expireDate ? x.expireDate : null
        }))
      }

      const { message, data } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await this.$router.push(`/processes/purchase-invoices/${data.id}`)
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const schema = {
        supplierId: fields.supplierId,
        storeId: fields.storeId,
        date: fields.date,
        statement: fields.statement,
        serialNumber: fields.serialNumber?.split('-')[1],
        createDetails: lists.detailsTable
          .filter(f => !f.id)
          .map(x => ({
            itemId: x.itemId,
            quantity: x.quantity,
            cost: x.cost,
            expireDate: x.expireDate ? x.expireDate : null
          })),
        editDetails: lists.detailsTable
          .filter(f => f.isUpdate)
          .map(x => ({
            id: x.id,
            itemId: x.itemId,
            quantity: x.quantity,
            cost: x.cost,
            expireDate: x.expireDate ? x.expireDate : null
          })),
        deleteDetails: lists.deleteDetails.map(x => ({
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

  showSingleData({ state, commit }, payload) {
    commit('setFieldValue', {
      key: 'statement',
      value: payload.statement
    })
    commit('setFieldValue', {
      key: 'supplierId',
      value: payload.supplierId
    })
    commit('setFieldValue', {
      key: 'storeId',
      value: payload.storeId
    })
    commit('setListsValue', {
      key: 'detailsTable',
      value: payload.details
    })
    commit('setDisplayValue', {
      key: 'isConfirm',
      value: payload.isConfirmed
    })
  },

  showData({ state, commit, dispatch }, payload) {
    commit('setDisplayValue', {
      key: 'selectItem',
      value: payload.item.item
    })

    commit('setDisplayValue', {
      key: 'index',
      value: payload.index
    })

    commit('setFieldValue', {
      key: 'itemId',
      value: payload.item.itemId
    })

    commit('setFieldValue', {
      key: 'expireDate',
      value: payload.item.expireDate
    })

    commit('setFieldValue', {
      key: 'singleUnitsCost',
      value: payload.item.cost
    })

    if (payload.item.groupUnitsId) {
      commit('setFieldValue', {
        key: 'singleUnitsQuantity',
        value: payload.item.quantity % payload.item.item.quantityInGroup
      })

      commit('setFieldValue', {
        key: 'groupUnitsQuantity',
        value: parseInt(
          payload.item.quantity / payload.item.item.quantityInGroup
        )
      })
    } else {
      commit('setFieldValue', {
        key: 'singleUnitsQuantity',
        value: payload.item.quantity
      })
    }

    dispatch('calcTotal')
    dispatch('singleUnitsCostChange')
  },

  deleteFromLocalTable({ state, commit }, payload) {
    const { fields, lists } = state

    const allData = format.deepCopy(lists.detailsTable)

    const find = allData[payload.index]
    const filterData = allData.filter((f, i) => i !== payload.index)

    commit('setListsValue', {
      key: 'deleteDetails',
      value: [...lists.deleteDetails, find]
    })

    commit('setListsValue', {
      key: 'detailsTable',
      value: filterData
    })
  },

  async confirm({ state, commit }, payload) {
    const { apiModule } = state

    const { message, data } = await this.$axios.$patch(
      `${apiModule}/${payload}/confirm`
    )

    commit('setDisplayValue', { key: 'isConfirm', value: data.isConfirmed })
    this.$toast.success(message)
  },

  async unConfirm({ state, commit }, payload) {
    const { apiModule } = state

    const { message, data } = await this.$axios.$patch(
      `${apiModule}/${payload}/unconfirm`
    )

    commit('setDisplayValue', { key: 'isConfirm', value: data.isConfirmed })
    this.$toast.success(message)
  },

  emptyDetails({ state, commit }, payload) {
    if (!payload) {
      commit('setFieldValue', {
        key: 'itemId',
        value: null
      })
    }

    const fields = [
      'quantityInStock',
      'singleUnitsQuantity',
      'groupUnitsQuantity',
      'total',
      'singleUnitsCost',
      'groupUnitsCost',
      'cost'
    ]

    fields.forEach((field, i) => {
      commit('setFieldValue', { key: field, value: 0 })
    })

    commit('setDisplayValue', { key: 'selectItem', value: null })
    commit('setDisplayValue', { key: 'index', value: null })
  },

  resetData({ commit, state, dispatch }, payload) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    const fields = [
      'quantityInStock',
      'singleUnitsQuantity',
      'groupUnitsQuantity',
      'total',
      'singleUnitsCost',
      'groupUnitsCost',
      'cost'
    ]

    fields.forEach((field, i) => {
      commit('setFieldValue', { key: field, value: 0 })
    })

    commit('setFieldValue', { key: 'expireDate', value: null })
    commit('setDisplayValue', { key: 'selectItem', value: null })
    commit('setDisplayValue', { key: 'isConfirm', value: false })
    commit('setDisplayValue', { key: 'index', value: null })
    commit('setListsValue', {
      key: 'detailsTable',
      value: []
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
  }
}
