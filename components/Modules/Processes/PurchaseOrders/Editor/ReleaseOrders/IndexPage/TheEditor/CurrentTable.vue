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

    <!-- :per-page="perPage" -->
    <b-table
      ref="selectableTable"
      style="height: 650px"
      striped
      hover
      responsive
      class="position-relative"
      :foot-clone="false"
      :items="table.allData.filter(f => !f.isDeleted)"
      :fields="headers"
    >
      <template #thead-top="">
        <b-tr>
          <b-th
            class="text-center border-left-3 fs-5"
            colspan="4"
          >
            <span class="sr-only">تفاصيل الطلب</span>
            تفاصيل الطلب
          </b-th>
          <b-th
            class="text-center fs-5"
            colspan="4"
          >
            <span class="sr-only">تفاصيل الصرف</span>
            تفاصيل الصرف
          </b-th>
        </b-tr>
      </template>

      <template #cell()="data">
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

      <template #cell(storedItemId)="data">
        <b-row>
          <b-col lg="12">
            <b-input-group class="d-flex flex-nowrap">
              <v-select
                class="w-100"
                dir="rtl"
                :reduce="item => item.id"
                :options="lists.storedItemsList"
                label="itemName"
                :value="data.item.storedItemId"
                @input="changeStoredItemIdData($event, data)"
              />
            </b-input-group>
          </b-col>
        </b-row>
      </template>

      <template #cell(quantity)="data">
        <div class="d-flex">
          <b-form-input
            :value="data.item.quantity"
            @input="changeQuantityData($event, data)"
          />
        </div>
      </template>

      <template #cell(actions)="data">
        <div class="d-flex">
          <!-- <UtilsTheFIcon
            icon="edit"
            class="text-primary"
            @click.native="showData(data)"
          /> -->

          <UtilsTheFIcon
            v-if="data.item.id"
            icon="trash"
            class="text-danger ms-2"
            @click.native="showMsgBoxTwo(data)"
          />
        </div>
      </template>

      <template #foot(name)="">
        <i class="fs-4">إجمالي الكمية</i>
      </template>
      <template #foot(features)="">
        <i class="fs-4" />
      </template>
      <template #foot(quantity)="">
        <i class="fs-4" />
      </template>
      <template #foot(unit)="">
        <i class="fs-4" />
      </template>
      <template #foot(note)="">
        <i class="fs-4" />
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
    table() {
      return this.$store.getters[`${this.moduleName}/table`]
    },
    lists() {
      return this.$store.getters[`${this.moduleName}/lists`]
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
    async changeStoredItemIdData(value, { index, item }) {
      await this.$store.commit(`${this.moduleName}/updateItemId`, {
        index,
        value,
        item,
        isUpdated: item.id && item.storedItemId !== value
      })
    },
    async changeQuantityData(value, { index, item }) {
      await this.$store.commit(`${this.moduleName}/updateQuantity`, {
        index,
        value,
        item,
        isUpdated: item.id && item.quantity !== 0 && item.quantity !== value
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
          `هل أنت متأكد من حذف هذا العنصر ( ${data.item.itemName} )`,
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
