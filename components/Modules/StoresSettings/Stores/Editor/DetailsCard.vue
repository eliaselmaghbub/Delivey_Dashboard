<template>
  <WrapTheCard title="أمين المخزن">
    <b-card-body>
      <b-row>
        <FormFVSelect
          label="أمين المخزن"
          store-key="employeesId"
          list-key="employeesList"
          :module-name="moduleName"
          label-select="fullName"
          value-select="id"
          lg="4"
        />
      </b-row>
      <b-row class="justify-content-center align-items-center row-buttons mt-5">
        <b-button
          variant="primary"
          class="btn-w"
          @click="add"
        >
          إضافة
        </b-button>

        <b-button
          variant="primary"
          class="btn-w"
          @click="reset"
        >
          إفراغ
        </b-button>
      </b-row>

      <ModulesStoresSettingsStoresEditorTheTable
        :headers="headers"
        :module-name="moduleName"
      />
    </b-card-body>
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
      headers: [
        {
          key: 'storekeeperName',
          label: 'امين المخزن'
        },

        {
          key: 'actions',
          label: 'إجراءات',
          sortable: true
        }
      ]
    }
  },
  computed: {
    display() {
      return this.$store.getters[`${this.moduleName}/display`]
    },
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    },
    singleUnits() {
      const { selectItem } = this.$store.getters[`${this.moduleName}/display`]
      return selectItem?.singleUnits || 'الفرد'
    },
    groupUnits() {
      const { selectItem } = this.$store.getters[`${this.moduleName}/display`]
      return selectItem?.groupUnits || 'المجموعة'
    }
  },
  methods: {
    add() {
      this.$store.dispatch(`${this.moduleName}/addToLocalTable`)
    },
    reset() {
      this.$store.dispatch(`${this.moduleName}/emptyDetails`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
