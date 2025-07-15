<template>
  <WrapTheCard title="الزباين">
    <b-card no-body>
      <b-card-body>
        <b-row>
          <FormFInput
            label="اسم الزبون"
            store-key="name"
            :module-name="moduleName"
            lg="4"
            disabled
          />

          <FormFVSelect
            label="حالة المستخدم"
            store-key="activateStateId"
            list-key="activateState"
            :module-name="moduleName"
            lg="4"
          />
          <!-- <FormFSwitcher
            label="نشط"
            store-key="activateState"
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
  },

  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
