<template>
  <b-card
    no-body
    class="py-5"
  >
    <!-- class="customise-table" -->
    <b-table
      ref="selectableTable"
      striped
      hover
      responsive
      class="position-relative"
      :per-page="perPage"
      :items="customData || table.allData"
      :fields="headers"
    >
      <template #cell(actions)="data">
        <div class="d-flex">
          <b-spinner
            v-if="editLoading"
            class="text-primary mx-2"
            style="width: 1.5rem; height: 1.5rem"
          />
          <UtilsTheFIcon
            v-else
            icon="edit"
            class="text-primary mx-2"
            @click.native="editRow(data)"
          />
          <UtilsTheFIcon
            icon="trash"
            class="text-danger mx-2"
            @click.native="showMsgBoxTwo(data)"
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
    customData: {
      type: Array,
      default: null
    },
    moduleName: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      perPage: 25,
      pageOptions: [5, 10, 25, 50],
      currentPage: 1,
      editLoading: false
    }
  },
  computed: {
    table() {
      return this.$store.getters[`${this.moduleName}/table`]
    }
  },
  methods: {
    async editRow(data) {
      this.editLoading = true
      await this.$store.dispatch(`${this.moduleName}/editRow`, data)
      this.editLoading = false
    },

    showMsgBoxTwo(data) {
      this.$bvModal
        .msgBoxConfirm(`هل أنت متأكد من حذف هذا العنصر ( ${data.item.name} )`, {
          title: 'تأكيد للحذف',
          size: 'sm',
          okVariant: 'primary',
          okTitle: 'نعم',
          cancelTitle: 'لا',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: false
        })
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
      await this.$store.dispatch(`${this.moduleName}/deleteFromDB`, id)
      await this.$nuxt.refresh()
      await this.$toast.success('تم الحذف بنجاح')
    },
    async softDelete(id) {
      await this.$store.dispatch(`${this.moduleName}/deleteFromDB`, id)
      await this.$toast.success('تم الحذف بنجاح')
    }
  }
}
</script>

<style lang="scss" scoped></style>
