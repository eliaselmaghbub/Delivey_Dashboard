<template>
  <WrapTheCard title="ارسال الطلبية مع المندوب المحدد ">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFVSelect
            label="المندوب"
            store-key="representativeId"
            list-key="RepresentativesList"
            :module-name="moduleName"
            label-select="userName"
            value-select="userId"
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
