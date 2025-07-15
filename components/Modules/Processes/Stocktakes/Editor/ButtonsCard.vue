<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
      <!-- <b-button
        variant="primary"
        class="btn-w"
        @click="reset"
      >
        اضافة
      </b-button> -->

      <b-button
        variant="primary"
        class="btn-w"
        :disabled="loadingConfirm || fields.isConfirmed"
        @click="save"
      >
        حفظ
        <b-spinner
          v-if="loading"
          class="me-2"
          small
        />
      </b-button>

      <!-- <b-button
        variant="primary"
        class="btn-w"
        to="/processes/directrelease/new"
        @click="reset"
      >
        جديد
      </b-button> -->

      <b-button
        variant="primary"
        class="btn-w"
        :disabled="loadingConfirm || fields.isConfirmed"
        @click="confirm"
      >
        إعتماد
        <b-spinner
          v-if="loadingConfirm"
          class="me-2"
          small
        />
      </b-button>

      <b-button
        variant="primary"
        class="btn-w"
        to="/processes/stocktakes"
      >
        عودة للقائمة
      </b-button>
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
      loadingunconfirm: false
    }
  },
  computed: {
    display() {
      return this.$store.getters[`${this.moduleName}/display`]
    },
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
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
    reset() {
      this.$store.dispatch(`${this.moduleName}/resetData`)
    },
    async confirm() {
      this.loadingConfirm = await true

      await this.$store.dispatch(
        `${this.moduleName}/confirmData`,
        this.$route.params.slug
      )
      this.loadingConfirm = await false
    },

    async unconfirm() {
      this.loadingUnConfirm = await true

      await this.$store.dispatch(
        `${this.moduleName}/unconfirmData`,
        this.$route.params.slug
      )
      this.loadingUnConfirm = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
