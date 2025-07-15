<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
      <b-button
        variant="primary"
        class="btn-w"
        :disabled="loading"
        @click="save"
      >
        حفظ
        <b-spinner
          v-if="loading"
          class="me-2"
          small
        />
      </b-button>
      <b-button
        variant="primary"
        class="btn-w"
        to="/processes/purchase-invoices/new"
        @click="reset"
      >
        جديد
      </b-button>
      <b-button
        variant="primary"
        class="btn-w"
        to="/processes/purchase-invoices"
      >
        عودة للقائمة
      </b-button>
      <b-button
        v-b-modal.modal-confirm
        variant="primary"
        class="btn-w"
        :disabled="loadingConfirm || !currentId || display.isConfirm"
      >
        اعتماد
        <b-spinner
          v-if="loadingConfirm"
          class="me-2"
          small
        />
      </b-button>
      <b-button
        v-b-modal.modal-unConfirm
        variant="primary"
        class="btn-w"
        :disabled="loadingUnConfirm || !currentId || !display.isConfirm"
      >
        إلغاء الاعتماد
        <b-spinner
          v-if="loadingUnConfirm"
          class="me-2"
          small
        />
      </b-button>
      <b-modal
        id="modal-confirm"
        title="اعتماد فاتورة شراء"
        ok-title="نعم"
        ok-only
        @ok="confirm"
      >
        <p class="fw-bold fs-5">هل أنت متأكد من اعتماد هذه العملية ؟</p>
      </b-modal>
      <b-modal
        id="modal-unConfirm"
        title="إلغاء اعتماد فاتورة شراء"
        ok-title="نعم"
        ok-only
        @ok="unConfirm"
      >
        <p class="fw-bold fs-5">هل أنت متأكد من إلغاء اعتماد هذه العملية ؟</p>
      </b-modal>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    moduleName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      loadingConfirm: false,
      loadingUnConfirm: false
    }
  },
  computed: {
    display() {
      return this.$store.getters[`${this.moduleName}/display`]
    },
    currentId() {
      return this.$route.params.slug
    }
  },
  methods: {
    async save() {
      this.loading = await true
      if (this.currentId) {
        await this.$store.dispatch(
          `${this.moduleName}/updateInDB`,
          this.currentId
        )
      } else {
        await this.$store.dispatch(`${this.moduleName}/addToDB`)
      }
      this.loading = await false
    },
    async confirm() {
      this.loadingConfirm = await true
      await this.$store.dispatch(`${this.moduleName}/confirm`, this.currentId)
      this.loadingConfirm = await false
    },
    async unConfirm() {
      this.loadingUnConfirm = await true
      await this.$store.dispatch(`${this.moduleName}/unConfirm`, this.currentId)
      this.loadingUnConfirm = await false
    },
    reset() {
      this.$store.dispatch(`${this.moduleName}/resetData`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
