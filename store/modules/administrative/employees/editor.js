export const state = () => ({
  apiModule: '/employees/web',
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
    directManagerJobTitleList: [],
    jobTitlesList: [],
    createItemsListSearch: [],
    createItemsList: [],
    storekeepersList: [],
    employeesList: []
  },

  fields: {
    FirstName: null,
    fatherName: '',
    grandFatherName: '',
    lastName: '',
    phone: null,
    nationalNumber: null,
    birthDate: null,
    residence: null,
    DepartmentId: null,
    JobTitleId: null,
    JobNumber: null,
    directManagerJobTitleId: null,
    email: null,
    IsManager: false,
    image: null
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

    // commit('setListsValue', {
    //   key: 'jobTitlesList',
    //   value: payload.jobTitles
    // })

    commit('setFieldValue', {
      key: 'JobNumber',
      value: payload.jobNumber
    })
  },

  getAllListsFromApi({ commit, dispatch }, payload) {
    commit('setListsValue', {
      key: 'departmentList',
      value: payload.departments
    })

    // commit('setListsValue', {
    //   key: 'jobTitlesList',
    //   value: payload.jobTitles
    // })

    commit('setFieldValue', {
      key: 'JobNumber',
      value: payload.jobNumber
    })

    commit('setFieldValue', {
      key: 'FirstName',
      value: payload.firstName
    })

    commit('setFieldValue', {
      key: 'fatherName',
      value: payload.fatherName
    })

    commit('setFieldValue', {
      key: 'grandFatherName',
      value: payload.grandFatherName
    })

    commit('setFieldValue', {
      key: 'lastName',
      value: payload.lastName
    })

    commit('setFieldValue', {
      key: 'phone',
      value: payload.phone
    })

    commit('setFieldValue', {
      key: 'nationalNumber',
      value: payload.nationalNumber
    })

    commit('setFieldValue', {
      key: 'residence',
      value: payload.residence
    })

    commit('setFieldValue', {
      key: 'birthDate',
      value: payload.birthDate
    })

    commit('setFieldValue', {
      key: 'DepartmentId',
      value: payload.departmentId
    })
    dispatch('DepartmentIdChange')

    commit('setFieldValue', {
      key: 'JobTitleId',
      value: payload.jobTitleId
    })
    dispatch('JobTitleIdChange')

    commit('setFieldValue', {
      key: 'directManagerJobTitleId',
      value: payload.directManagerJobTitleId
    })

    commit('setFieldValue', {
      key: 'email',
      value: payload.personalEmail
    })

    commit('setFieldValue', {
      key: 'IsManager',
      value: payload.IsManager
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

  async JobTitleIdChange({ state, commit }, payload) {
    const { fields } = state
    if (!fields.JobTitleId) {
      return
    }

    const { data } = await this.$axios.$get(`JobTitle/${fields.JobTitleId}`)
    commit('setFieldValue', {
      key: 'IsManager',
      value: data.isManager
    })
  },

  async DepartmentIdChange({ state, commit }, payload) {
    const { fields } = state
    if (!fields.DepartmentId) {
      return
    }

    commit('setFieldValue', {
      key: 'JobTitleId',
      value: null
    })

    commit('setFieldValue', {
      key: 'directManagerJobTitleId',
      value: null
    })

    const { data } = await this.$axios.$get(
      `JobTitle/${fields.DepartmentId}/load`
    )
    commit('setListsValue', {
      key: 'jobTitlesList',
      value: data
    })

    const data2 = await this.$axios.$get(
      `JobTitle/${fields.DepartmentId}/LoadDirectManagerJobTitles`
    )
    commit('setListsValue', {
      key: 'directManagerJobTitleList',
      value: data2.data
    })
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModule, fields } = state

      if (!fields.FirstName) {
        return await this.$toast.error('يجب إدخال الاسم')
      }

      if (!fields.JobNumber) {
        return await this.$toast.error('يجب إدخال الرقم الوظيفي')
      }

      if (!fields.DepartmentId) {
        return await this.$toast.error('يجب اختيار الوحدة التنظيمية')
      }

      if (!fields.JobTitleId) {
        return await this.$toast.error('يجب اختيار الصفة الوظيفية')
      }

      const form = new FormData()

      form.append('FirstName', fields.FirstName)
      form.append(
        'fatherName',
        fields.fatherName === null || fields.fatherName === 'null'
          ? ''
          : fields.fatherName
      )
      form.append(
        'grandFatherName',
        fields.grandFatherName === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append(
        'lastName',
        fields.lastName === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append(
        'phone',
        fields.phone === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append(
        'nationalNumber',
        fields.nationalNumber === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append('birthDate', fields.birthDate)
      form.append(
        'residence',
        fields.residence === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append('DepartmentId', fields.DepartmentId)
      form.append('JobTitleId', fields.JobTitleId)
      form.append('JobNumber', fields.JobNumber)
      form.append('directManagerJobTitleId', fields.directManagerJobTitleId)
      form.append('JobNumber', fields.JobNumber)
      form.append(
        'email',
        fields.email === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append('IsManager', fields.IsManager)
      form.append('image', fields.image)

      const { message } = await this.$axios.$post(apiModule, form)
      await this.$toast.success(message)
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields } = state

      if (!fields.FirstName) {
        return await this.$toast.error('يجب إدخال الاسم')
      }

      if (!fields.JobNumber) {
        return await this.$toast.error('يجب إدخال الرقم الوظيفي')
      }

      if (!fields.DepartmentId) {
        return await this.$toast.error('يجب اختيار الوحدة التنظيمية')
      }

      if (!fields.JobTitleId) {
        return await this.$toast.error('يجب اختيار الصفة الوظيفية')
      }

      const form = new FormData()

      form.append('FirstName', fields.FirstName)
      form.append(
        'fatherName',
        fields.fatherName === null || fields.fatherName === 'null'
          ? ''
          : fields.fatherName
      )
      form.append(
        'grandFatherName',
        fields.grandFatherName === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append(
        'lastName',
        fields.lastName === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append(
        'phone',
        fields.phone === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append(
        'nationalNumber',
        fields.nationalNumber === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append('birthDate', fields.birthDate)
      form.append(
        'residence',
        fields.residence === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append('DepartmentId', fields.DepartmentId)
      form.append('JobTitleId', fields.JobTitleId)
      form.append('JobNumber', fields.JobNumber)
      form.append('directManagerJobTitleId', fields.directManagerJobTitleId)
      form.append('JobNumber', fields.JobNumber)
      form.append(
        'email',
        fields.email === null || fields.grandFatherName === 'null'
          ? ''
          : fields.grandFatherName
      )
      form.append('IsManager', fields.IsManager)
      form.append('image', fields.image)

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
