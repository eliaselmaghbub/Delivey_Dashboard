<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
      <b-button
        variant="primary"
        class="btn-w"
        @click="reset"
      >
        جديد
      </b-button>
      <b-button
        variant="success"
        class="btn-w"
        :disabled="loading"
        @click="persist"
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
    }
  },
  methods: {
    reset() {
      this.$store.dispatch(`${this.moduleName}/resetData`)
    },
    async persist() {
      const id = this.display.id

      this.loading = await true
      if (id) {
        await this.$store.dispatch(`${this.moduleName}/updateInDB`, id)
      } else {
        await this.$store.dispatch(`${this.moduleName}/addToDB`)
      }
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
