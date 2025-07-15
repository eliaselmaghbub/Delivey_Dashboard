<template>
  <b-card
    no-body
    class="card-statistics"
  >
    <b-card-body class="statistics-body">
      <b-row
        v-for="(type, i) in lists.typeList"
        :key="i"
        class="py-2"
        :class="{ 'bg-bg-secondary': i % 2 == 0 }"
      >
        <b-col
          class="d-flex"
          cols="2"
        >
          <p class="m-0 fs-5">{{ type.title }} :</p>
        </b-col>
        <b-row class="col-8">
          <FormFBox
            v-for="(box, x) in type.permissions"
            :key="x"
            :label="lists.permissionList[box]"
            :store-key="`${type.type}_${box}`"
            :module-name="moduleName"
          />
        </b-row>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    moduleName: {
      type: String,
      default: null
    }
  },
  computed: {
    display() {
      return this.$store.getters[`${this.moduleName}/display`]
    },
    lists() {
      return this.$store.getters[`${this.moduleName}/lists`]
    }
  }
}
</script>

<style lang="scss" scoped></style>
