<template>
  <WrapTheCard title="الصرف المباشر">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="رقم اذن الصرف"
            store-key="fullNumber"
            :module-name="moduleName"
            lg="4"
            disabled
          />

          <FormFVSelect
            label="تصنيف الجهة المستلمة"
            store-key="classificationId"
            list-key="classificationFList"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            lg="4"
          />

          <FormFVSelect
            v-if="fields.classificationId == 1"
            label="الإدارة"
            store-key="departmentId"
            list-key="departments"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            lg="4"
          />

          <FormFVSelect
            v-if="fields.classificationId == 2"
            label="اسم اللجنة"
            store-key="committeeId"
            list-key="committees"
            :module-name="moduleName"
            label-select="committeeName"
            value-select="id"
            lg="4"
          />

          <FormFVSelect
            label="الموظف المستلم"
            store-key="employeeId"
            list-key="employees"
            label-select="fullName"
            value-select="id"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            v-if="currentId"
            label="المخازن"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            :disabled="lists.detailsTable.length > 0 ? true : false"
            lg="4"
            change
          />

          <FormFVSelect
            v-else
            label="المخازن"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            :disabled="lists.detailsTable.length > 1 ? true : false"
            lg="4"
            change
          />

          <FormFDate
            label="التاريخ"
            store-key="date"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="البيان"
            store-key="note"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="الحالة"
            store-key="isConfirmed"
            list-key="isConfirmedList"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            lg="4"
            disabled
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
    return {}
  },
  computed: {
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    },
    lists() {
      return this.$store.getters[`${this.moduleName}/lists`]
    },
    currentId() {
      return this.$route.params.slug
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
