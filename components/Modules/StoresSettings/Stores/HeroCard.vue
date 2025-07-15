<template>
  <WrapTheCard title="المخازن">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم المخزن"
            store-key="name"
            :module-name="moduleName"
          />

          <FormFInput
            label="العنوان"
            store-key="address"
            :module-name="moduleName"
          />

          <FormFInput
            label="رقم النقال"
            store-key="mobile"
            :module-name="moduleName"
          />

          <FormFInput
            label="رقم الهاتف"
            store-key="phone"
            :module-name="moduleName"
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
