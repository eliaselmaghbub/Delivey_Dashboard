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
    suppliersList: [],
    employeesList: [],
    stateList: [
      { name: 'بانتظار العروض', id: 1 },
      { name: 'به عروض معروضة', id: 2 }
    ],
    deliveryStateList: [
      { name: 'مستلمة بالكامل', id: 1 },
      { name: 'مستلمة جزئيآ', id: 2 },
      { name: 'غير مستلمة', id: 3 }
    ],
    isClosedList: [
      { name: 'طلبات موافق عليها', id: true },
      { name: 'مفتوح', id: false }
    ]
  },

  fields: {
    number: null,
    commissioningOrderNumber: null,
    supplierId: null,
    preparedById: null,
    state: null,
    deliveryState: null,
    isClosed: null,
    dateFrom: null,
    dateTo: null,
    statement: null
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
    // console.warn('payload', payload)
    commit('setListsValue', {
      key: 'suppliersList',
      value: payload.suppliers
    })
    // commit('setListsValue', {
    //   key: 'storeList',
    //   value: payload.stores
    // })
    // commit('setListsValue', {
    //   key: 'departmentsList',
    //   value: payload.departments
    // })
  },

  async getDataByQuery({ state, dispatch }) {
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

  resetData({ commit, state }) {
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
