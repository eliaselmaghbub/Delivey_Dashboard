<template>
  <WrapTheCard title="المناطق">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم المنطقة"
            store-key="name"
            :module-name="moduleName"
            lg="4"
          />

          <!-- <FormFSwitcher
            label="فرع رئيسي"
            store-key="isMajor"
            :module-name="moduleName"
            ok="نعم"
            no="لا"
          /> -->
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
