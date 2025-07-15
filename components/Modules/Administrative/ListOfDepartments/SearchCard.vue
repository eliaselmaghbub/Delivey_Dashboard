<template>
  <WrapTheCard title="الموظفين">
    <b-card no-body>
      <b-card-body v-if="disabledBody">
        <b-row>
          <FormFInput
            label="الاسم"
            store-key="nameSearch"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="الرقم الوطني"
            store-key="nationalNumberSearch"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="الرقم الوظيفي"
            store-key="jobNumberSearch"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="يتبع ل"
            store-key="departmentIdSearch"
            list-key="departmentList"
            :module-name="moduleName"
            lg="4"
            change
          />
        </b-row>
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
