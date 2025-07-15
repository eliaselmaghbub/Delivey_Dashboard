<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title class="text-primary fw-bold fs-4">البحث</b-card-title>
      <FAS
        v-if="disabledBody"
        class="fa-2xl cursor-pointer"
        icon="fa-solid fa-chevron-up"
        @click="toggleBody"
      />
      <FAS
        v-else
        icon="fa-solid fa-chevron-down"
        class="fa-2xl cursor-pointer"
        @click="toggleBody"
      />
    </b-card-header>

    <b-card-body v-if="disabledBody">
      <b-row>
        <FormFVSelect
          label="الإدارة / المكتب"
          store-key="managementId"
          list-key="mangagementList"
          :module-name="moduleName"
          lg="4"
          change
        />

        <FormFVSelect
          label="القسم / المشروع"
          store-key="parentIdSearch"
          list-key="projectList"
          :module-name="moduleName"
          lg="4"
          change
        />

        <FormFVSelect
          label="الوحدة الإدارية"
          store-key="unitId"
          list-key="unitList"
          :module-name="moduleName"
          lg="4"
        />

        <FormFInput
          label="اسم الوحدة التنظيمية"
          store-key="nameSearch"
          :module-name="moduleName"
          lg="4"
        />

        <FormFInput
          label="رقم القسم"
          store-key="numberSearch"
          :module-name="moduleName"
          lg="4"
        />
      </b-row>
      <div class="row mt-2 justify-content-center">
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
      </div>
    </b-card-body>
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
      disabledBody: true,
      loading: false
    }
  },
  methods: {
    toggleBody() {
      this.disabledBody = !this.disabledBody
    },
    async search() {
      this.$store.commit(`${this.moduleName}/setTableValue`, {
        key: 'page',
        value: 1
      })
      this.loading = await true
      await this.$store.dispatch(`${this.moduleName}/getDataByQuery`)
      this.loading = await false
    }
  }
}
</script>

<style lang="scss" scoped></style>
