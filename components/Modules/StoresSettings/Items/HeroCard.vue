<template>
  <WrapTheCard title="الأصناف">
    <b-card no-body>
      <b-card-header>
        <!-- <b-card-title class="text-primary fw-bold fs-4">البحث</b-card-title> -->
      </b-card-header>

      <b-card-body>
        <b-row>
          <FormFInput
            label="رمز الباركود"
            store-key="barcode"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="اسم الصنف"
            store-key="name"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="التصنيف"
            store-key="categoryId"
            list-key="categoriesList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
            lg="4"
          />

          <FormFInput
            label="رقم الصنف"
            store-key="number"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="ترتيب حسب"
            store-key="sortBy"
            list-key="sortByList"
            :module-name="moduleName"
            :clearable="false"
            lg="4"
          />

          <FormFVSelect
            label="طريقة الترتيب"
            store-key="sortType"
            list-key="sortTypeList"
            :module-name="moduleName"
            :clearable="false"
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
  }
}
</script>

<style lang="scss" scoped></style>
