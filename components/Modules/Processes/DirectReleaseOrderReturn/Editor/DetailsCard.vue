<template>
  <WrapTheCard title="التفاصيل">
    <b-card-body>
      <b-row>
        <FormFVSelect
          label="الصنف"
          store-key="itemId"
          list-key="stordItemList"
          :module-name="moduleName"
          label-select="itemName"
          value-select="id"
          required
          lg="4"
        />

        <FormFInput
          label="الكمية"
          store-key="quantity"
          :module-name="moduleName"
          lg="4"
        />

        <FormFInput
          label="تكلفة الوحدة"
          store-key="cost"
          :module-name="moduleName"
          lg="4"
        />

        <FormFVSelect
          label="حالة الصنف"
          store-key="releaseItemStatus"
          list-key="ReleaseItemStatusList"
          :module-name="moduleName"
          lg="4"
        />

        <FormFInput
          label="ملاحظة"
          store-key="noteDetails"
          :module-name="moduleName"
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

      <ModulesProcessesDirectReleaseOrderReturnEditorTheTable
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
          key: 'itemName',
          label: 'اسم الصنف'
        },
        {
          key: 'quantity',
          label: 'الكمية'
        },
        {
          key: 'cost',
          label: 'تكلفة الوحدة'
        },
        {
          key: 'releaseItemStatus',
          label: 'حالة الصنف',
          formatter: value => (value === 2 ? 'جديد' : 'مستعمل')
        },

        {
          key: 'note',
          label: 'ملاحظة'
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
