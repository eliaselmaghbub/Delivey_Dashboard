<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title class="text-primary fw-bold fs-4">التفاصيل</b-card-title>
    </b-card-header>

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
        />

        <template v-if="display.selectItem">
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
            disabled
          />

          <!-- <FormFNumber
            v-if="display.selectItem.groupUnitsId"
            :label="`التكلفة حسب ${groupUnits}`"
            store-key="groupUnitsCost"
            :module-name="moduleName"
            disabled
          /> -->

          <!-- <FormFNumber
            label="إجمالي التكلفة"
            store-key="cost"
            :module-name="moduleName"
            disabled
          /> -->
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

      <ModulesProcessesDirectReleaseEditorTheTable
        :headers="headers"
        :module-name="moduleName"
      />
    </b-card-body>
  </b-card>
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
            console.log(item)
            return item.storedItem.item.name
          }
        },
        {
          key: 'categoryName',
          label: 'التصنيف',
          formatter: (value, key, item) => {
            return item.storedItem.item.categoryName
          }
        },
        {
          key: 'quantity',
          label: 'الكمية',
          formatter: (value, key, item) => {
            if (item.storedItem.item.groupUnitsId) {
              const quantityInGroup = parseInt(
                item.quantity / item.storedItem.item.quantityInGroup
              )
              const quantityInSingle = parseInt(
                item.quantity % item.storedItem.item.quantityInGroup
              )

              return `${quantityInGroup} ${item.storedItem.item.groupUnits} + ${quantityInSingle} ${item.storedItem.item.singleUnits}`
            } else {
              return `${item.quantity} ${item.storedItem.item.singleUnits}`
            }
          }
        },
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
        {
          key: 'expireDate',
          label: 'تاريخ الصلاحية',
          formatter: (value, key, item) => {
            return this.formatDate(item.storedItem.expireDate)
          }
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
      this.$store.dispatch(`${this.moduleName}/resetData`, true)
    }
  }
}
</script>

<style lang="scss" scoped></style>
