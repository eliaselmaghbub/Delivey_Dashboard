export const state = () => ({
  apiModule: '/City/GetCities',
  apiModuleCreate: '/City/CreateCity',
  apiModuleUpdate: 'City/UpdateCity',
  apiModuleDelete: 'City/DeleteCity',

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
    branchList: []
  },

  fields: {
    id: null,
    name: null,
    price: null,
    branchId: null,
    roles: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  async getAllDataFromApi({ commit, state }, payload) {
    try {
      const { fields } = state

      commit('setFieldValue', {
        key: 'roles',
        value: localStorage.getItem('roles')
      })

      if (fields.roles !== 'Owner') {
        commit('setFieldValue', {
          key: 'branchId',
          value: localStorage.getItem('branchId')
        })
      }
      payload[0].cities.forEach((item, i) => (item.num = i + 1))
      await commit('setTableValue', {
        key: 'allData',
        value: payload[0].cities
      })
      commit('setTableValue', { key: 'totalItems', value: payload.length })
    } catch (error) {
      if (payload.content == null) {
        return this.$toast.error(payload.messages[0])
      }
    }
  },

  getAllListsFromApiBranch({ commit }, payload) {
    commit('setListsValue', {
      key: 'branchList',
      value: payload.content
    })
  },

  async searchCity({ state, dispatch, commit }, payload) {
    const { fields } = state

    if (fields.branchId) {
      const { content } = await this.$axios.$get(
        `City/GetCitiesByBranchId?BranchId=${fields.branchId}`
      )

      dispatch('getAllDataFromApi', content)
    }
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModuleCreate, fields } = state

      const schema = {
        name: fields.name,
        price: fields.price,
        branchId: fields.branchId
      }

      if (!fields.name) {
        return await this.$toast.error('يجب إدخال الاسم')
      }

      if (!fields.name) {
        return await this.$toast.error('يجب إدخال السعر')
      }

      const content = await this.$axios.$post(apiModuleCreate, schema)
      if (content.content == null) {
        return this.$toast.error(content.messages[0])
      }

      await this.$toast.success('تمت عملية الإضافة بنجاح')
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }) {
    try {
      const { apiModuleUpdate, fields } = state

      const schema = {
        id: fields.id,
        name: fields.name,
        price: fields.price,
        branchId: fields.branchId
      }

      const content = await this.$axios.$post(apiModuleUpdate, schema)

      if (content.content == null) {
        return this.$toast.error(content.messages[0])
      }

      await this.$toast.success('تمت عملية التعديل بنجاح')
      await dispatch('resetData')
    } catch (error) {}
  },

  editRow({ commit }, { item }) {
    commit('setFieldValue', {
      key: 'name',
      value: item.name
    })

    commit('setFieldValue', {
      key: 'price',
      value: item.price
    })

    commit('setFieldValue', {
      key: 'id',
      value: item.cityId
    })
  },

  async deleteFromDB({ state }, payload) {
    try {
      const { apiModuleDelete } = state

      const { content } = await this.$axios.$delete(
        `${apiModuleDelete}?id=${payload.item.cityId}`
      )
      console.log(content)
    } catch (error) {}
  },

  resetData({ commit }) {
    commit('setFieldValue', { key: 'name', value: null })
    commit('setFieldValue', { key: 'branchId', value: null })
    commit('setFieldValue', { key: 'price', value: null })
    // Object.keys(state.fields).forEach((field, i) => {
    //   commit('setFieldValue', { key: field, value: null })
    // })
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
