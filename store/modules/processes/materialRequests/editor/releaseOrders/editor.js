import { set } from 'vue'
const format = require('@/composables/format')

export const state = () => ({
  // apiModule: '/api/stored-items',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    storedItemsList: [],
    deleteItems: []
  },

  fields: {
    number: null,
    date: null,
    note: null,
    isConfirmed: 'غير معتمد'
  },
  display: {
    id: null,
    isConfirmed: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  async getAllDataFromApi({ state, commit, dispatch }, payload) {
    await dispatch('resetData')

    const { display } = state

    if (display.id) {
      const { data } = await this.$axios.$get(`/release-orders/${display.id}`)

      commit('setDisplayValue', {
        key: 'isConfirmed',
        value: data.isConfirmed
      })
      console.warn('data', data)
      dispatch('setData', data)
      return
    }

    const { data } = await this.$axios.$get(`/release-orders/${payload}/get`)

    console.warn('data', data)

    dispatch('setData', data)
  },

  setData({ commit }, payload) {
    commit('setFieldValue', {
      key: 'number',
      value: payload.number
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })

    commit('setListsValue', {
      key: 'storedItemsList',
      value: payload.storedItems
    })

    commit('setTableValue', {
      key: 'allData',
      value: payload.items
    })
  },

  async addToDB({ state, commit, dispatch }, payload) {
    try {
      const { table, fields, display } = state

      if (display.id) {
        return dispatch('updateInDB')
      }

      const createItems = table.allData
        .filter(f => f.storedItemId && f.quantity)
        .map(item => ({
          quantity: item.quantity,
          storedItemId: item.storedItemId,
          materialRequestItemId: item.materialRequestItemId,
          note: item.note
        }))

      const schema = {
        number: fields.number,
        date: fields.date,
        note: fields.note,
        createItems
      }

      const { message } = await this.$axios.$post(
        `/release-orders/${payload}`,
        schema
      )

      this.$toast.success(message)

      if (message) {
        return true
      }
    } catch (error) {}
  },

  async updateInDB({ state, commit, dispatch }, payload) {
    try {
      const { table, lists, fields, display } = state

      const deleteItems = lists.deleteItems

      const editItems = table.allData
        .filter(f => f.id && f.storedItemId && f.quantity && f.isUpdated)
        .map(item => ({
          id: item.id,
          quantity: item.quantity,
          storedItemId: item.storedItemId,
          note: item.note
        }))

      const createItems = table.allData
        .filter(f => !f.id && f.storedItemId && f.quantity && !f.isUpdated)
        .map(item => ({
          quantity: item.quantity,
          storedItemId: item.storedItemId,
          materialRequestItemId: item.materialRequestItemId,
          note: item.note
        }))

      const schema = {
        number: fields.number,
        date: fields.date,
        note: fields.note,
        createItems,
        editItems,
        deleteItems
      }

      const { data, message } = await this.$axios.$put(
        `/release-orders/${display.id}`,
        schema
      )

      commit('setTableValue', {
        key: 'allData',
        value: data.items
      })

      commit('setListsValue', {
        key: 'deleteItems',
        value: []
      })

      this.$toast.success(message)
    } catch (error) {}
  },

  async confirm({ state, commit }, payload) {
    try {
      const { display } = state

      const { data } = await this.$axios.$patch(
        `/release-orders/${display.id}/confirm`
      )

      console.warn('data', data)
    } catch (error) {}
  },

  async unConfirm({ state, commit }, payload) {
    try {
      const { display } = state

      const { data } = await this.$axios.$patch(
        `/release-orders/${display.id}/unconfirm`
      )

      console.warn('data', data)
    } catch (error) {}
  },

  deleteFromLocalTable({ state, commit }, payload) {
    commit('deleteFromLocalTable', payload)
  },

  resetData({ commit }, payload) {
    commit('setFieldValue', {
      key: 'number',
      value: null
    })

    commit('setFieldValue', {
      key: 'note',
      value: null
    })

    commit('setFieldValue', {
      key: 'date',
      value: null
    })

    commit('setListsValue', {
      key: 'storedItemsList',
      value: []
    })

    commit('setTableValue', {
      key: 'allData',
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
  },
  updateItemId(state, payload) {
    const { value, index, item, isUpdated } = payload
    const find = format.findItem(state.lists.storedItemsList, value)

    console.warn('find', find)

    item.storedItemId = value
    // item.itemName = find ? find.itemName : null
    item.isUpdated = isUpdated
    set(state.table.allData, index, item)
  },
  updateQuantity(state, payload) {
    const { value, index, item, isUpdated } = payload
    item.quantity = value
    item.isUpdated = isUpdated
    set(state.table.allData, index, item)
  },
  deleteFromLocalTable(state, payload) {
    const { index, item } = payload
    state.lists.deleteItems.push({ id: item.id })
    state.table.allData.splice(index, 1)
  }
}
