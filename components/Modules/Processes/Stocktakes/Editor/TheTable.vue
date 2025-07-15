<template>
  <b-card
    no-body
    class="py-5"
  >
    <b-row class="justify-content-between mx-3">
      <!-- Search -->
      <HelpersTableTSearch
        v-if="search"
        :module-name="moduleName"
        label="نتائج البحث"
      />
    </b-row>

    <b-table
      ref="selectableTable"
      striped
      hover
      responsive
      class="position-relative"
      :per-page="perPage"
      :foot-clone="false"
      :items="table.allData"
      :fields="headers"
    >
      <template
        v-if="getItem"
        #cell()="data"
      >
        <nuxt-link
          to=""
          class="table-link"
        />
        <span
          class="table-link d-flex justify-content-start pr-2 align-items-center"
          @click="showData(data)"
        >
          {{ data.value }}
        </span>
      </template>

      <template #cell(newQuantity)="data">
        <div class="d-flex">
          <b-form-input
            :value="data.item.newQuantity"
            @input="changeData($event, data)"
          />
        </div>
      </template>

      <template #cell(actions)="data">
        <div class="d-flex">
          <UtilsTheFIcon
            icon="edit"
            class="text-primary"
            @click.native="showData(data)"
          />
          <UtilsTheFIcon
            icon="trash"
            class="text-danger ms-2"
            @click.native="showMsgBoxTwo(data)"
          />
        </div>
      </template>

      <!-- <template #foot(quantity)="">
        <i class="fs-4">
          {{ customData.reduce((a, b) => a + b.quantity, 0) }}
        </i>
      </template> -->
      <template #foot(name)="">
        <i class="fs-4">المجموع</i>
      </template>
      <template #foot(categoryName)="">
        <i class="fs-4" />
      </template>
      <template #foot(cost)="">
        <i class="fs-4" />
      </template>
      <template #foot(totalCost)="">
        <i class="fs-4">
          {{
            formatValue(customData.reduce((a, b) => a + b.cost * b.quantity, 0))
          }}
        </i>
      </template>
      <template #foot(expireDate)="">
        <i class="fs-4" />
      </template>
      <template #foot(actions)="">
        <i class="fs-4" />
      </template>
    </b-table>
  </b-card>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: 'name'
    },
    headers: {
      type: Array,
      default: null
    },
    moduleName: {
      type: String,
      default: 'name'
    },
    delKey: {
      type: String,
      default: 'name'
    },
    notId: {
      type: Boolean,
      default: true
    },
    getItem: {
      type: Boolean,
      default: false
    },
    hidePerPage: {
      type: Boolean,
      default: true
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      perPage: 25,
      pageOptions: [5, 10, 25, 50],
      currentPage: 1
    }
  },
  computed: {
    lists() {
      return this.$store.getters[`${this.moduleName}/lists`]
    },
    table() {
      return this.$store.getters[`${this.moduleName}/table`]
    },
    customData() {
      const { detailsTable } = this.$store.getters[`${this.moduleName}/lists`]

      return detailsTable.filter(x => !x.isDelete)
    }
  },
  watch: {
    async currentPage(newValue) {
      await this.$store.commit(`${this.moduleName}/setTableValue`, {
        key: 'page',
        value: newValue
      })
      await this.$store.dispatch(`${this.moduleName}/getDataByQuery`)
    },
    async perPage(newValue) {
      await this.$store.commit(`${this.moduleName}/setTableValue`, {
        key: 'perPage',
        value: newValue
      })
      await this.$store.dispatch(`${this.moduleName}/getDataByQuery`)
    }
  },
  methods: {
    changeData(e, data) {
      // data.item.newQuantity = e
      this.$store.commit(`${this.moduleName}/changeInputDataInTable`, {
        value: e,
        data
      })
    },
    showData(data) {
      this.$store.dispatch(`${this.moduleName}/showData`, data)
    },
    showMsgBoxToTransfer(data) {
      this.$bvModal
        .msgBoxConfirm(
          `هل أنت متأكد من ترحيل هذا العنصر ( ${data.item.statement} )`,
          {
            title: 'تأكيد للحذف',
            size: 'sm',
            okVariant: 'primary',
            okTitle: 'نعم',
            cancelTitle: 'لا',
            cancelVariant: 'outline-secondary',
            hideHeaderClose: false,
            centered: false
          }
        )
        .then((value, i) => {
          if (value) {
            this.$emit('transferItem', data.item.id)
          }
        })
    },
    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm(
          `هل أنت متأكد من حذف هذا العنصر ( ${data.item.storedItem.itemName} )`,
          {
            title: 'تأكيد للحذف',
            size: 'sm',
            okVariant: 'primary',
            okTitle: 'نعم',
            cancelTitle: 'لا',
            cancelVariant: 'outline-secondary',
            hideHeaderClose: false,
            centered: false
          }
        )
        .then((value, i) => value && this.delete(data))
    },
    async delete(data) {
      await this.$store.dispatch(
        `${this.moduleName}/deleteFromLocalTable`,
        data
      )
      // await this.$nuxt.refresh()
      // await this.$toast.success('تم الحذف بنجاح')
    }
  }
}
</script>

<style lang="scss" scoped></style>
