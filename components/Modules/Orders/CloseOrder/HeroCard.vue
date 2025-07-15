<template>
  <WrapTheCard title="البحث عن">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="المندوب"
            store-key="representativeId"
            list-key="RepresentativesList"
            :module-name="moduleName"
            label-select="userName"
            value-select="userId"
            lg="4"
          />
          <FormFVSelect
            label="حالة الطلبية"
            store-key="StateId"
            list-key="StateList"
            :module-name="moduleName"
            lg="4"
          />
        </b-row>
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
      </b-card-body>
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
      await this.$store.dispatch(`${this.moduleName}/search`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
