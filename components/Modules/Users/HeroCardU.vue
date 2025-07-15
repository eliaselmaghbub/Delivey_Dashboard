<template>
  <WrapTheCard
    v-if="table.roles === 'Owner'"
    title="البحث بالفرع"
  >
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            v-if="table.roles === 'Owner'"
            label="الفروع"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
            lg="4"
          />

          <!-- <FormFVSelect
            v-else
            label="الفروع"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="branchName"
            value-select="branchId"
            lg="4"
            disabled
          /> -->
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
    table() {
      return this.$store.getters[`${this.moduleName}/table`]
    }
  },

  methods: {
    async search() {
      this.loading = await true
      await this.$store.dispatch(`${this.moduleName}/searchUser`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
