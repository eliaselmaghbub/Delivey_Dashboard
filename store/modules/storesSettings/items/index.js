export const state = () => ({
  apiModule: '/items',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    categoriesList: [],
    sortByList: [
      { id: 1, name: 'الاسم' },
      { id: 2, name: 'التصنيف' },
      { id: 3, name: 'رقم الصنف' }
    ],
    sortTypeList: [
      { id: 0, name: 'ترتيب الأسماء تصاعديآ' },
      { id: 1, name: 'ترتيب الأسماء تنازليآ' }
    ]
  },

  fields: {
    barcode: null,
    name: null,
    categoryId: null,
    number: null,
    sortBy: 1,
    sortType: 0
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
    payload.results.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', {
      key: 'allData',
      value: payload.results
    })

    commit('setTableValue', { key: 'totalItems', value: payload.total })
  },

  async getAllListsFromApi({ commit }, payload) {
    await commit('setListsValue', {
      key: 'categoriesList',
      value: payload.categoryList
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
