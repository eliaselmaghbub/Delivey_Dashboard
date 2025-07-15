<template>
  <b-card
    no-body
    class="py-5"
  >
    <b-row
      v-if="hidePerPage"
      class="justify-content-between"
    >
      <b-col
        cols="12"
        sm="6"
        md="4"
        class="my-1"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-3">لكل صفحة</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50"
          />
        </b-form-group>
      </b-col>
    </b-row>

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
      :current-page="currentPage"
      class="position-relative"
      :foot-clone="footer"
      :per-page="perPage"
      :items="customData || table.allData"
      :fields="headers"
    >
      <template
        v-if="notId"
        #cell()="data"
      >
        <nuxt-link
          :to="`${path}/${data.item.id}`"
          class="table-link"
        />
        <span>{{ data.value }}</span>
      </template>

      <template #cell(actions)="data">
        <div class="d-flex align-items-center">
          <UtilsTheFIcon
            v-if="editIcon"
            icon="edit"
            class="text-primary mx-2"
            @click.native="editRow(data)"
          />
          <UtilsTheFIcon
            v-if="deleteLoading"
            icon="trash"
            class="text-danger mx-2"
            @click.native="showMsgBoxToConfirmDelete(data)"
          />
          <b-spinner
            v-else
            class="ms-3 text-danger p-50"
            small
          />
        </div>
      </template>

      <template #cell(softDelete)="data">
        <div class="d-flex">
          <UtilsTheFIcon
            icon="trash"
            class="text-danger mx-2"
            @click.native="showMsgBoxSoftDelete(data)"
          />
        </div>
      </template>

      <slot name="footer" />

      <!-- <template #foot()="data">
        <i>{{ data.key }}</i>
      </template> -->
    </b-table>

    <b-pagination
      v-if="table.allData.length"
      v-show="hidePagination"
      v-model="currentPage"
      :total-rows="table.allData.length"
      :per-page="perPage"
      align="center"
      size="sm"
      class="my-0"
    />

    <!-- :title="title" -->
    <HelpersTLottie
      v-if="!table.allData.length"
      v-show="hideLottie"
      :path="path"
      height="40"
      lottie="https://assets1.lottiefiles.com/packages/lf20_tmsiddoc.json"
    />
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
    customData: {
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
    hideLottie: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: false
    },
    hidePagination: {
      type: Boolean,
      default: true
    },
    search: {
      type: Boolean,
      default: false
    },
    editIcon: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      perPage: 25,
      pageOptions: [5, 10, 25, 50],
      currentPage: 1,
      deleteLoading: true
    }
  },
  computed: {
    table() {
      return this.$store.getters[`${this.moduleName}/table`]
    }
  },
  watch: {
    // async currentPage(newValue) {
    //   await this.$store.commit(`${this.moduleName}/setTableValue`, {
    //     key: 'page',
    //     value: newValue
    //   })
    //   await this.$store.dispatch(
    //     `${this.moduleName}/getDataByQuery`,
    //     this.params
    //   )
    // },
    // async perPage(newValue) {
    //   await this.$store.commit(`${this.moduleName}/setTableValue`, {
    //     key: 'perPage',
    //     value: newValue
    //   })
    //   await this.$store.dispatch(
    //     `${this.moduleName}/getDataByQuery`,
    //     this.params
    //   )
    // }
  },
  methods: {
    editRow(data) {
      this.$store.dispatch(`${this.moduleName}/editRow`, data)
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
    showMsgBoxToConfirmDelete(data) {
      this.$bvModal
        .msgBoxConfirm(
          `هل أنت متأكد من حذف هذا العنصر ( ${data.item[this.delKey]} )`,
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
        .then(
          (value, i) => value && this.delete(data.item.id ? data.item.id : data)
        )
    },
    showMsgBoxSoftDelete(data) {
      this.$bvModal
        .msgBoxConfirm(
          `هل أنت متأكد من حذف هذا العنصر ( ${data.item[this.delKey]} )`,
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
        .then((value, i) => value && this.softDelete(data))
    },
    async delete(id) {
      this.deleteLoading = await false
      await this.$store.dispatch(`${this.moduleName}/deleteFromDB`, id)
      await this.$nuxt.refresh()
      await this.$toast.success('تم الحذف بنجاح')

      this.deleteLoading = await true
    },
    async softDelete(id) {
      await this.$store.dispatch(`${this.moduleName}/deleteFromDB`, id)
      // await this.$nuxt.refresh();
      await this.$toast.success('تم الحذف بنجاح')
    }
  }
}
</script>

<style lang="scss" scoped></style>
