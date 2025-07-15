<template>
  <WrapTheCard title="التفاصيل">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="التصنيف"
            store-key="categoryId"
            list-key="categoriesList"
            :module-name="moduleName"
            :disabled="display.index != null"
            change
            lg="4"
          />
          <FormFVSelect
            label="اسم الصنف / الباركود"
            store-key="itemId"
            list-key="itemsList"
            label-select="display"
            :module-name="moduleName"
            required
            :disabled="display.index != null || !fields.storeId"
            change
            lg="4"
          />

          <template v-if="display.selectItem">
            <FormFInput
              label="الكمية بالمخزن"
              store-key="quantityInStock"
              :module-name="moduleName"
              disabled
              lg="4"
            />

            <FormFInput
              :label="`الكمية حسب ${singleUnits}`"
              store-key="singleUnitsQuantity"
              :module-name="moduleName"
              required
              change
            />

            <FormFInput
              v-if="display.selectItem.groupUnitsId"
              :label="`الكمية حسب ${groupUnits}`"
              store-key="groupUnitsQuantity"
              :module-name="moduleName"
              change
            />

            <FormFInput
              v-if="display.selectItem.groupUnitsId"
              :label="`الإجمالي حسب ${singleUnits}`"
              store-key="total"
              :module-name="moduleName"
              disabled
            />

            <FormFDate
              v-if="!display.selectItem"
              label="تاريخ الصلاحية"
              store-key="expireDate"
              :module-name="moduleName"
            />

            <FormFDate
              v-if="display.selectItem && display.selectItem.haveExpireDate"
              label="تاريخ الصلاحية"
              store-key="expireDate"
              :module-name="moduleName"
            />

            <FormFInput
              :label="`التكلفة حسب ${singleUnits}`"
              store-key="singleUnitsCost"
              :module-name="moduleName"
              change
            />

            <FormFNumber
              v-if="display.selectItem.groupUnitsId"
              :label="`التكلفة حسب ${groupUnits}`"
              store-key="groupUnitsCost"
              :module-name="moduleName"
              disabled
            />

            <FormFNumber
              label="إجمالي التكلفة"
              store-key="cost"
              :module-name="moduleName"
              disabled
            />
          </template>
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

        <ModulesProcessesPurchaseInvoicesEditorTheTable
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
          key: 'name',
          label: 'اسم الصنف',
          formatter: (value, key, item) => {
            return item.item.name
          }
        },
        {
          key: 'categoryName',
          label: 'التصنيف',
          formatter: (value, key, item) => {
            return item.item.categoryName
          }
        },
        {
          key: 'quantity',
          label: 'الكمية',
          formatter: (value, key, item) => {
            if (item.item.groupUnitsId) {
              const quantityInGroup = parseInt(
                item.quantity / item.item.quantityInGroup
              )
              const quantityInSingle = parseInt(
                item.quantity % item.item.quantityInGroup
              )

              return `${quantityInGroup} ${item.item.groupUnits} + ${quantityInSingle} ${item.item.singleUnits}`
            } else {
              return `${item.quantity} ${item.item.singleUnits}`
            }
          }
        },
        {
          key: 'cost',
          label: 'تكلفة الوحدة',
          formatter: this.formatValue
        },
        {
          key: 'totalCost',
          label: 'إجمالي التكلفة',
          formatter: (value, key, item) => {
            return this.formatValue(item.cost * item.quantity)
          }
        },
        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          formatter: this.formatDate
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
