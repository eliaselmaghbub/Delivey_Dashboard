<template>
  <WrapTheCard title="البحث">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="كود الطلبية"
            store-key="OrderNo"
            :module-name="moduleName"
            lg="4"
          />

          <!-- <FormFInput
            label="رقم المرسل"
            store-key="name2"
            :module-name="moduleName"
            lg="4"
          /> -->

          <!-- <FormFVSelect
            label="اسم المستخدم"
            store-key="branchId"
            list-key="branchList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
          /> -->

          <FormFVSelect
            label="حالة الطلبية"
            store-key="StateId"
            list-key="StateList"
            :module-name="moduleName"
            lg="4"
            disabled
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
      await this.$store.dispatch(`${this.moduleName}/search`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
