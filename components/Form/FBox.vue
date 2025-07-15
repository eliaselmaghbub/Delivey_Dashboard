<template>
  <b-col
    :lg="lg"
    :md="md"
    :sm="sm"
    class="me-3"
  >
    <b-form-group class="box-cont">
      <b-form-checkbox
        v-model="fieldValue"
        class="box"
        :class="{ 'custom-font': fontSize }"
        :disabled="disabled"
        @change="changeData($event)"
      >
        {{ label }}
      </b-form-checkbox>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    moduleName: {
      type: String,
      default: null
    },
    storeKey: {
      type: String,
      default: null
    },
    fontSize: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lg: {
      type: [String, Number],
      default: '2'
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
        const fields = this.$store.getters[`${this.moduleName}/fields`]
        return fields[this.storeKey]
      },
      set(val) {
        this.$store.commit(`${this.moduleName}/setFieldValue`, {
          key: this.storeKey,
          value: val
        })
      }
    }
  },
  methods: {
    changeData(data) {
      this.$store.dispatch(`${this.moduleName}/boxChange`, {
        data,
        key: this.storeKey
      })
    }
  }
}
</script>

<style lang="scss">
.box-cont {
  width: 100px;
  .box {
    width: 100%;
    .custom-control-label {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
