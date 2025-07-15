<template>
  <WrapTheCard title="استرجاع المصروفات المباشرة">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="السنة"
            store-key="Year"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="رقم الصرف"
            store-key="RNumber"
            :module-name="moduleName"
            lg="4"
            change
          />

          <FormFInput
            label="المخازن"
            store-key="storeName"
            :module-name="moduleName"
            lg="4"
            disabled
          />

          <!-- <FormFVSelect
            label="المخازن"
            store-key="storeId"
            list-key="storeList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
            change
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
