<template>
  <WrapTheCard title="البحث">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="المدينة"
            store-key="cityId"
            list-key="cityList"
            :module-name="moduleName"
            label-select="name"
            value-select="cityId"
            lg="4"
          />

          <FormFVSelect
            label="حالة الطلبية"
            store-key="StateId"
            list-key="StateList"
            :module-name="moduleName"
            lg="4"
            disabled
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
