export const state = () => ({
  apiModule: '/Order/ShearchOrder?OrderState=2',
  apiModuleCreate: '/Order/InsertRepresentativeInOrder',

  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    cityList: [],
    RepresentativesList: [],
    StateList: [
      { id: 1, name: 'انتظار' },
      { id: 2, name: 'في المخزن' },
      { id: 3, name: 'عند المندوب' },
      { id: 4, name: 'تم التسليم' },
      { id: 5, name: 'جاري الارجاع' },
      { id: 6, name: 'راجع في المخزن' }
    ]
  },

  fields: {
    cityId: null,
    representativeId: null,
    StateId: 2
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
    try {
      payload.content.forEach((item, i) => {
        item.num = i + 1
      })
      await commit('setTableValue', { key: 'allData', value: payload.content })

      commit('setTableValue', {
        key: 'totalItems',
        value: payload.content.length
      })
    } catch (error) {
      if (payload.content == null) {
        return this.$toast.error(payload.messages[0])
      }
    }
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'cityList',
      value: payload.content[0].cities
    })
  },

  getAllListsFromApiUser({ commit }, payload) {
    commit('setListsValue', {
      key: 'RepresentativesList',
      value: payload.content
    })
  },

  async search({ state, dispatch, commit }) {
    try {
      const { fields } = state

      const content = await this.$axios.$get(
        `Order/ShearchOrder?CityId=${fields.cityId}`
      )

      dispatch('getAllDataFromApi', content)
    } catch (error) {}
  },

  async editRow({ state, commit, dispatch }, payload) {
    try {
      const { apiModuleCreate, fields } = state

      if (!fields.representativeId) {
        return await this.$toast.error('الرجاء اختيار المندوب ')
      }

      commit('setFieldValue', {
        key: 'orderNo',
        value: payload.item.orderNo
      })

      const schema = {
        orderNo: fields.orderNo,
        representativeId: fields.representativeId
      }

      const { content } = await this.$axios.$post(apiModuleCreate, schema)
      await this.$toast.success(content)

      const content2 = await this.$axios.$get(
        '/Order/ShearchOrder?OrderState=2'
      )

      commit('setTableValue', { key: 'allData', value: [] })

      content2.content.forEach((item, i) => {
        item.num = i + 1
      })
      await commit('setTableValue', {
        key: 'allData',
        value: content2.content
      })

      commit('setTableValue', {
        key: 'totalItems',
        value: content2.content.length
      })
    } catch (error) {}
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

  resetData({ commit, state }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })
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
