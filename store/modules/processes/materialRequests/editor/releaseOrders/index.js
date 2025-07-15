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
  lists: {},

  fields: {},
  display: {
    tabLoading: null,
    isEditor: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  async getAllDataFromApi({ commit }, payload) {
    await commit('setDisplayValue', {
      key: 'tabLoading',
      value: true
    })

    const { data } = await this.$axios.$get(
      `/release-orders?materialRequestId=${payload}`
    )

    await commit('setTableValue', {
      key: 'allData',
      value: data
    })
    commit('setTableValue', {
      key: 'totalItems',
      value: data.length
    })

    await commit('setDisplayValue', {
      key: 'tabLoading',
      value: null
    })
  },

  async deleteFromDB({ state, commit }, { item }) {
    try {
      // console.warn('payload', payload)
      await commit('setDisplayValue', {
        key: 'tabLoading',
        value: true
      })
      await commit('deleteFromDB', item.id)
      await this.$axios.$delete(`/release-orders/${item.id}`)
      return commit('setDisplayValue', {
        key: 'tabLoading',
        value: null
      })
    } catch (error) {}
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
  deleteFromDB(state, id) {
    state.table.allData = state.table.allData.filter(item => item.id !== id)
  }
}
