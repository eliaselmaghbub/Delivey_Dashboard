<template>
  <WrapTheCard title="تفاصيل طلب الشراء">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="رقم طلب الشراء"
            store-key="fullNumber"
            :module-name="moduleName"
            lg="4"
            disabled
          />

          <FormFDate
            label="التاريخ"
            store-key="date"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="معد الطلب"
            store-key="preparedByName"
            :module-name="moduleName"
            disabled
            lg="4"
          />

          <FormFVSelect
            label="حالة طلب الشراء"
            store-key="state"
            list-key="stateList"
            :module-name="moduleName"
            :disabled="currentId ? false : true"
            lg="4"
          />

          <FormFVSelect
            label="حالة الاستلام"
            store-key="deliveryState"
            list-key="deliveryStateList"
            :module-name="moduleName"
            :disabled="currentId ? false : true"
            lg="4"
          />

          <FormFVSelect
            label="حالة المستند"
            store-key="isClosed"
            list-key="isClosedList"
            :module-name="moduleName"
            :disabled="currentId ? false : true"
            lg="4"
          />

          <FormFInput
            label="البيان"
            store-key="statement"
            :module-name="moduleName"
            required
            lg="12"
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
    currentId() {
      return this.$route.params.slug
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
