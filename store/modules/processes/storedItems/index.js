export const state = () => ({
  // apiModule: '/api/stored-items',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    itemsList: [],
    storesList: [],
    categoriesList: []
  },

  fields: {
    Barcode: null,
    ItemId: null,
    CategoryId: null,
    StoreId: null,
    DateFrom: null,
    DateTo: null,
    ExpireDateFrom: null,
    ExpireDateTo: null,
    MinQuantity: null,
    MaxQuantity: null,
    IsExpire: false,

    Name: null,
    OrganizationId: null,

    IsAllDepartment: false,
    JobtitelClassification: null
  },
  display: {
    id: null
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
    payload.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', { key: 'allData', value: payload })
    commit('setTableValue', { key: 'totalItems', value: payload.length })
  },

  async getAllDataVFromApi({ commit }, payload) {
    payload.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', { key: 'allData', value: payload })
    // commit('setTableValue', { key: 'totalItems', value: total })
  },
  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'itemsList',
      value: payload.items
    })

    commit('setListsValue', {
      key: 'storesList',
      value: payload.stores
    })

    commit('setListsValue', {
      key: 'categoriesList',
      value: payload.categories
    })
  },

  async getDataByQuery({ state, dispatch }, payload) {
    const { fields, table } = state

    const schema = {
      Barcode: fields.Barcode,
      ItemId: fields.ItemId,
      CategoryId: fields.CategoryId,
      StoreId: fields.StoreId,
      DateFrom: fields.DateFrom,
      DateTo: fields.DateTo,
      MinQuantity: fields.MinQuantity,
      MaxQuantity: fields.MaxQuantity,
      ExpireDateFrom: fields.ExpireDateFrom,
      ExpireDateTo: fields.ExpireDateTo
    }

    const params = {
      currentPage: table.page || 1,
      pageSize: table.perPage || 25,
      ...schema
    }
    const { data } = await this.$axios.$get('/stored-items/getByItem', {
      params
    })

    dispatch('getAllDataFromApi', data)
  },

  // deleteFromDB({ state }, payload) {
  //   try {
  //     return this.$axios.$delete(`${state.apiModule}/${payload}`)
  //   } catch (error) {}
  // },

  resetData({ commit, state }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setFieldValue', { key: 'Barcode', value: null })
    commit('setFieldValue', { key: 'ItemId', value: null })
    commit('setFieldValue', { key: 'CategoryId', value: null })
    commit('setFieldValue', { key: 'StoreId', value: null })
    commit('setFieldValue', { key: 'DateFrom', value: null })
    commit('setFieldValue', { key: 'DateTo', value: null })
    commit('setFieldValue', { key: 'MinQuantity', value: null })
    commit('setFieldValue', { key: 'MaxQuantity', value: null })
    commit('setFieldValue', { key: 'ExpireDateFrom', value: null })
    commit('setFieldValue', { key: 'ExpireDateTo', value: null })
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
