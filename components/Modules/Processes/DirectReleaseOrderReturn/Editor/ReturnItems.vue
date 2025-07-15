<template>
  <WrapTheCard title="إرجاع أصناف الطلب">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="رقم الطلب"
            store-key="SerialNumber"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="الإدارة"
            store-key="storeId2"
            list-key="storeList2"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
            change
          />

          <FormFVSelect
            label="الموظف"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
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
            label="ملاحظة"
            store-key="SerialNumber"
            :module-name="moduleName"
            lg="4"
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
      headers: [
        //   {
        //     key: 'itemName',
        //     label: 'اسم الصنف',
        //     sortable: true
        //   },
        //   {
        //     key: 'quantity',
        //     label: 'الكمية',
        //     sortable: true
        //   },
        //   {
        //     key: 'cost',
        //     label: 'اجمالي التكلفة',
        //     sortable: true
        //   },
        //   {
        //     key: 'expireDate',
        //     label: 'تاريخ الصلاحية',
        //     sortable: true,
        //     tdClass: 'td-fit',
        //     formatter: this.formatDate
        //   }
        //
      ]
    }
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
