<template>
  <WrapTheCard
    v-if="fields.roles === 'Owner'"
    title="البحث بالفروع"
  >
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="الفروع"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
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
  computed: {
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    }
  },

  methods: {
    async search() {
      this.loading = await true
      await this.$store.dispatch(`${this.moduleName}/searchCity`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
