export const state = () => ({
  apiModule: '/directrelease-orders',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    isConfirmedList: [
      { name: 'معتمد', id: true },
      { name: 'غير معتمد', id: false }
    ],
    supplierList: [],
    employees: [],
    departments: [],
    storeList: []
  },

  fields: {
    employeeId: null,
    deparmentId: null,
    storeId: null,
    isConfirmed: null,
    dateFrom: null,
    dateTo: null
  },
  display: {}
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  async getAllDataFromApi({ commit }, payload) {
    await commit('setTableValue', {
      key: 'allData',
      value: payload.results
    })

    commit('setTableValue', {
      key: 'totalItems',
      value: payload.total
    })
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'employees',
      value: payload.employees
    })

    commit('setListsValue', {
      key: 'departments',
      value: payload.departments[0].children
    })
    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })
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
  },

  deleteFromDB({ state }, payload) {
    try {
      return this.$axios.$delete(`${state.apiModule}/${payload}`)
    } catch (error) {}
  },

  resetData({ commit, state, dispatch }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
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
