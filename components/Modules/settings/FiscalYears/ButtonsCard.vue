<template>
  <div>
    <b-card>
      <b-row class="justify-content-center">
        <b-button
          variant="primary"
          class="btn-w"
          @click="resetData"
        >
          جديد
        </b-button>
        <b-button
          variant="success"
          class="btn-w"
          :disabled="loading"
          @click="addToDB"
        >
          حفظ
          <b-spinner
            v-if="loading"
            class="me-2"
            small
          />
        </b-button>
      </b-row>
    </b-card>
  </div>
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
  methods: {
    resetData() {
      this.$store.dispatch(`${this.moduleName}/resetData`)
    },
    async addToDB() {
      this.loading = true
      const data = await this.$store.dispatch(`${this.moduleName}/addToDB`)
      this.loading = await false

      if (data) {
        await this.$nuxt.refresh()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
