export const state = () => ({
  // apiModule: '/Order/ShearchOrde?OrderState=1',
  // apiModuleCreate: '/Order/AcceptanceOrder',
  // apiModuleDelete: 'Order/DeleteOrder',

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
    activateState: [
      { id: 1, name: 'نشط' },
      { id: 2, name: 'غير نشط' }
    ]
  },

  fields: {
    activateStateId: null,
    name: null,
    userId: null
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

  async addToDB({ state, dispatch }) {
    try {
      const { fields } = state

      const schema = {
        userId: fields.userId,
        state: fields.activateStateId
      }

      const content = await this.$axios.$post(
        'UserManagement/ChangeUserActivation',
        schema
      )
      if (content.content == null) {
        return this.$toast.error(content.messages[0])
      }

      await this.$toast.success(content.content)
      await dispatch('resetData')
    } catch (error) {}
  },

  editRow({ commit }, payload) {
    try {
      commit('setFieldValue', {
        key: 'activateStateId',
        value: payload.item.activateState
      })

      commit('setFieldValue', {
        key: 'name',
        value: payload.item.name
      })

      commit('setFieldValue', {
        key: 'userId',
        value: payload.item.userId
      })
    } catch (error) {}
  },

  async deleteFromDB({ state }, payload) {
    try {
      const { apiModuleDelete } = state

      const content = await this.$axios.$delete(
        `${apiModuleDelete}?Id=${payload.item.orderId}`
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
