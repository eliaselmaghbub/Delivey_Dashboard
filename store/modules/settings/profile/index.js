// const resetData = () => ({
//   number: null
// })

export const state = () => ({
  apiModule: '/profile',

  fields: {
    userName: null,
    loginName: null,
    oldPassword: null,
    newPassword: null,
    confirmPassword: null
  }
})

export const getters = {
  fields: state => state.fields
}

export const actions = {
  setData({ commit }, payload) {
    commit('setFieldValue', {
      key: 'userName',
      value: payload.name
    })
    commit('setFieldValue', {
      key: 'loginName',
      value: payload.loginName
    })
  },

  async saveData({ state }) {
    const schema = {
      name: state.fields.userName,
      updateIdentity: true,
      identity: {
        name: state.fields.loginName,
        oldPassword: state.fields.oldPassword,
        newPassword: state.fields.newPassword,
        confirmPassword: state.fields.confirmPassword,
        key: 'string'
      },
      culture: 'string'
    }
    await this.$axios.$put(`${state.apiModule}`, schema)
  }
}

export const mutations = {
  resetData(state, val) {
    state.fields = val
  },
  setFieldValue(state, { key, value }) {
    state.fields[key] = value
  }
}
