const format = require('@/composables/format')

export const state = () => ({
  apiModule: '/stores',
  table: {
    totalItems: 0,
    allData: [],
    detailsTable: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    allData: [],
    createItemsListSearch: [],
    createItemsList: [],
    storekeepersList: [],
    employeesList: []
  },

  fields: {
    employeesId: null,
    name: null,
    address: null,
    mobile: null,
    phone: null,
    storekeepersSearch: null,
    storekeepers: [],
    isConsumer: false
  },
  display: {
    storekeepersStore: []
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

  getAllListsFromApiNew({ commit }, payload) {
    commit('setListsValue', { key: 'employeesList', value: payload.employees })
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', { key: 'createItemsList', value: payload })

    commit('setFieldValue', { key: 'mobile', value: payload.mobile })
    commit('setFieldValue', { key: 'name', value: payload.name })
    commit('setFieldValue', { key: 'phone', value: payload.phone })
    commit('setFieldValue', { key: 'address', value: payload.address })

    commit('setListsValue', {
      key: 'allData',
      value: payload.storekeepers
    })
    commit('setListsValue', { key: 'employeesList', value: payload.employees })
  },

  async storekeepersSearchSearch({ commit }, payload) {
    const { data } = await this.$axios.$get(
      `/employees/load?value=${payload || 'v'}`
    )

    commit('setListsValue', {
      key: 'createItemsListSearch',
      value: data
    })
  },

  storekeepersSearchChange({ commit }, payload) {
    // console.warn('payload :>> ', payload)

    commit('setFieldValue', { key: 'storekeepers', value: payload, push: true })
  },

  async addToDB({ state, dispatch, commit }) {
    try {
      const { apiModule, fields, lists } = state

      const schema = {
        ...fields
      }

      if (!fields.name) {
        return await this.$toast.warning('يجب ادخال اسم المخزن')
      }

      const storekeepersIds = lists.allData.map((item, i) => {
        return { storekeeperId: item.id }
      })

      // schema.createItems = storekeepersIds
      schema.createItems = storekeepersIds
      delete schema.storekeepers
      delete schema.storekeepersSearch

      const { message, data } = await this.$axios.$post(apiModule, schema)
      commit('setListsValue', {
        key: 'allData',
        value: data.storekeepers
      })
      await this.$toast.success(message)
      await this.$router.push(`/stores-settings/stores/${data.id}`)

      await dispatch('resetData')
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

    commit('setDisplayValue', {
      key: 'storekeepersStore',
      value: payload.storekeepers
    })
  },

  async updateInDB({ state, dispatch, commit }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const schema = {
        ...fields
      }

      if (!fields.name) {
        return await this.$toast.warning('يجب ادخال اسم المخزن')
      }

      const storekeepersIds = fields.storekeepers.map((item, i) => {
        return { storekeeperId: item.id || item }
      })

      const storekeepersStoreIdsFilter = storekeepersIds.map(
        x => x.storekeeperId
      )

      const storekeepersStoreIds = new Set(
        state.display.storekeepersStore.map(({ id }) => id)
      )

      const storekeepersIdsFiltered = []

      storekeepersStoreIds.forEach((id, i) => {
        if (!storekeepersStoreIdsFilter.includes(id)) {
          storekeepersIdsFiltered.push(id)
        }
      })

      // yes

      const create = lists.allData.filter(f => !f.storekeepeJobNumber)
      schema.createItems = create.map((item, i) => {
        return { storekeeperId: item.storekeeperId }
      })
      const edit = lists.allData.filter(
        f => f.storekeepeJobNumber && !f.isDeleted
      )

      schema.editItems = edit.map((item, i) => {
        return { storekeeperId: item.storekeeperId }
      })

      const deleted = lists.allData.filter(f => f.isDeleted)

      schema.deleteItems = deleted.map((item, i) => {
        return item.id
      })
      delete schema.storekeepers
      delete schema.storekeepersSearch

      const { message, data } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        schema
      )

      commit('setListsValue', {
        key: 'allData',
        value: data.storekeepers
      })

      await this.$toast.success(message)
    } catch (error) {}
  },

  deleteFromLocalTable({ state, commit }, payload) {
    const { lists } = state

    const allData = format.deepCopy(lists.allData)

    const findItem = allData
      .filter(x => !x.isDeleted)
      .find((f, i) => i === payload.index)

    console.log(findItem)
    if (findItem.id) {
      findItem.isDeleted = true
    } else {
      allData.splice(payload.index, 1)
    }

    commit('setListsValue', {
      key: 'allData',
      value: allData
    })
  },

  deleteFromDB({ state }, payload) {
    try {
      const { fields, lists } = state

      const item = lists.employeesList.find(
        item => item.id === fields.employeesId
      )
      console.log(item)
    } catch (error) {}
  },

  addToLocalTable({ commit, state, dispatch }, payload) {
    try {
      const { fields, lists } = state
      const allData = [...lists.allData]

      if (
        lists.allData.find(
          item => item.storekeeperId === fields.employeesId && !item.isDeleted
        )
      ) {
        return this.$toast.error('الموظف موجود')
      }

      const item = lists.employeesList.find(
        item => item.id === fields.employeesId
      )

      const itemSchema = {}

      itemSchema.storekeeperId = item.id
      itemSchema.storekeeperName = item.fullName

      allData.push(itemSchema)

      console.log(allData)
      commit('setListsValue', {
        key: 'allData',
        value: allData
      })

      // dispatch('emptyDetails')
    } catch (error) {}
  },

  resetData({ commit, state }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })

    commit('setFieldValue', { key: 'isConsumer', value: false })
    commit('setFieldValue', { key: 'storekeepers', value: [] })
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
  setListsValue(state, { key, value, push = false }) {
    if (push) {
      state.lists[key] = [...state.lists[key], ...value]
      return
    }
    state.lists[key] = value
  },
  setFieldValue(state, { key, value, push = false }) {
    if (push) {
      state.fields[key] = [...state.fields[key], value]
      return
    }

    state.fields[key] = value
  },
  setDisplayValue(state, { key, value }) {
    state.display[key] = value
  }
}
