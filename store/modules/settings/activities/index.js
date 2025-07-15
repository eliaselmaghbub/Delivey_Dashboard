export const state = () => ({
  apiModule: '/activities',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    usersList: [],
    actionList: [
      { id: 'Create', name: 'إضافة' },
      { id: 'Update', name: 'تعديل' },
      { id: 'Delete', name: 'حذف' },
      { id: 'Confirm', name: 'اعتماد' },
      { id: 'Unconfirm', name: 'إلغاء الاعتماد' },
      { id: 'Close', name: 'إغلاق' },
      { id: 'Reopen', name: 'فتح' },
      { id: 'Other ', name: 'أخرى' }
    ],
    sortTypeList: [
      { id: 0, name: 'الأحدث' },
      { id: 1, name: 'الأقدم' }
    ],
    typeList: []
  },

  fields: {
    from: null,
    to: null,
    userId: null,
    action: null,
    sortType: 0,
    type: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  getAllDataFromApi({ commit }, { total, results }) {
    commit('setTableValue', { key: 'totalItems', value: total })
    commit('setTableValue', { key: 'allData', value: results })
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'usersList',
      value: payload.users
    })
    commit('setListsValue', {
      key: 'typeList',
      value: payload.types
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
