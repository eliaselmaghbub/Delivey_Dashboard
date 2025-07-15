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
    subCategoriesList: [],
    analyticalCategoryList: [],
    unitsList: []
  },

  fields: {
    barcode: null,
    name: null,
    categoryId: null,
    subCategoryId: null,
    analyticalCategoryId: null,
    number: null,
    singleUnitsId: null,
    groupUnitsId: null,
    quantityInGroup: null,
    minimumQuantity: null,
    maximumQuantity: null,
    orderQuantity: null,
    features: null,
    isActive: true,
    haveExpireDate: false
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
    await commit('setListsValue', {
      key: 'unitsList',
      value: payload.units
    })

    if (payload.subCategory) {
      commit('setListsValue', {
        key: 'subCategoriesList',
        value: payload.subCategory
      })
    }

    if (payload.analyticalCategor) {
      commit('setListsValue', {
        key: 'analyticalCategoryList',
        value: payload.analyticalCategor
      })
    }
  },

  async generateBarcode({ commit }) {
    const { data } = await this.$axios.$get('/items/generateBarcode')

    commit('setFieldValue', { key: 'barcode', value: data.barcode })
  },

  async getNumber({ commit }, payload) {
    const { data } = await this.$axios.$get(`/items/${payload}/preloadAsChild`)

    commit('setFieldValue', { key: 'number', value: data.number })
  },

  async loadCategory({ commit }, payload) {
    const { data } = await this.$axios.$get(`/items/${payload}/loadcategory`)

    return data
  },

  groupUnitsIdChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (!fields.groupUnitsId) {
      commit('setFieldValue', { key: 'quantityInGroup', value: null })
    } else if (fields.groupUnitsId === fields.singleUnitsId) {
      this.$toast.error('وحدة الفرد لايمكن ان تساوي وحدة المجموعة')
      commit('setFieldValue', { key: 'groupUnitsId', value: null })
    }
  },

  async categoryIdChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (!fields.categoryId) {
      commit('setFieldValue', { key: 'subCategoryId', value: null })
      commit('setFieldValue', { key: 'number', value: null })
    }

    if (fields.categoryId) {
      const category = await dispatch('loadCategory', fields.categoryId)

      // console.warn('category :>> ', category)

      commit('setListsValue', {
        key: 'subCategoriesList',
        value: category || []
      })

      commit('setFieldValue', { key: 'subCategoryId', value: null })
      commit('setFieldValue', { key: 'analyticalCategoryId', value: null })

      await dispatch('getNumber', fields.categoryId)
    }
  },

  async subCategoryIdChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (fields.subCategoryId) {
      const subCategory = await dispatch('loadCategory', fields.subCategoryId)

      commit('setListsValue', {
        key: 'analyticalCategoryList',
        value: subCategory || []
      })

      commit('setFieldValue', { key: 'analyticalCategoryId', value: null })

      await dispatch('getNumber', fields.subCategoryId)
    }
  },

  async analyticalCategoryIdChange({ commit, state, dispatch }, payload) {
    const { fields } = state

    if (fields.analyticalCategoryId) {
      await dispatch('getNumber', fields.analyticalCategoryId)
    }
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields } = state

      const schema = {
        ...fields
      }

      const { message, data } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)

      await this.$router.push(`/stores-settings/items/${data.id}`)

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

  showSingleData({ state, commit }, payload) {
    const { fields } = state

    // Main Function
    const extract = Object.keys(fields)
    const extractedData = extract.map(key => ({ [key]: payload[key] }))
    const result = Object.assign({}, ...extractedData)

    for (const [key, value] of Object.entries(result)) {
      commit('setFieldValue', { key, value })
    }

    commit('setFieldValue', {
      key: 'subCategoryId',
      value: payload.secondCategoriesId
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

  resetData({ commit, state, dispatch }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setFieldValue', { key: 'isActive', value: true })
    commit('setFieldValue', { key: 'haveExpireDate', value: false })
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
