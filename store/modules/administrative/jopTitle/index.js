export const state = () => ({
  apiModule: '/JobTitle',
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
    Name: null,
    OrganizationId: null,
    IsManager: false,
    IsAllDepartment: false,
    JobtitelClassification: null
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
    results.forEach((item, i) => (item.num = i + 1))
    await commit('setTableValue', { key: 'allData', value: results })
    commit('setTableValue', { key: 'totalItems', value: total })
  },

  getAllListsFromApi({ commit }, payload) {
    commit('setListsValue', {
      key: 'departmentList',
      value: payload.organizations
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

      if (!fields.Name) {
        return this.$toast.error('يجب إدخال الإسم')
      }

      if (!fields.OrganizationId) {
        return this.$toast.error('يجب إدخال الوحدة التنظيمية')
      }

      if (fields.JobtitelClassification === null) {
        return this.$toast.error('يجب إدخال تصنيف المسمى الوظيفي')
      }

      const schema = {
        Name: fields.Name,
        OrganizationId: fields.OrganizationId,
        IsManager: fields.IsManager,
        IsAllDepartment: fields.IsAllDepartment,
        JobtitelClassification: fields.JobtitelClassification
      }

      const { message } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }) {
    try {
      const { apiModule, fields, display } = state

      if (!fields.Name) {
        return this.$toast.error('يجب إدخال الإسم')
      }

      if (!fields.OrganizationId) {
        return this.$toast.error('يجب إدخال الوحدة التنظيمية')
      }

      if (fields.JobtitelClassification === null) {
        return this.$toast.error('يجب إدخال تصنيف المسمى الوظيفي')
      }

      const schema = {
        Name: fields.Name,
        OrganizationId: fields.OrganizationId,
        IsManager: fields.IsManager,
        IsAllDepartment: fields.IsAllDepartment,
        JobtitelClassification: fields.JobtitelClassification
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
