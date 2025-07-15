<template>
  <WrapTheCard title=" الأصناف المطلوبة">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            v-if="!fields.item"
            label="الأصناف"
            store-key="singelItemId"
            list-key="itemsList"
            :module-name="moduleName"
            required
            lg="4"
            change
          />

          <FormFInput
            v-if="!fields.singelItemId"
            label="اسم الصنف"
            store-key="item"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="المواصفات"
            store-key="features"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="الكمية"
            store-key="quantity"
            :module-name="moduleName"
            required
            type="number"
            lg="4"
          />

          <FormFVSelect
            label="الوحدات"
            store-key="unitId"
            list-key="unitList"
            :module-name="moduleName"
            required
            lg="4"
          />

          <FormFInput
            label="ملاحظات"
            store-key="note"
            :module-name="moduleName"
            lg="4"
          />
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

        <ModulesProcessesMaterialRequestsEditorTheTable
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
          key: 'itemName',
          label: 'الصنف'
        },
        {
          key: 'features',
          label: 'المواصفات'
        },
        {
          key: 'quantity',
          label: 'الكمية'
        },
        {
          key: 'unit',
          label: 'الوحدة'
        },
        {
          key: 'note',
          label: 'ملاحظات'
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
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    }
  },
  methods: {
    add() {
      this.$store.dispatch(`${this.moduleName}/addToLocalTable`)
    },
    reset() {
      this.$store.dispatch(`${this.moduleName}/emptyDetails`, true)
    }
  }
}
</script>

<style lang="scss" scoped></style>
