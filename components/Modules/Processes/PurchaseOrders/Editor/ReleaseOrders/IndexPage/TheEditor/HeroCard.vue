<template>
  <WrapTheCard title="تفاصيل إذن الصرف">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="رقم إذن الصرف"
            store-key="number"
            :module-name="moduleName"
          />

          <FormFDate
            label="التاريخ"
            store-key="date"
            :module-name="moduleName"
          />

          <FormFInput
            label="ملاحظات"
            store-key="note"
            :module-name="moduleName"
          />

          <FormFInput
            label="الحالة"
            store-key="isConfirmed"
            :module-name="moduleName"
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
    currentId() {
      return this.$route.params.slug
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
