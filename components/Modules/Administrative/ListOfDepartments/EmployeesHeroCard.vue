<template>
  <WrapTheCard title="الموظف">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="الموظف"
            store-key="employeesId"
            list-key="employeesList"
            :module-name="moduleName"
            label-select="fullName"
            value-select="id"
            lg="4"
            change
          />
        </b-row>

        <b-row
          class="justify-content-center align-items-center row-buttons mt-5"
        >
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

        <ModulesAdministrativeListOfDepartmentsEmployeesTheTable
          :headers="headers"
          :module-name="moduleName"
        />
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
      headers: [
        {
          key: 'employeeName',
          label: 'الموظف'
        },

        {
          key: 'actions',
          label: 'إجراءات',
          sortable: true
        }
      ]
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
