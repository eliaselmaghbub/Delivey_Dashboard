<template>
  <WrapTheCard title="الموردين">
    <b-card no-body>
      <b-card-header>
        <!-- <b-card-title class="text-primary fw-bold fs-4">البحث</b-card-title> -->
      </b-card-header>

      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم المورد"
            store-key="fullName"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="العنوان"
            store-key="address"
            :module-name="moduleName"
            lg="4"
          />

          <FormFInput
            label="رقم الموبايل"
            store-key="phone"
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
