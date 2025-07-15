export const state = () => ({
  apiModule: '/departments',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    mangagementList: [],
    departmentList: [],
    projectList: [],
    unitList: []
  },

  fields: {
    code: null,
    name: null,
    parentId: null,
    number: null,
    managementId: null,
    parentIdSearch: null,
    unitId: null,
    nameSearch: null,
    numberSearch: null
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
  async getAllDataFromApi({ commit }, { total, results }) {
    results.forEach((item, i) => {
      item.num = i + 1
      if (item.level === 1 || item.level === 2) {
        item.name1 = item.name
      } else if (item.level === 3) {
        item.name3 = item.name
      } else {
        item.name4 = item.name
      }
    })
    await commit('setTableValue', { key: 'allData', value: results })
    commit('setTableValue', { key: 'totalItems', value: total })
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'mangagementList',
      value: payload.mangagement
    })
    commit('setListsValue', {
      key: 'departmentList',
      value: payload.department
    })
  },

  async parentIdChange({ state, commit, dispatch }, payload) {
    const { apiModule, fields } = state

    if (!fields.parentId) {
      commit('setFieldValue', {
        key: 'number',
        value: null
      })
      return
    }

    const { data } = await this.$axios.$get(
      `${apiModule}/${fields.parentId}/preloadAsChild`
    )

    commit('setFieldValue', {
      key: 'number',
      value: data.number
    })
  },

  async managementIdChange({ state, commit, dispatch }, payload) {
    const { apiModule, fields } = state

    if (!fields.managementId) {
      return
    }

    const { data } = await this.$axios.$get(
      `${apiModule}/${fields.managementId}/load`
    )

    commit('setListsValue', {
      key: 'projectList',
      value: data
    })
  },
  async parentIdSearchChange({ state, commit, dispatch }, payload) {
    const { apiModule, fields } = state

    if (!fields.parentIdSearch) {
      return
    }

    const { data } = await this.$axios.$get(
      `${apiModule}/${fields.parentIdSearch}/loadUnits`
    )

    commit('setListsValue', {
      key: 'unitList',
      value: data
    })
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields } = state

      const schema = {
        name: fields.name,
        parentId: fields.parentId,
        number: fields.number
      }

      const { message } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }) {
    try {
      const { apiModule, fields, display } = state

      const schema = {
        name: fields.name,
        parentId: fields.parentId,
        number: fields.number,
        code: fields.code
      }

      const { message } = await this.$axios.$put(
        `${apiModule}/${display.id}`,
        schema
      )
      await this.$toast.success(message)
      await dispatch('resetData')
    } catch (error) {}
  },

  editRow({ commit }, { item }) {
    // console.warn('item :>> ', item)
    commit('setFieldValue', {
      key: 'name',
      value: item.name
    })

    commit('setFieldValue', {
      key: 'parentId',
      value: item.parentId
    })

    commit('setFieldValue', {
      key: 'number',
      value: item.number
    })

    commit('setDisplayValue', {
      key: 'id',
      value: item.id
    })

    commit('setFieldValue', {
      key: 'code',
      value: item.code
    })
  },

  async getDataByQuery({ state, dispatch }, payload) {
    const { apiModule, fields, table } = state

    const schema = {
      name: fields.nameSearch,
      number: fields.numberSearch,
      managementId: fields.managementId,
      parentId: fields.parentIdSearch,
      unitId: fields.unitId
    }

    const params = {
      currentPage: table.page || 1,
      pageSize: table.perPage || 25,
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
