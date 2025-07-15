const format = require('@/composables/format')

/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
export const state = () => ({
  apiModule: 'directReleaseOrderReturn',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    CreateDetails: [],
    ReleaseItemStatusList: [
      { name: 'مستعمل', id: 1 },
      { name: 'جديد', id: 2 }
    ],
    isConfirmedList: [
      { name: 'معتمد', id: true },
      { name: 'غير معتمد', id: false }
    ],
    departmentsList: [],
    stordItemList: [],
    allData: [],
    stordItemId: [],
    directReleaseOrder: [],

    detailsTable: [],
    deleteDetails: [],
    supplierList: [],
    storeList: [],
    employees: [],

    committees: [],
    categoriesList: [],
    itemsList: [],
    constItemsList: []
  },

  fields: {
    RNumber: null,
    Year: null,
    storeName: null,
    number: null,
    departmentId: null,
    employeeFullName: null,
    directReleaseOrderItemId: null,
    quantity: null,
    cost: null,
    note: null,
    noteDetails: null,
    releaseItemStatus: null,
    date: null,
    edit: false,

    categoryId: null,
    itemId: null,
    quantityInStock: 0,
    singleUnitsQuantity: 0,
    groupUnitsQuantity: 0,
    total: 0,
    expireDate: null,
    singleUnitsCost: 0,
    groupUnitsCost: 0
  },
  display: {
    selectItem: null,
    index: null
  }
})

export const getters = {
  table: state => state.table,
  lists: state => state.lists,
  fields: state => state.fields,
  display: state => state.display
}

