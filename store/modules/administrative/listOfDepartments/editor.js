const format = require('@/composables/format')

export const state = () => ({
  apiModule: '/listOfDepartments',
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
    departmentList: [],
    employeesList: []
  },

  fields: {
    DepartmentId: null,
    employeesId: null
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
  async getAllDataFromApi({ commit }, { total, results }) {
    results.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', { key: 'allData', value: results })
    commit('setTableValue', { key: 'totalItems', value: total })
  },

  getAllListsFromApiNew({ commit }, payload) {
    commit('setListsValue', {
      key: 'departmentList',
      value: payload.departments
    })
  },

  getAllListsFromApi({ commit, dispatch }, payload) {
    commit('setListsValue', {
      key: 'departmentList',
      value: payload.departments
    })
    commit('setFieldValue', {
      key: 'DepartmentId',
      value: payload.listOfDepartments.departmentId
    })

    dispatch('DepartmentIdChange')

    commit('setListsValue', {
      key: 'allData',
      value: payload.listOfDepartments.listOfEmployees
    })
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

  async DepartmentIdChange({ state, commit }, payload) {
    const { fields } = state
    if (!fields.DepartmentId) {
      return
    }

    const { data } = await this.$axios.$get(
      `/employees/load?department=${fields.DepartmentId}`
    )

    console.log(data)
    commit('setListsValue', {
      key: 'employeesList',
      value: data
    })
  },

  addToLocalTable({ commit, state, dispatch }, payload) {
    try {
      const { lists, fields } = state
      const allData = [...lists.allData]

      if (
        lists.allData.find(
          item => item.EmployeeId === fields.employeesId && !item.isDeleted
        )
      ) {
        return this.$toast.error('الموظف موجود')
      }

      const item = lists.employeesList.find(
        item => item.id === fields.employeesId
      )

      const itemSchema = {}

      itemSchema.employeeId = item.id
      itemSchema.employeeName = item.fullName

      allData.push(itemSchema)

      commit('setListsValue', {
        key: 'allData',
        value: allData
      })

      // dispatch('emptyDetails')
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

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields, lists } = state

      const schema = {
        ...fields
      }

      schema.ListEmployees = lists.allData

      const { message } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields } = state

      const form = new FormData()

      form.append('FirstName', fields.FirstName)
      form.append('fatherName', fields.fatherName)
      form.append('grandFatherName', fields.grandFatherName)
      form.append('lastName', fields.lastName)
      form.append('phone', fields.phone)
      form.append('nationalNumber', fields.nationalNumber)
      form.append('birthDate', fields.birthDate)
      form.append('residence', fields.residence)
      form.append('DepartmentId', fields.DepartmentId)
      form.append('JobTitleId', fields.JobTitleId)
      form.append('JobNumber', fields.JobNumber)
      form.append('directManagerJobTitleId', fields.directManagerJobTitleId)
      form.append('JobNumber', fields.JobNumber)
      form.append('email', fields.email)
      form.append('IsManager', fields.IsManager)
      form.append('image', fields.image)
      form.append('JobNumber', fields.JobNumber)

      const { message } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        form
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
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
