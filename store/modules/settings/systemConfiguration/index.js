const resetData = () => ({
  defaultCulture: null,
  startingDate: null,
  warehouseDepartmentId: null,
  exchangeMechanism: null,
  showCost: null,
  showThenZero: null
})

export const state = () => ({
  apiModule: '/setting',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    accounts: [],
    langsList: [
      { id: 'ar-LY', name: 'عربي' },
      { id: 'en-US', name: 'إنجليزي' }
    ],
    warehouseDepartmentList: []
  },
  fields: {
    defaultCulture: null,
    startingDate: null,
    warehouseDepartmentId: null,
    exchangeMechanism: null,
    showCost: null,
    showThenZero: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields
}

export const actions = {
  async resetData({ commit }) {
    await commit('resetData', resetData())
  },

  showData({ state, commit }, payload) {
    commit('setListsValue', {
      key: 'warehouseDepartmentList',
      value: payload.departments
    })

    for (const key in state.fields) {
      commit('setFieldValue', {
        key,
        value: payload[key]
      })
    }
  },

  async saveToDB({ state }) {
    try {
      const { message } = await this.$axios.$put(
        `${state.apiModule}`,
        state.fields
      )
      this.$toast.success(message)
    } catch (error) {}
  }
}

export const mutations = {
  resetData(state, val) {
    state.fields = val
  },
  setTableValue(state, { key, value }) {
    state.table[key] = value
  },
  setListsValue(state, { key, value }) {
    state.lists[key] = value
  },
  setFieldValue(state, { key, value }) {
    state.fields[key] = value
  }
}
