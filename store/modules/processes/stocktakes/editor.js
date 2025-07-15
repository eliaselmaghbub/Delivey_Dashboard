// const format = require('@/composables/format')

/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
export const state = () => ({
  apiModule: 'stocktakes',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    CreateDetails: [],
    StocktakeTypeList: [
      { name: 'سنوي', id: 1 },
      { name: 'عادي', id: 2 }
    ],
    isConfirmedList: [
      { name: 'معتمد', id: true },
      { name: 'غير معتمد', id: false }
    ],
    stordItemId: [],
    stordItemList: [],
    detailsTable: [],
    deleteDetails: [],
    supplierList: [],
    storeList: [],
    employees: [],
    departments: [],
    committees: [],
    categoriesList: [],
    itemsList: [],
    constItemsList: []
  },

  fields: {
    SerialNumber: null,
    storeId: null,
    date: null,
    Statement: null,
    StocktakeType: null,

    isConfirmed: false,

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
    index: null
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
    commit('setFieldValue', {
      key: 'SerialNumber',
      value: payload.fullSerialNumber
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })

    commit('setFieldValue', {
      key: 'isConfirmed',
      value: payload.isConfirmed
    })

    // commit('setFieldValue', {
    //   key: 'isConfirmed',
    //   value: false
    // })

    commit('setFieldValue', {
      key: 'Statement',
      value: payload.statement
    })

    commit('setFieldValue', {
      key: 'StocktakeType',
      value: payload.stocktakeType
    })

    commit('setFieldValue', {
      key: 'storeId',
      value: payload.storeId
    })

    commit('setListsValue', {
      key: 'storeList',
      value: payload.store
    })

    commit('setTableValue', {
      key: 'allData',
      value: payload.details
    })
  },

  async storeIdChange({ commit, state, dispatch }, payload) {
    const { lists, fields } = state

    const { data } = await this.$axios.$get(
      `/stored-items/getItemByCostAndExpireDateAndStore/${fields.storeId}`
    )

    commit('setListsValue', {
      key: 'stordItemList',
      value: data.storedItems
    })
    commit('setTableValue', { key: 'allData', value: data.storedItems })
  },

  itemIdChange({ commit, state, dispatch }, payload) {
    dispatch('resetData', true)
    const { lists, fields } = state

    if (!fields.itemId) {
      return
    }

    const item = lists.stordItemList.find(item => item.id === fields.itemId)

    commit('setDisplayValue', {
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

  async addToDB({ state, commit, dispatch }) {
    try {
      const { apiModule, fields, lists, table } = state

      table.allData.forEach((allData, i) => {
        if (allData.newQuantity) {
          const schema2 = {
            StoredItemId: allData.id,
            NewQuantity: allData.newQuantity
          }

          lists.CreateDetails.push(schema2)
        }
      })

      const schema = {
        StoreId: fields.storeId,
        Date: fields.date,
        Statement: fields.Statement,
        StocktakeType: fields.StocktakeType,
        CreateDetails: lists.CreateDetails
      }

      const { message } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  async confirmData({ state, commit, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const { message } = await this.$axios.$patch(
        `/stocktakes/${payload}/confirm`
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields, lists, table } = state

      const CreateDetails = []
      const EditDetails = []
      const DeleteDetails = []

      table.allData.forEach((allData, i) => {
        if (
          allData.id === '00000000-0000-0000-0000-000000000000' &&
          allData.newQuantity
        ) {
          const schema2 = {
            StoredItemId: allData.storedItemId,
            NewQuantity: allData.newQuantity
          }

          CreateDetails.push(schema2)
        } else if (
          allData.id !== '00000000-0000-0000-0000-000000000000' &&
          allData.newQuantity
        ) {
          const schema2 = {
            Id: allData.id,
            NewQuantity: allData.newQuantity
          }

          EditDetails.push(schema2)
        } else if (
          allData.id !== '00000000-0000-0000-0000-000000000000' &&
          !allData.newQuantity
        ) {
          DeleteDetails.push(allData.id)
        }
      })

      const schema = {
        StoreId: fields.storeId,
        Date: fields.date,
        Statement: fields.Statement,
        StocktakeType: fields.StocktakeType,
        CreateDetails,
        EditDetails,
        DeleteDetails
      }

      const { message } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        schema
      )
      await this.$toast.success(message)
    } catch (error) {}
  },

  async getDataByQuery({ state, dispatch }, payload) {
    const params = {
      currentPage: state.table.page || 1,
      pageSize: state.table.perPage || 25,
      ...state.fields
    }
    const { data } = await this.$axios.$get(`${state.apiModule}/filter`, {
      params
    })

    dispatch('getAllDataFromApi', data)
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
  changeInputDataInTable(state, payload) {
    console.log(payload)
    state.table.allData[payload.data.index].newQuantity = payload.value
  }
}
