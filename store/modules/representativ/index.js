export const state = () => ({
  apiModule: '/UserManagement/GetRepresentatives',
  apiModuleCreate: '/UserManagement/CreateUser',
  apiModuleUpdate: 'UserManagement/UpdateUser',
  apiModuleUpdatePass: 'UserManagement/ResetPassword',
  apiModuleDelete: 'UserManagement/DeleteUser',

  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25,
    branchId: null,
    roles: null
  },
  lists: {
    categoriesList: [],
    branchList: []
  },

  fields: {
    id: null,
    firstName: null,
    address: null,
    userName: null,
    password: null,
    userNameChang: null,
    passwordChang: null,
    phoneNumber: null,
    branchId: null,
    ChangePass: false,
    confirmNewPassWord: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  async getAllDataFromApi({ commit, state }, payload) {
    try {
      const { fields } = state

      commit('setTableValue', {
        key: 'roles',
        value: localStorage.getItem('roles')
      })
      if (fields.roles !== 'Owner') {
        commit('setTableValue', {
          key: 'branchId',
          value: localStorage.getItem('branchId')
        })
      }
      payload.forEach((item, i) => (item.num = i + 1))
      await commit('setTableValue', {
        key: 'allData',
        value: payload
      })
      commit('setTableValue', { key: 'totalItems', value: payload.length })
    } catch (error) {}
  },

  getAllListsFromApiBranch({ commit }, payload) {
    commit('setListsValue', {
      key: 'branchList',
      value: payload.content
    })
  },

  async searchRepresentatives({ state, dispatch, commit }, payload) {
    const { table, fields } = state

    let b = null
    if (localStorage.getItem('roles') === 'Owner') {
      b = fields.branchId
    } else {
      b = table.branchId
    }

    commit('setTableValue', {
      key: 'allData',
      value: []
    })
    if (table.branchId) {
      const { content } = await this.$axios.$get(
        `UserManagement/GetRepresentativesByBranchId?BranchId=${b}`
      )

      dispatch('getAllDataFromApi', content)
    }
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModuleCreate, fields, table } = state

      const schema = {
        firstName: fields.firstName,
        lastName: '',
        address: fields.address,
        userName: fields.userName,
        password: fields.password,
        phoneNumber: fields.phoneNumber,
        userType: 2,
        branchId:
          localStorage.getItem('roles') === 'Owner'
            ? fields.branchId
            : table.branchId
      }

      if (!fields.firstName) {
        return await this.$toast.error('يجب إدخال اسم المندوب')
      }

      if (!fields.phoneNumber) {
        return await this.$toast.error('يجب إدخال رقم الهاتف')
      }

      if (!fields.address) {
        return await this.$toast.error('يجب إدخال العنوان ')
      }

      if (!fields.userName) {
        return await this.$toast.error('يجب إدخال اسم المستخدم ')
      }

      if (!fields.password) {
        return await this.$toast.error('يجب إدخال كلمة المرور ')
      }

      const content = await this.$axios.$post(apiModuleCreate, schema)
      if (content.content == null) {
        return this.$toast.error(content.messages[0])
      }

      await this.$toast.success('تمت عملية الإضافة بنجاح')
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }) {
    try {
      const { apiModuleUpdate, fields } = state

      const schema = {
        userId: fields.id,
        FristName: fields.firstName,
        lastName: '',
        address: fields.address,
        phoneNumber: fields.phoneNumber
      }

      const { content } = await this.$axios.$post(apiModuleUpdate, schema)
      await this.$toast.success(content)
      await dispatch('resetData')
    } catch (error) {}
  },

  async updatePass({ state, dispatch }) {
    try {
      const { apiModuleUpdatePass, fields } = state

      const schema = {
        userName: fields.userNameChang,
        newPassword: fields.passwordChang,
        ConfiramNewPassword: fields.confirmNewPassWord
      }

      const content = await this.$axios.$post(apiModuleUpdatePass, schema)
      if (content.content == null) {
        return this.$toast.error(content.messages[0])
      }

      await this.$toast.success('تمت عملية التعديل بنجاح')
      await dispatch('resetData')
    } catch (error) {}
  },

  editRow({ commit }, { item }) {
    commit('setFieldValue', {
      key: 'firstName',
      value: item.name
    })

    commit('setFieldValue', {
      key: 'address',
      value: item.address
    })

    commit('setFieldValue', {
      key: 'phoneNumber',
      value: item.phoneNumber
    })

    commit('setFieldValue', {
      key: 'userName',
      value: item.userName
    })

    commit('setFieldValue', {
      key: 'userNameChang',
      value: item.userName
    })

    commit('setFieldValue', {
      key: 'password',
      value: item.password
    })

    commit('setFieldValue', {
      key: 'id',
      value: item.userId
    })
  },

  async deleteFromDB({ state }, payload) {
    try {
      const { apiModuleDelete } = state

      const { content } = await this.$axios.$delete(
        `${apiModuleDelete}?id=${payload.item.userId}`
      )
      console.log(content)
    } catch (error) {}
  },

  resetData({ commit, state, dispatch }) {
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
