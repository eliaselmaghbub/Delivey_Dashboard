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
        to="/processes/purchase-orders/new"
        @click="reset"
      >
        جديد
      </b-button>
      <b-button
        variant="primary"
        class="btn-w"
        to="/processes/purchase-orders"
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
      loading: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
