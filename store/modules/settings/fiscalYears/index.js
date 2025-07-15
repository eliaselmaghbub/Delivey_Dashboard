export const state = () => ({
  apiModule: '/fiscal-years',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    costCentersList: []
  },
  fields: {
    year: null,
    costCenterId: null
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
  getAllDataFromApi({ commit }, payload) {
    commit('setTableValue', {
      key: 'totalItems',
      value: payload.result.length
    })
    commit('setTableValue', { key: 'allData', value: payload.result })
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields } = state

      if (!fields.year) {
        this.$toast.warning('قم بإدخال السنة أولا')
        return false
      }

      const schema = {
        year: fields.year
      }

      const { message } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await dispatch('resetData')
    } catch (error) {}
  },

  close({ state }, payload) {
    try {
      // return this.$axios.$delete(`${state.apiModule}/${payload}`);
    } catch (error) {}
  },

  reopen({ state }, payload) {
    try {
      // return this.$axios.$delete(`${state.apiModule}/${payload}`);
    } catch (error) {}
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
  setTableValue(state, { key, value }) {
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