export const actions = {
  getAllListsFromApiNew({ commit, dispatch }, payload) {
    commit('setFieldValue', {
      key: 'number',
      value: payload.number
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })
  },
  getAllListsFromApi({ commit, dispatch }, payload) {
    commit('setListsValue', {
      key: 'allData',
      value: payload.items
    })

    commit('setListsValue', {
      key: 'departmentsList',
      value: payload.departments
    })

    commit('setListsValue', {
      key: 'stordItemList',
      value: payload.directReleaseOrderItem
    })

    // commit('setFieldValue', {
    //   key: 'Year',
    //   value: '2024'
    // })

    // commit('setFieldValue', {
    //   key: 'RNumber',
    //   value: payload.directReleaseOrder.number
    // })

    // dispatch('RNumberChange')

    commit('setFieldValue', {
      key: 'departmentId',
      value: payload.departmentId
    })

    commit('setFieldValue', {
      key: 'note',
      value: payload.note
    })

    commit('setFieldValue', {
      key: 'number',
      value: payload.number
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })
  },

  async RNumberChange({ commit, state, dispatch }, payload) {
    const { lists, fields, table } = state

    if (fields.RNumber && fields.Year) {
      const { data } = await this.$axios.$get(
        `/directReleaseOrderReturn/load?RNumber=${fields.RNumber}&Year=${fields.Year}`
      )

      commit('setListsValue', {
        key: 'directReleaseOrder',
        value: data.directReleaseOrder
      })

      commit('setListsValue', {
        key: 'departmentsList',
        value: data.departments
      })

      commit('setFieldValue', {
        key: 'departmentId',
        value: data.directReleaseOrder.departmentId
      })

      commit('setFieldValue', {
        key: 'storeName',
        value: data.directReleaseOrder.storeName
      })

      commit('setListsValue', {
        key: 'stordItemList',
        value: data.directReleaseOrder.detalils
      })
    } else if (!fields.Year && fields.RNumber) {
      commit('setFieldValue', { key: 'RNumber', value: null })

      this.$toast.error('الرجاء ادخال السنة اولا')
    }
  },

  async storeIdChange({ commit, state, dispatch }, payload) {
    const { lists, fields } = state

    const { data } = await this.$axios.$get(
      `/stored-items/getItemByCostAndExpireDateAndStore/${fields.storeId}`
    )

    commit('setTableValue', { key: 'allData', value: data.storedItems })
  },

  itemIdChange({ commit, state, dispatch }, payload) {
    dispatch('resetData', true)
    const { lists, fields } = state

    if (!fields.itemId) {
      return
    }

    const item = lists.stordItemList.find(item => item.id === fields.itemId)

    commit('setDisplayValue', {
      key: 'selectItem',
      value: item || null
    })
  },

  singleUnitsQuantityChange({ dispatch }, payload) {
    dispatch('calcTotal')
  },

  groupUnitsQuantityChange({ dispatch }, payload) {
    dispatch('calcTotal')
  },

  calcTotal({ commit, state }, payload) {
    const { singleUnitsQuantity, groupUnitsQuantity } = state.fields
    const { selectItem } = state.display

    const quantityInGroup = selectItem?.quantityInGroup || 0

    commit('setFieldValue', {
      key: 'total',
      value:
        Number(singleUnitsQuantity) +
        Number(groupUnitsQuantity) * quantityInGroup
    })
  },

  singleUnitsCostChange({ commit, state }, payload) {
    const { singleUnitsCost, total } = state.fields

    const { selectItem } = state.display

    const quantityInGroup = selectItem?.quantityInGroup || 0

    const singleCost = Number(singleUnitsCost) * Number(total)

    const groupCost = Number(singleUnitsCost) * quantityInGroup

    commit('setFieldValue', {
      key: 'groupUnitsCost',
      value: groupCost
    })

    commit('setFieldValue', {
      key: 'cost',
      value: singleCost
    })
  },

  async addToDB({ state, commit, dispatch }) {
    try {
      const { apiModule, fields, lists, table } = state

      if (lists.allData.length < 1) {
        return this.$toast.error('الرجاء اضافة صنف')
      }

      const schema = {
        DirectReleaseOrderId: lists.directReleaseOrder.id,
        ReturnEmployeeId: 'cb1004b5-d2ac-4873-8aa9-08d9dff264b2',
        ReturnDepartmentId: fields.departmentId,
        Note: fields.note,
        Date: fields.date,
        number: fields.number,
        CreateDetails: lists.allData
      }

      const { message } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)

      const n = fields.number + 1
      await dispatch('resetData')
      commit('setFieldValue', { key: 'number', value: n })
    } catch (error) {}
  },

  async confirmData({ state, commit, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const { message } = await this.$axios.$patch(
        `/${apiModule}/${payload}/confirm`
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  addToLocalTable({ commit, state, dispatch }, payload) {
    try {
      const { fields, lists } = state
      const allData = [...lists.allData]

      const itemEdit = lists.allData.find(
        item =>
          item.directReleaseOrderItemId === fields.itemId && !item.isDeleted
      )
      if (itemEdit) {
        const indexToRemove = lists.allData.findIndex(
          item => item.id === itemEdit.id
        )
        if (indexToRemove !== -1) {
          allData.splice(indexToRemove, 1)
        }
      }

      const item = lists.stordItemList.find(item => item.id === fields.itemId)

      // const item = lists.directReleaseOrder.detalils.find(
      //   item => item.id === fields.itemId
      // )

      const itemSchema = {}

      if (itemEdit) {
        itemSchema.id = itemEdit.id
      }
      itemSchema.directReleaseOrderItemId = fields.itemId
      itemSchema.directReleaseOrderId = item.id

      itemSchema.number = fields.number

      itemSchema.quantity = parseInt(fields.quantity)
      itemSchema.cost = parseInt(fields.cost)
      itemSchema.note = fields.noteDetails
      itemSchema.releaseItemStatus = fields.releaseItemStatus

      itemSchema.itemName = item.itemName
      if (!itemEdit) {
        itemSchema.releaseItemStatusName =
          fields.releaseItemStatus === 1 ? 'جديد' : 'مستعمل'
      }
      allData.push(itemSchema)

      commit('setListsValue', {
        key: 'allData',
        value: allData
      })

      // dispatch('emptyDetails')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields, lists, table } = state

      // const CreateDetails = []
      // const EditDetails = []
      // const DeleteDetails = []

      const schema = {
        directReleaseOrderId: lists.stordItemList[0].directReleaseOrderId,
        ReturnEmployeeId: 'cb1004b5-d2ac-4873-8aa9-08d9dff264b2',
        ReturnDepartmentId: fields.departmentId,
        Note: fields.note,
        number: fields.number,
        Date: fields.date
      }

      const create = lists.allData.filter(f => f.releaseItemStatusName)
      schema.CreateDetails = create.map((item, i) => {
        return {
          directReleaseOrderItemId: item.directReleaseOrderItemId,
          number: item.number,
          quantity: item.quantity,
          cost: item.cost,
          note: item.note,
          releaseItemStatus: item.releaseItemStatus
        }
      })
      const edit = lists.allData.filter(
        f => !f.releaseItemStatusName && !f.isDeleted
      )

      schema.EditDetails = edit.map((item, i) => {
        return {
          Id: item.id,
          directReleaseOrderItemId: item.directReleaseOrderItemId,
          number: item.number,
          quantity: item.quantity,
          cost: item.cost,
          note: item.note,
          releaseItemStatus: item.releaseItemStatus
        }
      })

      const deleted = lists.allData.filter(f => f.isDeleted && f.id)

      schema.DeleteDetails = deleted.map((item, i) => {
        return { Id: item.id }
      })

      const { message } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        schema
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  deleteFromLocalTable({ state, commit }, payload) {
    const { lists } = state

    const allData = format.deepCopy(lists.allData)

    const findItem = allData
      .filter(x => !x.isDeleted)
      .find((f, i) => i === payload.index)
    findItem.isDeleted = true
    // if (findItem.id) {

    // }
    // } else if (!findItem.id) {
    //   findItem.isDeleted = true
    //   allData.splice(payload.index, 1)
    // }

    commit('setListsValue', {
      key: 'allData',
      value: allData
    })
  },

  emptyDetails({ state, commit }, payload) {
    commit('setFieldValue', { key: 'quantity', value: null })
    commit('setFieldValue', { key: 'cost', value: null })
    commit('setFieldValue', { key: 'noteDetails', value: null })
    commit('setFieldValue', { key: 'itemId', value: null })
    commit('setFieldValue', { key: 'releaseItemStatus', value: null })
  },

  resetData({ commit }) {
    commit('setFieldValue', { key: 'RNumber', value: null })
    commit('setFieldValue', { key: 'Year', value: null })
    commit('setFieldValue', { key: 'storeName', value: null })
    commit('setFieldValue', { key: 'departmentId', value: null })
    commit('setFieldValue', { key: 'employeeFullName', value: null })
    commit('setFieldValue', { key: 'directReleaseOrderItemId', value: null })
    commit('setFieldValue', { key: 'quantity', value: null })
    commit('setFieldValue', { key: 'cost', value: null })
    commit('setFieldValue', { key: 'note', value: null })
    commit('setFieldValue', { key: 'noteDetails', value: null })
    commit('setListsValue', { key: 'allData', value: [] })
  },

  showData({ state, commit, dispatch }, payload) {
    console.log(payload)
    commit('setFieldValue', {
      key: 'itemId',
      value: payload.item.directReleaseOrderItemId
    })

    commit('setFieldValue', {
      key: 'quantity',
      value: payload.item.quantity
    })

    commit('setFieldValue', {
      key: 'cost',
      value: payload.item.cost
    })

    commit('setFieldValue', {
      key: 'releaseItemStatus',
      value: payload.item.releaseItemStatus
    })

    commit('setFieldValue', {
      key: 'noteDetails',
      value: payload.item.note
    })
  },

  async getDataByQuery({ state, dispatch }, payload) {
    const params = {
      currentPage: state.table.page || 1,
      pageSize: state.table.perPage || 25,
      ...state.fields
    }
    const { data } = await this.$axios.$get(`${state.apiModule}/filter`, {
      params
    })

    dispatch('getAllDataFromApi', data)
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
  },
  changeInputDataInTable(state, payload) {
    state.table.allData[payload.data.index].newQuantity = payload.value
  }
}
