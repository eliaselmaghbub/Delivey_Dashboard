<template>
  <!-- تفاصيل سلفة الموظف -->
  <b-card
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>{{ title }}</b-card-title>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <FormFInput
          label="اسم المستخدم"
          store-key="searchName"
          :module-name="moduleName"
        />

        <FormFVSelect
          label="المجموعة"
          store-key="searchGroupId"
          list-key="groupList"
          label-select="value"
          value-select="key"
          :module-name="moduleName"
        />
      </b-row>
      <b-row class="mt-3 justify-content-center">
        <b-col lg="3">
          <b-button
            :disabled="loading"
            class="px-5"
            variant="primary"
            @click="search"
          >
            بحث
            <b-spinner
              v-if="loading"
              class="me-2"
              small
            />
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
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
      await this.$store.dispatch(`${this.moduleName}/getDataByQuery`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
