export const state = () => ({
  apiModule: '/suppliers',
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
    subCategoriesList: [],
    analyticalCategoryList: [],
    unitsList: []
  },

  fields: {
    fullName: null,
    address: null,
    phone1: null,
    representative: null,
    internationalPhone: null,
    email: null,
    quality: 0,
    transaction: 0,
    executionSpeed: 0,
    saleOnCredit: false
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
  async getAllListsFromApi({ commit }, payload) {
    await commit('setListsValue', {
      key: 'categoriesList',
      value: payload.categoryList
    })
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields } = state

      const schema = {
        ...fields
      }

      const { message, data } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)

      await this.$router.push(`/stores-settings/suppliers/${data.id}`)

      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields } = state

      const schema = {
        ...fields
      }

      const { message } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        schema
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  qualityChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (fields.quality > 100) {
      commit('setFieldValue', { key: 'quality', value: null })
    }
  },

  transactionChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (fields.transaction > 100) {
      commit('setFieldValue', { key: 'transaction', value: null })
    }
  },

  executionSpeedChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (fields.executionSpeed > 100) {
      commit('setFieldValue', { key: 'executionSpeed', value: null })
    }
  },

  showSingleData({ state, commit }, payload) {
    const { fields } = state

    // Main Function
    const extract = Object.keys(fields)
    const extractedData = extract.map(key => ({ [key]: payload[key] }))
    const result = Object.assign({}, ...extractedData)

    for (const [key, value] of Object.entries(result)) {
      commit('setFieldValue', { key, value })
    }
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

  resetData({ commit, state, dispatch }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setFieldValue', { key: 'quality', value: 0 })
    commit('setFieldValue', { key: 'transaction', value: 0 })
    commit('setFieldValue', { key: 'executionSpeed', value: 0 })
    commit('setFieldValue', { key: 'saleOnCredit', value: false })
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
