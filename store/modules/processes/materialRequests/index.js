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
    materialRequestsFilterTypeList: [
      { name: 'طلبات متعلقة بي', id: 0 },
      { name: 'طلبات مسجلة من قبلي', id: 1 },
      { name: 'كافة الطلبات', id: 2 }
    ],
    deliveryStateList: [
      { name: 'مستلمة بالكامل', id: 1 },
      { name: 'مستلمة جزئيآ', id: 2 },
      { name: 'غير مستلمة', id: 3 }
    ],
    stateList: [
      { name: 'فعال', id: 1 },
      { name: 'طلبات تتم تعليقها', id: 2 },
      { name: 'طلب تعديل', id: 3 },
      { name: 'طلبات موافق عليها', id: 4 },
      { name: 'طلبات غير موافق عليها', id: 5 },
      { name: 'طلبات غير مكتملة', id: 6 }
    ],
    employeesList: [],
    departmentsList: [],
    storeList: []
  },

  fields: {
    materialRequestsFilterType: null,
    number: null,
    storeId: null,
    requesterDepartmentId: null,
    employeeId: null,
    state: null,
    deliveryState: null,
    dateFrom: null,
    dateTo: null,
    statement: null,
    onlyShowRequestWithNoResponseFromMe: null
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
      key: 'employeesList',
      value: payload.employees
    })
    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })
    commit('setListsValue', {
      key: 'departmentsList',
      value: payload.departments
    })
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
