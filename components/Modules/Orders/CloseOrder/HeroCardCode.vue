<template>
  <WrapTheCard title="البحث بكود الطلبية">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="كود الطلبية"
            store-key="OrderNo"
            :module-name="moduleName"
            lg="4"
          />
        </b-row>
      </b-card-body>
    </b-card>

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
      </b-row>
    </b-card>
  </WrapTheCard>
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
    async search() {
      this.loading = await true
      await this.$store.dispatch(`${this.moduleName}/searchCode`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
