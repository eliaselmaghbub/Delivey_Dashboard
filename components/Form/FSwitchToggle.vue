<template>
  <b-col
    :lg="lg"
    :md="md"
    :sm="sm"
    class="switch d-flex align-items-center justify-content-center mt-1"
  >
    <b-form-checkbox
      v-model="fieldValue"
      checked="false"
      name="check-button"
      switch
      inline
    >
      {{ label }}
    </b-form-checkbox>
  </b-col>
</template>

<script>
export default {
  props: {
    storeKey: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    moduleName: {
      type: String,
      default: null
    },
    lg: {
      type: String,
      default: '3'
    },
    md: {
      type: String,
      default: '6'
    },
    sm: {
      type: String,
      default: '12'
    }
  },
  computed: {
    fieldValue: {
      get() {
        return this.$store.getters[`${this.moduleName}/toggle`]
      },
      set(val) {
        this.$store.commit(`${this.moduleName}/toggle`, {
          key: this.storeKey,
          value: val
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  height: 38px;
}
</style>
