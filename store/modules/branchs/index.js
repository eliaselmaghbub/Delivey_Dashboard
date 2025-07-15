export const state = () => ({
  apiModule: '/Branch/GetBranchs',
  apiModuleCreate: '/Branch/CreateBranch',
  apiModuleUpdate: 'Branch/UpdateBranch',
  apiModuleDelete: 'Branch/DeleteBranch',

  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    categoriesList: []
  },

  fields: {
    id: null,
    name: null,
    roles: null,
    isMajor: false
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
    payload.forEach((item, i) => {
      item.num = i + 1
    })
    await commit('setTableValue', { key: 'allData', value: payload })

    commit('setTableValue', { key: 'totalItems', value: payload.length })
    commit('setFieldValue', {
      key: 'roles',
      value: localStorage.getItem('roles')
    })
  },

  async addToDB({ state, dispatch }) {
    try {
      const { apiModuleCreate, fields } = state

      const schema = {
        name: fields.name,
        isMajor: fields.isMajor
      }

      if (!fields.name) {
        return await this.$toast.error('يجب إدخال الاسم')
      }

      const { content } = await this.$axios.$post(apiModuleCreate, schema)
      console.log(content)
      await this.$toast.success('تمت عملية الإضافة بنجاح')
      await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }) {
    try {
      const { apiModuleUpdate, fields } = state

      const schema = {
        id: fields.id,
        name: fields.name,
        isMajor: fields.isMajor
      }

      const { content } = await this.$axios.$post(apiModuleUpdate, schema)
      console.log(content)
      await this.$toast.success('تمت عملية التعديل بنجاح')
      await dispatch('resetData')
    } catch (error) {}
  },

  editRow({ commit }, { item }) {
    commit('setFieldValue', {
      key: 'name',
      value: item.branchName
    })

    commit('setFieldValue', {
      key: 'isMajor',
      value: item.isMajor
    })

    commit('setFieldValue', {
      key: 'id',
      value: item.branchId
    })
  },

  async deleteFromDB({ state }, payload) {
    try {
      const { apiModuleDelete } = state

      // if (fields.roles === 'Employee') {
      //   this.$toast.error('ليس لديك صلاحية')
      // }

      const { content } = await this.$axios.$delete(
        `${apiModuleDelete}?id=${payload.item.branchId}`
      )
      console.log(content)
    } catch (error) {}
  },

  resetData({ commit, state, dispatch }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit('setFieldValue', { key: field, value: null })
    })
    commit('setFieldValue', { key: 'isMajor', value: false })
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
