<template>
  <WrapTheCard title="التفاصيل">
    <b-card-body>
      <b-row>
        <FormFVSelect
          label="الصنف المطلوب صرفه من المخزن"
          store-key="itemId"
          list-key="stordItemList"
          :module-name="moduleName"
          label-select="itemName"
          required
          :disabled="display.index != null || !fields.storeId"
          change
          lg="6"
        />

        <template>
          <FormFInput
            label="الكمية بالمخزن"
            store-key="quantityInStock"
            :module-name="moduleName"
            disabled
          />

          <FormFInput
            :label="`الكمية حسب ${singleUnits}`"
            store-key="singleUnitsQuantity"
            :module-name="moduleName"
            required
            change
          />

          <FormFInput
            :label="`الإجمالي حسب ${singleUnits}`"
            store-key="total"
            :module-name="moduleName"
          />
        </template>
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

      <ModulesProcessesDirectrEditorTheTable
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
        // {
        //   key: 'categoryName',
        //   label: 'التصنيف'
        // },

        {
          key: 'quantity',
          label: 'الكمية'
        },
        // {
        //   key: 'quantity',
        //   label: 'الكمية',
        //   formatter: (value, key, item) => {
        //     if (item.storedItem.item.groupUnitsId) {
        //       const quantityInGroup = parseInt(
        //         item.quantity / item.storedItem.item.quantityInGroup
        //       )
        //       const quantityInSingle = parseInt(
        //         item.quantity % item.storedItem.item.quantityInGroup
        //       )

        //       return `${quantityInGroup} ${item.storedItem.item.groupUnits} + ${quantityInSingle} ${item.storedItem.item.singleUnits}`
        //     } else {
        //       return `${item.quantity} ${item.storedItem.item.singleUnits}`
        //     }
        //   }
        // },
        {
          key: 'cost',
          label: 'تكلفة الوحدة',
          formatter: (value, key, item) => {
            return item.cost
          }
        },
        {
          key: 'totalCost',
          label: 'إجمالي التكلفة',
          formatter: (value, key, item) => {
            return this.formatValue(item.cost * item.quantity)
          }
        },
        // {
        //   key: 'expireDate',
        //   label: 'تاريخ الصلاحية',
        //   formatter: (value, key, item) => {
        //     return this.formatDate(item.storedItem.expireDate)
        //   }
        // },
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
