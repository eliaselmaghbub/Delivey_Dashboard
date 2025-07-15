export const state = () => ({
  apiModule: '/stores',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {},

  fields: {
    name: null,
    address: null,
    mobile: null,
    phone: null
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
    payload.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', { key: 'allData', value: payload })
    commit('setTableValue', { key: 'totalItems', value: payload.length })
  },

  getAllListsFromApi({ commit }, payload) {},

  editRow({ commit }, { item }) {},

  async getDataByQuery({ state, dispatch }, payload) {
    const { apiModule, fields } = state

    const schema = {
      name: fields.name,
      address: fields.address,
      mobile: fields.mobile,
      phone: fields.phone
    }

    const params = {
      ...schema
    }
    const { data } = await this.$axios.$get(`${apiModule}/filter`, {
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

    commit('setDisplayValue', { key: 'id', value: null })
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
