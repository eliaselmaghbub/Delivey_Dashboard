<template>
  <WrapTheCard title="المشتريات">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="رقم طلب الشراء"
            store-key="number"
            :module-name="moduleName"
          />

          <FormFInput
            label="رقم أمر التكليف"
            store-key="commissioningOrderNumber"
            :module-name="moduleName"
          />

          <FormFVSelect
            label="الموردين"
            store-key="supplierId"
            list-key="suppliersList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
          />

          <FormFVSelect
            label="الموظف"
            store-key="preparedById"
            list-key="employeesList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
          />

          <FormFVSelect
            label="حالة طلب الشراء"
            store-key="state"
            list-key="stateList"
            :module-name="moduleName"
          />

          <FormFVSelect
            label="حالة الاستلام"
            store-key="deliveryState"
            list-key="deliveryStateList"
            :module-name="moduleName"
          />

          <FormFVSelect
            label="حالة المستند"
            store-key="isClosed"
            list-key="isClosedList"
            :module-name="moduleName"
          />

          <FormFDate
            label="من التاريخ"
            store-key="dateFrom"
            :module-name="moduleName"
          />

          <FormFDate
            label="إلي التاريخ"
            store-key="dateTo"
            :module-name="moduleName"
          />
          <FormFInput
            label="البيان"
            store-key="statement"
            :module-name="moduleName"
            lg="9"
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
