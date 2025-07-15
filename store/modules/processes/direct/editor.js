const format = require('@/composables/format')

/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
export const state = () => ({
  apiModule: '/directrelease-orders',
  table: {
    totalItems: 0,
    allData: [],
    filters: null,
    search: null,
    page: 1,
    perPage: 25
  },
  lists: {
    isConfirmedList: [
      { name: 'معتمد', id: true },
      { name: 'غير معتمد', id: false }
    ],

    classificationFList: [
      { name: 'الإدارة', id: 1 },
      { name: 'اللجان', id: 2 }
    ],
    stordItemList: [],
    detailsTable: [],
    deleteDetails: [],
    supplierList: [],
    storeList: [],
    employees: [],
    departments: [],
    committees: [],
    categoriesList: [],
    itemsList: [],
    constItemsList: []
  },

  fields: {
    fullNumber: null,
    employeeId: null,
    departmentId: null,
    committeeId: null,
    storeId: null,
    date: null,
    note: null,
    classificationId: null,
    isConfirmed: false,

    statement: null,
    // barcode: null,
    // name: null,
    categoryId: null,
    itemId: null,
    quantityInStock: 0,
    singleUnitsQuantity: 0,
    groupUnitsQuantity: 0,
    total: 0,
    expireDate: null,
    singleUnitsCost: 0,
    groupUnitsCost: 0,
    cost: 0
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

//  departmentId: fields.departmentId,
//         employeeId: fields.employeeId,

//         committeeId: fields.committeeId,
//         storeId: fields.storeId,
//         date: fields.date,
//         note: fields.note,
//         CreateItems: lists.detailsTable.map(x => ({
//           StoredItemId: x.itemId,
//           quantity: x.quantity,
//           cost: x.cost,
//           expireDate: x.expireDate

export const actions = {
  getAllListsFromApiNew({ commit }, payload) {
    commit('setListsValue', {
      key: 'departments',
      value: payload.departments
    })

    commit('setListsValue', {
      key: 'committees',
      value: payload.committees
    })

    commit('setListsValue', {
      key: 'employees',
      value: payload.employees
    })

    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })
  },
  getAllListsFromApi({ commit, dispatch }, payload) {
    commit('setFieldValue', {
      key: 'committeeId',
      value: payload.committeeId
    })

    commit('setFieldValue', {
      key: 'departmentId',
      value: payload.departmentId
    })

    if (payload.departmentId !== null) {
      commit('setFieldValue', {
        key: 'classificationId',
        value: 1
      })
    }
    commit('setFieldValue', {
      key: 'storeId',
      value: payload.storeId
    })
    dispatch('storeIdChange')

    commit('setFieldValue', {
      key: 'employeeId',
      value: payload.employeeId
    })

    commit('setFieldValue', {
      key: 'note',
      value: payload.note
    })

    commit('setFieldValue', {
      key: 'isConfirmed',
      value: payload.isConfirmed
    })

    commit('setListsValue', {
      key: 'detailsTable',
      value: payload.detalils
    })

    commit('setListsValue', {
      key: 'storeList',
      value: payload.stores
    })

    commit('setListsValue', {
      key: 'employees',
      value: payload.employees
    })

    commit('setListsValue', {
      key: 'departments',
      value: payload.departments
    })

    commit('setListsValue', {
      key: 'committees',
      value: payload.committees
    })

    commit('setListsValue', {
      key: 'categoriesList',
      value: payload.categories
    })

    commit('setFieldValue', {
      key: 'fullNumber',
      value: payload.fullNumber
    })

    commit('setFieldValue', {
      key: 'date',
      value: payload.date
    })
  },

  // async barcodeChange({ commit, state, dispatch }, payload) {
  //   const { fields } = state

  //   commit('setFieldValue', {
  //     key: 'itemId',
  //     value: null
  //   })

  //   const params = {
  //     barcode: fields.barcode,
  //     name: fields.name || '""',
  //     categoryId: fields.categoryId
  //   }

  //   const { data } = await this.$axios.$get('/items/load', {
  //     params
  //   })

  //   commit('setListsValue', {
  //     key: 'itemsList',
  //     value: data
  //   })

  //   if (data.length === 1) {
  //     const only = data[0]

  //     commit('setFieldValue', {
  //       key: 'itemId',
  //       value: only.id
  //     })

  //     dispatch('itemIdChange')
  //   }
  // },

  // itemIdChange({ dispatch }, payload) {

  // },

  // categoryIdChange({ commit, state, dispatch }, payload) {
  //   const { lists, fields } = state

  //   commit('setFieldValue', {
  //     key: 'itemId',
  //     value: null
  //   })

  //   dispatch('resetData', true)

  //   if (fields.categoryId) {
  //     const itemsFilterByCategory = lists.constItemsList.filter(
  //       item => item.categoryId === fields.categoryId
  //     )

  //     commit('setListsValue', {
  //       key: 'itemsList',
  //       value: itemsFilterByCategory
  //     })
  //   } else {
  //     commit('setListsValue', {
  //       key: 'itemsList',
  //       value: lists.constItemsList
  //     })
  //   }
  // },

  async storeIdChange({ commit, state, dispatch }, payload) {
    const { lists, fields } = state

    // const { data } = await this.$axios.$get(
    //   `/stored-items/getItemByCostAndExpireDateAndStore/${fields.storeId}`
    // )

    const { data } = await this.$axios.$get(
      `/stored-items/getItemByCostAndExpireDateAndStore/${fields.storeId}`
    )

    commit('setListsValue', {
      key: 'stordItemList',
      value: data.storedItems
    })

    console.log('storedItems', data.storedItems)
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

    commit('setFieldValue', {
      key: 'quantityInStock',
      value: item.quantity
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

  addToLocalTable({ commit, state, dispatch }, payload) {
    try {
      const { fields, lists, display } = state

      if (!fields.itemId) {
        return this.$toast.warning('يجب اختيار الصنف أولا وتحديد الكمية')
      }

      if (display.index != null) {
        return dispatch('updateLocalTable')
      }

      const allData = format.deepCopy(lists.detailsTable)

      // if (!fields.supplierId) {
      //   return this.$toast.warning('يجب اختيار مورد أولا')
      // }

      if (!fields.storeId) {
        return this.$toast.warning('يجب اختيار المخزن أولا')
      }

      const item = lists.stordItemList.find(item => item.id === fields.itemId)

      const itemSchema = {}

      itemSchema.cost = Number(fields.singleUnitsCost)
      itemSchema.expireDate = format.formatDate(fields.expireDate, this)
      itemSchema.storedItem = item
      itemSchema.itemId = fields.itemId
      itemSchema.quantity = fields.total

      const findItem = allData.find(item => item.itemId === fields.itemId)

      if (findItem && !findItem.isDelete) {
        if (findItem.storedItem.item.haveExpireDate) {
          const findItemWithSameExpireDate = allData.find(
            item =>
              item.itemId === fields.itemId &&
              item.storedItem.expireDate === itemSchema.expireDate &&
              item.storedItem.cost === itemSchema.cost
          )
          if (
            findItemWithSameExpireDate.storedItem.expireDate ===
              itemSchema.expireDate &&
            findItemWithSameExpireDate.storedItem.cost === itemSchema.cost
          ) {
            findItemWithSameExpireDate.storedItem.quantity +=
              itemSchema.quantity
          } else {
            allData.push(itemSchema)
          }
        } else if (findItem.cost === itemSchema.cost) {
          findItem.quantity += itemSchema.quantity
        } else {
          allData.push(itemSchema)
        }
      } else {
        allData.push(itemSchema)
      }

      commit('setListsValue', {
        key: 'detailsTable',
        value: allData
      })

      console.log('allData', allData)

      dispatch('emptyDetails')
    } catch (error) {}
  },

  emptyDetails({ state, commit }, payload) {
    if (!payload) {
      commit('setFieldValue', {
        key: 'itemId',
        value: null
      })
    }

    const fields = [
      'quantityInStock',
      'singleUnitsQuantity',
      'groupUnitsQuantity',
      'total',
      'singleUnitsCost',
      'groupUnitsCost',
      'cost'
    ]

    fields.forEach((field, i) => {
      commit('setFieldValue', { key: field, value: 0 })
    })

    commit('setDisplayValue', { key: 'selectItem', value: null })
    commit('setDisplayValue', { key: 'index', value: null })
  },

  updateLocalTable({ commit, state, dispatch }) {
    const { fields, lists, display } = state

    const allData = format.deepCopy(lists.detailsTable)

    const find = allData[display.index]
    if (find.id) {
      find.isUpdate = true
      find.isDelete = false
    }
    find.cost = Number(fields.singleUnitsCost)
    find.quantity = fields.total
    find.expireDate = fields.expireDate

    commit('setListsValue', {
      key: 'detailsTable',
      value: allData
    })

    dispatch('resetData', true)
    commit('setFieldValue', {
      key: 'itemId',
      value: null
    })
  },

  async addToDB({ state, commit, dispatch }) {
    try {
      const { apiModule, fields, lists } = state
      const schema = {
        departmentId: fields.departmentId,
        employeeId: fields.employeeId,

        committeeId: fields.committeeId,
        storeId: fields.storeId,
        date: fields.date,
        note: fields.note,
        CreateItems: lists.detailsTable.map(x => ({
          StoredItemId: x.itemId,
          quantity: x.quantity,
          cost: x.cost,
          expireDate: x.expireDate
        }))
      }

      const { message, data } = await this.$axios.$post(apiModule, schema)
      await this.$toast.success(message)
      await this.$router.push(`/processes/direct-release/${data.id}`)
      await dispatch('resetData')
      await commit('/setListsValue', {
        key: 'detailsTable',
        value: []
      })
    } catch (error) {}
  },

  async unconfirmData({ state, commit, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const { message } = await this.$axios.$patch(
        `/directrelease-orders/${payload}/unconfirm`
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  async confirmData({ state, commit, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const { message } = await this.$axios.$patch(
        `/directrelease-orders/${payload}/confirm`
      )
      await this.$toast.success(message)
      // await dispatch('resetData')
    } catch (error) {}
  },

  async updateInDB({ state, dispatch }, payload) {
    try {
      const { apiModule, fields, lists } = state

      const schema = {
        ReceiveremployeeId: fields.employeeId,
        ReceiverdepartmentId: fields.deparmentId,
        committeeId: fields.committeeId,
        storeId: fields.storeId,
        date: fields.date,
        note: fields.note,
        CreateItems: lists.detailsTable
          .filter(f => !f.id)
          .map(x => ({
            StoredItemId: x.itemId,
            quantity: x.quantity,
            cost: x.cost,
            expireDate: x.expireDate
          })),
        editDetails: lists.detailsTable
          .filter(f => f.isUpdate)
          .map(x => ({
            id: x.id,
            StoredItemId: x.itemId,
            quantity: x.quantity,
            cost: x.cost,
            expireDate: x.expireDate
          })),
        deleteDetails: lists.deleteDetails.map(x => ({
          id: x.id
        }))
      }

      const { message } = await this.$axios.$put(
        `${apiModule}/${payload}`,
        schema
      )
      await this.$toast.success(message)
    } catch (error) {}
  },

  async showSingleData({ state, commit, dispatch }, payload) {
    commit('setFieldValue', {
      key: 'statement',
      value: payload.statement
    })
    commit('setFieldValue', {
      key: 'employeeId',
      value: payload.employeeId
    })

    if (payload.committeeId != null) {
      commit('setFieldValue', {
        key: 'classificationId',
        value: 2
      })
    } else {
      commit('setFieldValue', {
        key: 'classificationId',
        value: 1
      })
    }

    commit('setFieldValue', {
      key: 'departmentId',
      value: payload.departmentId
    })

    commit('setFieldValue', {
      key: 'committeeId',
      value: payload.committeeId
    })

    commit('setFieldValue', {
      key: 'note',
      value: payload.note
    })
    commit('setFieldValue', {
      key: 'storeId',
      value: payload.storeId
    })

    await dispatch('storeIdChange')

    commit('setListsValue', {
      key: 'detailsTable',
      value: payload.detalils
    })

    commit('setFieldValue', {
      key: 'isConfirmed',
      value: payload.isConfirmed
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
  },

  showData({ state, commit, dispatch }, payload) {
    commit('setDisplayValue', {
      key: 'selectItem',
      value: payload.item.storedItem
    })

    commit('setDisplayValue', {
      key: 'index',
      value: payload.index
    })

    commit('setFieldValue', {
      key: 'itemId',
      value: payload.item.storedItemId
    })

    commit('setFieldValue', {
      key: 'expireDate',
      value: payload.item.expireDate
    })

    commit('setFieldValue', {
      key: 'singleUnitsCost',
      value: payload.item.cost
    })

    if (payload.item.storedItem.item.groupUnitsId) {
      commit('setFieldValue', {
        key: 'singleUnitsQuantity',
        value: payload.item.quantity % payload.item.item.quantityInGroup
      })

      commit('setFieldValue', {
        key: 'groupUnitsQuantity',
        value: parseInt(
          payload.item.quantity / payload.item.item.quantityInGroup
        )
      })
    } else {
      commit('setFieldValue', {
        key: 'singleUnitsQuantity',
        value: payload.item.quantity
      })
    }

    dispatch('calcTotal')
    dispatch('singleUnitsCostChange')
  },

  deleteFromLocalTable({ state, commit }, payload) {
    const { fields, lists } = state

    const allData = format.deepCopy(lists.detailsTable)

    const find = allData[payload.index]
    const filterData = allData.filter((f, i) => i !== payload.index)

    commit('setListsValue', {
      key: 'deleteDetails',
      value: [...lists.deleteDetails, find]
    })

    commit('setListsValue', {
      key: 'detailsTable',
      value: filterData
    })
  },

  resetData({ commit, state, dispatch }, payload) {
    if (!payload) {
      Object.keys(state.fields).forEach((field, i) => {
        commit('setFieldValue', { key: field, value: null })
      })
    }

    const fields = [
      'quantityInStock',
      'singleUnitsQuantity',
      'groupUnitsQuantity',
      'total',
      'singleUnitsCost',
      'groupUnitsCost',
      'cost'
    ]

    fields.forEach((field, i) => {
      commit('setFieldValue', { key: field, value: 0 })
    })

    commit('setFieldValue', { key: 'expireDate', value: null })
    commit('setDisplayValue', { key: 'selectItem', value: null })
    commit('setDisplayValue', { key: 'index', value: null })
    // commit('setFieldValue', { key: 'isConfirmed', value: false })
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
