<template>
  <b-col
    :lg="lg"
    :md="md"
    :sm="sm"
  >
    <b-form-group
      :class="{ 'required-label': required }"
      :label="label"
    >
      <b-input-group>
        <b-form-input
          v-model="fieldValue"
          :disabled="disabled"
          :type="type"
          :min="1"
          :max="10"
          @input="changeData($event)"
        />
        <b-input-group-append v-if="append">
          <slot name="append" />
        </b-input-group-append>
      </b-input-group>
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
    required: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    phoneCode: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    rules: {
      type: String,
      default: null
    },
    change: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lg: {
      type: [String, Number],
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

  data() {
    return {
      loading: true
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
      this.change &&
        this.$store.dispatch(`${this.moduleName}/${this.storeKey}Change`, data)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
