<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
      <b-button
        variant="primary"
        class="btn-w"
        :disabled="loading"
        @click="search"
      >
        بحث
        <b-spinner
          v-if="loading"
          class="me-2"
          small
        />
      </b-button>

      <b-button
        to="/processes/stocktakes/new"
        variant="primary"
        class="btn-w"
      >
        جديد
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
    async search() {
      this.$store.commit(`${this.moduleName}/setTableValue`, {
        key: 'page',
        value: 1
      })
      this.loading = await true
      await this.$store.dispatch(`${this.moduleName}/getDataByQuery`)
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
