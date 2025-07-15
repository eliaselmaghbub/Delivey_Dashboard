export const state = () => ({
  apiModule: '/listOfDepartments',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    directManagerJobTitleList: [],
    mangagementList: [],
    departmentList: [],
    jobTitlesList: [],
    projectList: [],
    unitList: [],
    jobtitelClassificationList: [
      { id: 0, name: 'الموظف' },
      { id: 1, name: 'مدير إدارة' },
      { id: 2, name: 'رئيس قسم' },
      { id: 3, name: 'رئيس وحدة' },
      { id: 4, name: 'المدير العام' }
    ]
  },

  fields: {
    firstName: null,
    fatherName: null,
    grandFatherName: null,
    lastName: null,
    phone: null,
    nationalNumber: null,
    birthDate: null,
    residence: null,
    departmentId: null,
    jobTitleId: null,
    jobNumber: null,
    directManagerJobTitleId: null,
    email: null,
    IsManager: false,
    image: null,
    DigitalSignature: null,
    DeleteImage: false,
    nameSearch: null,
    nationalNumberSearch: null,
    jobNumberSearch: null,
    departmentIdSearch: null
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
    payload.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', { key: 'allData', value: payload })
    commit('setTableValue', { key: 'totalItems', value: payload.length })
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'departmentList',
      value: payload.departments
    })

    commit('setListsValue', {
      key: 'jobTitlesList',
      value: payload.jobTitles
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

  editRow({ commit }, { item }) {
    // console.warn('item :>> ', item)
    commit('setFieldValue', {
      key: 'Name',
      value: item.name
    })

    commit('setFieldValue', {
      key: 'OrganizationId',
      value: item.organizationId
    })

    commit('setFieldValue', {
      key: 'IsManager',
      value: item.isManager
    })

    commit('setFieldValue', {
      key: 'IsAllDepartment',
      value: item.isAllDepartment
    })

    commit('setFieldValue', {
      key: 'JobtitelClassification',
      value: item.jobtitelClassification
    })

    commit('setDisplayValue', {
      key: 'id',
      value: item.id
    })
  },

  async getDataByQuery({ state, dispatch }, payload) {
    const { apiModule, fields, table } = state

    const schema = {
      name: fields.nameSearch,
      nationalNumber: fields.nationalNumberSearch,
      jobNumber: fields.jobNumberSearch,
      departmentId: fields.departmentIdSearch
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
