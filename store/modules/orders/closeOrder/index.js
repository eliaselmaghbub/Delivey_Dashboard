export const state = () => ({
  apiModule: '/Order/ShearchOrder',
  apiModuleCreate: '/Order/RollBackOrder',

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
      // { id: 1, name: 'انتظار' },
      // { id: 2, name: 'في المخزن' },
      // { id: 3, name: 'عند المندوب' },
      { id: 4, name: 'تم التسليم' },
      // { id: 5, name: 'جاري الارجاع' },
      { id: 6, name: 'راجع في المخزن' }
    ]
  },

  fields: {
    cityId: null,
    representativeId: null,
    StateId: 4
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

        if (item.orderState === 2) {
          item.orderStateName = 'في المخزن'
        }

        if (item.orderState === 3) {
          item.orderStateName = 'عند المندوب'
        }

        if (item.orderState === 4) {
          item.orderStateName = 'تم التسليم'
        }

        if (item.orderState === 5) {
          item.orderStateName = 'جاري الإرجاع'
        }

        if (item.orderState === 6) {
          item.orderStateName = 'راجع في المخزن'
        }

        if (item.orderState === 7) {
          item.orderStateName = 'تم التسليم - تم الإغلاق'
        }

        if (item.orderState === 8) {
          item.orderStateName = 'راجع  - تم الإغلاق'
        }
      })

      if (localStorage.getItem('roles') === 'Owner') {
        payload.content = payload.content.filter(item => item.orderState !== 1)
      } else {
        payload.content = payload.content.filter(
          item =>
            item.orderState !== 1 &&
            item.branchName === localStorage.getItem('branchName')
        )
      }

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

  getAllListsFromApiUser({ commit }, payload) {
    commit('setListsValue', {
      key: 'RepresentativesList',
      value: payload.content
    })
  },

  async search({ state, dispatch, commit }) {
    try {
      const { fields } = state

      if (fields.representativeId && fields.StateId) {
        const content = await this.$axios.$get(
          `Order/ShearchOrder?RepresentativeId=${fields.representativeId}&OrderState=${fields.StateId}`
        )
        dispatch('getAllDataFromApi', content)
      } else if (fields.representativeId) {
        const content = await this.$axios.$get(
          `Order/ShearchOrder?RepresentativeId=${fields.representativeId}`
        )
        dispatch('getAllDataFromApi', content)
      } else if (fields.StateId) {
        const content = await this.$axios.$get(
          `Order/ShearchOrder?OrderState=${fields.StateId}`
        )
        dispatch('getAllDataFromApi', content)
      } else {
        const content = await this.$axios.$get('/Order/ShearchOrder')

        dispatch('getAllDataFromApi', content)
      }
    } catch (error) {}
  },

  async searchCode({ state, dispatch }, payload) {
    const { fields } = state

    if (fields.OrderNo) {
      const data = await this.$axios.$get(
        `Order/GetOrderByOrderNo?OrderNo=${fields.OrderNo}`
      )

      dispatch('getAllDataFromApi', data)
    } else {
      const content = await this.$axios.$get('/Order/ShearchOrder')

      dispatch('getAllDataFromApi', content)
    }
  },

  async editRow({ state, commit, dispatch }, payload) {
    try {
      const { apiModuleCreate, fields } = state

      commit('setFieldValue', {
        key: 'orderNo',
        value: payload.item.orderNo
      })

      if (payload.item.orderState === 7 || payload.item.orderState === 8) {
        return await this.$toast.error('هذا الطلب مغلق مسبقا')
      }

      if (
        payload.item.orderState === 1 ||
        payload.item.orderState === 2 ||
        payload.item.orderState === 3 ||
        payload.item.orderState === 5
      ) {
        return await this.$toast.error('لايمكن اغلاق طلبية تحت الإجراء')
      }

      const schema = {
        orderNo: fields.orderNo
      }

      const { content } = await this.$axios.$post(apiModuleCreate, schema)
      await this.$toast.success(content)

      const content2 = await this.$axios.$get('/Order/ShearchOrder')

      commit('setTableValue', { key: 'allData', value: [] })

      content2.content.forEach((item, i) => {
        item.num = i + 1
        if (item.orderState === 2) {
          item.orderStateName = 'في المخزن'
        }

        if (item.orderState === 3) {
          item.orderStateName = 'عند المندوب'
        }

        if (item.orderState === 4) {
          item.orderStateName = 'تم التسليم'
        }

        if (item.orderState === 5) {
          item.orderStateName = 'جاري الإرجاع'
        }

        if (item.orderState === 6) {
          item.orderStateName = 'راجع في المخزن'
        }

        if (item.orderState === 7) {
          item.orderStateName = 'تم التسليم - تم الإغلاق'
        }

        if (item.orderState === 8) {
          item.orderStateName = 'راجع  - تم الإغلاق'
        }
      })

      if (localStorage.getItem('roles') === 'Owner') {
        payload.content = payload.content.filter(item => item.orderState !== 1)
      } else {
        payload.content = payload.content.filter(
          item =>
            item.orderState !== 1 &&
            item.branchName === localStorage.getItem('branchName')
        )
      }
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
