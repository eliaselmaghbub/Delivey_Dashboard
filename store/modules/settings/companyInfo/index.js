const resetData = () => ({
  fullName: null,
  shortName: null,
  englishName: null,
  address: null,
  phone: null,
  email: null,
  web: null
})

export const state = () => ({
  apiModule: '/company-info',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    groupList: []
  },
  fields: {
    fullName: null,
    shortName: null,
    englishName: null,
    address: null,
    phone: null,
    email: null,
    web: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields
}

export const actions = {
  async resetData({ commit }) {
    await commit('resetData', resetData())
  },

  getAllDataFromApi({ commit }, { total, results }) {
    commit('setTableValue', { key: 'totalItems', value: total })
    commit('setTableValue', { key: 'allData', value: results })
  },

  getAllListsFromApi({ commit }, data) {
    commit('setListsValue', { key: 'groupList', value: data.groups })
  },

  showData({ commit }, payload) {
    commit('setFieldValue', {
      key: 'fullName',
      value: payload.fullName
    })
    commit('setFieldValue', {
      key: 'shortName',
      value: payload.shortName
    })
    commit('setFieldValue', {
      key: 'englishName',
      value: payload.englishName
    })
    commit('setFieldValue', {
      key: 'address',
      value: payload.address
    })
    commit('setFieldValue', {
      key: 'phone',
      value: payload.phone
    })
    commit('setFieldValue', {
      key: 'email',
      value: payload.email
    })
    commit('setFieldValue', {
      key: 'web',
      value: payload.web
    })
  },

  async saveToDB({ state }) {
    try {
      const formData = new FormData()

      for (const [key, value] of Object.entries(state.fields)) {
        formData.append(key, value)
      }

      const { message } = await this.$axios.$put(
        `${state.apiModule}/web`,
        formData
      )
      this.$toast.success(message)
    } catch (error) {}
  },

  handleFormData(context, payload) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(payload)) {
      if (Array.isArray(value)) {
        if (value.every(item => item instanceof File)) {
          value.forEach((val, i) => {
            formData.append(key, val)
          })
        } else if (value.every(item => typeof item === 'object')) {
          value.forEach((row, i) => {
            for (const [innerKey, innerValue] of Object.entries(row)) {
              if (Array.isArray(innerValue)) {
                innerValue.forEach((obj, x) => {
                  for (const [deeperKey, deeperValue] of Object.entries(obj)) {
                    formData.append(
                      `${key}[${i}][${innerKey}][${x}][${deeperKey}]`,
                      deeperValue
                    )
                    // console.warn('deeperValue', deeperValue)
                  }
                })
              } else {
                formData.append(`${key}[${i}][${innerKey}]`, innerValue)
              }
              // console.warn('innerValue', innerValue)
            }
          })
        } else {
          // console.warn('444')

          value.forEach((val, i) => {
            formData.append(key, val)
          })
        }
      } else {
        // console.warn('5555')

        formData.append(key, value)
      }
    }
    return formData
  }
}

export const mutations = {
  resetData(state, val) {
    state.fields = val
  },
  setTableValue(state, { key, value }) {
    state.table[key] = value
  },
  setListsValue(state, { key, value }) {
    state.lists[key] = value
  },
  setFieldValue(state, { key, value }) {
    state.fields[key] = value
  }
}
