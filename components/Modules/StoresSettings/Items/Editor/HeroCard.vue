<template>
  <WrapTheCard title="الأصناف">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            class="input-append"
            label="رمز الباركود"
            store-key="barcode"
            :module-name="moduleName"
            :append="true"
            lg="4"
          >
            <template #append>
              <b-button
                variant="primary"
                @click="generateBarcode"
              >
                تكوين

                <b-spinner
                  v-if="loading"
                  class="me-2"
                  small
                />
              </b-button>
            </template>
          </FormFInput>

          <FormFInput
            label="اسم الصنف"
            store-key="name"
            :module-name="moduleName"
            required
            lg="4"
          />

          <FormFVSelect
            label="التصنيف الرئيسي"
            store-key="categoryId"
            list-key="categoriesList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            required
            change
            lg="4"
          />

          <FormFVSelect
            label="التصنيف الفرعي"
            store-key="subCategoryId"
            list-key="subCategoriesList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            change
            lg="4"
          />

          <FormFVSelect
            label="التصنيف التحليلي"
            store-key="analyticalCategoryId"
            list-key="analyticalCategoryList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
            change
          />

          <FormFInput
            label="رقم الصنف"
            store-key="number"
            :module-name="moduleName"
            disabled
            lg="4"
          />

          <FormFVSelect
            label="وحدة الفرد"
            store-key="singleUnitsId"
            list-key="unitsList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            required
            lg="4"
            change
          />

          <FormFVSelect
            label="وحدة المجموعة"
            store-key="groupUnitsId"
            list-key="unitsList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
            change
          />

          <FormFInput
            label="الكمية فى المجموعة"
            store-key="quantityInGroup"
            :module-name="moduleName"
            :disabled="!fields.groupUnitsId"
            lg="4"
          />

          <FormFInput
            label="أقل كمية"
            store-key="minimumQuantity"
            :module-name="moduleName"
            lg="4"
          />

          <!-- <FormFInput
            label="أكبر كمية"
            store-key="maximumQuantity"
            :module-name="moduleName"
            lg="4"
          /> -->

          <FormFInput
            label="كمية الطلب"
            store-key="orderQuantity"
            :module-name="moduleName"
            lg="4"
          />
          <FormFInput
            label="المواصفات"
            store-key="features"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="تفعيل"
            store-key="isActive"
            :module-name="moduleName"
            lg="4"
          />

          <FormFSwitcher
            label="له تاريخ صلاحية ؟"
            store-key="haveExpireDate"
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
      loading: false
    }
  },

  computed: {
    fields() {
      return this.$store.getters[`${this.moduleName}/fields`]
    }
  },
  methods: {
    async generateBarcode() {
      this.loading = true
      await this.$store.dispatch(`${this.moduleName}/generateBarcode`)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
