const resetData = () => ({
  id: null,
  name: null,
  groupId: null,
  isActive: false,
  changePassword: true,
  loginName: null,
  password: null,
  confirmPassword: null,
  searchName: null,
  searchGroupId: null,
  isEdit: false
})

export const state = () => ({
  apiModule: '/users/filter',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    groupList: []
  },
  fields: {
    // البحث
    id: null,
    name: null,
    groupId: null,
    isActive: false,
    changePassword: true,
    loginName: null,
    password: null,
    confirmPassword: null,
    searchName: null,
    searchGroupId: null,
    isEdit: false
  },
  toggle: false
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  toggle: state => state.toggle
}

export const actions = {
  async resetData({ commit }) {
    await commit('resetData', resetData())
  },

  getAllDataFromApi({ commit }, { total, results }) {
    commit('setTableValue', { key: 'totalItems', value: total })
    commit('setTableValue', { key: 'allData', value: results })
  },

  getAllListsFromApi({ commit }, data) {
    commit('setListsValue', { key: 'groupList', value: data.groups })
  },

  showData({ commit }, { item }) {
    commit('setFieldValue', {
      key: 'name',
      value: item.name
    })
    commit('setFieldValue', {
      key: 'groupId',
      value: item.groupId
    })
    commit('setFieldValue', {
      key: 'isActive',
      value: item.isActive
    })
    commit('setFieldValue', {
      key: 'id',
      value: item.id
    })
    commit('setFieldValue', {
      key: 'loginName',
      value: item.loginName
    })
    commit('setFieldValue', {
      key: 'isEdit',
      value: true
    })
  },

  async addToDB({ state, dispatch, commit }, payload) {
    try {
      const isEdit = state.fields.isEdit
      const user = {
        name: state.fields.name,
        groupId: state.fields.groupId,
        isActive: state.fields.isActive,
        updateIdentity: state.fields.changePassword,
        identity: {
          name: state.fields.loginName,
          password: state.fields.password,
          confirmPassword: state.fields.confirmPassword
        }
      }

      if (isEdit) {
        const { message } = await this.$axios.$put(
          `/users/${state.fields.id}`,
          user
        )
        this.$toast.success(message)
        dispatch('getDataByQuery')
        await commit('resetData', resetData())
      } else {
        const { message } = await this.$axios.$post('/users', user)
        this.$toast.success(message)
        dispatch('getDataByQuery')
        await commit('resetData', resetData())
      }
    } catch (error) {}
  },

  async getDataByQuery({ state, dispatch }) {
    const params = {
      currentPage: state.table.page || 1,
      pageSize: state.table.perPage || 25,
      name: state.fields.searchName,
      groupId: state.fields.searchGroupId
    }
    const { data } = await this.$axios.$get(state.apiModule, {
      params
    })

    dispatch('getAllDataFromApi', data)
  },

  deleteFromDB({ state }, payload) {
    return this.$axios.$delete(`/users/${payload}`)
  }

  // showSingleData({ commit }, payload) {
  //   for (const [key, value] of Object.entries(payload)) {
  //     commit("setFieldValue", { key, value });
  //   }
  // },
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
  },
  toggle(state, { key, value }) {
    state[key] = value
  }
}
