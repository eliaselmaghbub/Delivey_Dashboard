export const state = () => ({
  apiModule: '/categories',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    categoriesList: []
  },

  fields: {
    name: null,
    number: null,
    code: null,
    parentId: null
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
    payload.forEach((item, i) => {
      item.num = i + 1
      if (item.level === 1) {
        item.name1 = item.name
      } else if (item.level === 2) {
        item.name2 = item.name
      } else {
        item.name3 = item.name
      }
    })
    await commit('setTableValue', { key: 'allData', value: payload })
    await commit('setListsValue', { key: 'categoriesList', value: payload })
    commit('setTableValue', { key: 'totalItems', value: payload.length })
  },

  async getFirstLevelNumber({ commit }, payload) {
    const { data } = await this.$axios.$get('/categories/getFirstLevelNumber')

    commit('setFieldValue', {
      key: 'number',
      value: data.number
    })
    commit('setFieldValue', {
      key: 'code',
      value: data.code
    })
  },
  getAllListsFromApi({ commit }, payload) {},

  async parentIdChange({ state, commit, dispatch }, payload) {
    const { apiModule, fields } = state

    if (!fields.parentId) {
      commit('setFieldValue', {
        key: 'number',
        value: null
      })
      commit('setFieldValue', {
        key: 'code',
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

    commit('setFieldValue', {
      key: 'code',
      value: data.code
    })
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields } = state

      const schema = {
        name: fields.name,
        number: fields.number,
        code: fields.code,
        parentId: fields.parentId
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
        number: fields.number,
        code: fields.code,
        parentId: fields.parentId
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
      key: 'number',
      value: item.number
    })
    commit('setFieldValue', {
      key: 'code',
      value: item.code
    })
    commit('setFieldValue', {
      key: 'parentId',
      value: item.parentId
    })

    commit('setDisplayValue', {
      key: 'id',
      value: item.id
    })
  },

  deleteFromDB({ state }, payload) {
    try {
      return this.$axios.$delete(`${state.apiModule}/${payload}`)
    } catch (error) {}
  },

  async resetData({ commit, state, dispatch }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setDisplayValue', { key: 'id', value: null })
    await dispatch('getFirstLevelNumber')
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
