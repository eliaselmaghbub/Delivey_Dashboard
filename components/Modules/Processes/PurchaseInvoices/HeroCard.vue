<template>
  <WrapTheCard title="فواتير الشراء">
    <b-card no-body>
      <b-card-header>
        <!-- <b-card-title class="text-primary fw-bold fs-4">البحث</b-card-title> -->
      </b-card-header>

      <b-card-body>
        <b-row>
          <FormFInput
            label="الرقم التسلسلي"
            store-key="serialNumber"
            :module-name="moduleName"
            lg="4"
          />

          <FormFVSelect
            label="الموردين"
            store-key="supplierId"
            list-key="supplierList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
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
          />

          <FormFVSelect
            label="حالة الفاتورة"
            store-key="isConfirmed"
            list-key="isConfirmedList"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            label="من تاريخ"
            store-key="dateFrom"
            :module-name="moduleName"
            lg="4"
          />

          <FormFDate
            label="إلي تاريخ"
            store-key="dateTo"
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
  }
}
</script>

<style lang="scss" scoped></style>
