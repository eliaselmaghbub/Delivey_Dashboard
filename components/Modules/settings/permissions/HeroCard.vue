<template>
  <WrapTheCard title="الصلاحيات">
    <b-card
      no-body
      class="card-statistics"
    >
      <b-card-body class="statistics-body">
        <b-row>
          <FormFInput
            label="إسم المجموعة"
            store-key="name"
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
