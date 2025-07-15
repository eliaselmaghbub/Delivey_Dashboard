<template>
  <WrapTheCard title="الجرد">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الرقم التسلسلي"
            store-key="SerialNumber"
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

          <FormFVSelect
            label="نوع الجرد"
            store-key="StocktakeType"
            list-key="StocktakeTypeList"
            :module-name="moduleName"
            label-select="name"
            value-select="id"
            lg="4"
          />

          <FormFVSelect
            label="المخازن"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
            change
          />

          <FormFInput
            label="البيان"
            store-key="Statement"
            :module-name="moduleName"
            lg="4"
          />

          <!-- <FormFVSelect
          label="الصنف"
          store-key="stordItemId"
          list-key="stordItemList"
          :module-name="moduleName"
          :multiple="true"
          label-select="itemName"
          value-select="itemId
"
          lg="4"
          change
        /> -->

          <!-- <UtilsTheTable
          :not-id="true"
          :headers="headers"
          :module-name="moduleName"
        /> -->
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
        {
          key: 'itemName',
          label: 'اسم الصنف',
          sortable: true
        },

        {
          key: 'quantity',
          label: 'الكمية',
          sortable: true
        },

        {
          key: 'cost',
          label: 'اجمالي التكلفة',
          sortable: true
        },
        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          sortable: true,
          tdClass: 'td-fit',
          formatter: this.formatDate
        }
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
