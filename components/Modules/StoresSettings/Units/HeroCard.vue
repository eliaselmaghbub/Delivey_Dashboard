<template>
  <WrapTheCard title="الوحدات">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="الاسم"
            store-key="name"
            :module-name="moduleName"
            lg="6"
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
