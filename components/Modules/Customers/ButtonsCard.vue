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
      loadingNew: false
    }
  },
  computed: {
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    }
  },
  methods: {
    async save() {
      this.loading = await true
      if (this.fields.id) {
        await this.$store.dispatch(`${this.moduleName}/updateInDB`)
      } else {
        await this.$store.dispatch(`${this.moduleName}/addToDB`)
      }
      await this.$nuxt.refresh()
      this.loading = await false
    },
    async reset() {
      this.loadingNew = await true
      await this.$store.dispatch(`${this.moduleName}/resetData`)
      this.loadingNew = await false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
