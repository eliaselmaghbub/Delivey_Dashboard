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
          type="text"
          class="form-control"
          :raw="false"
          :options="number"
          :disabled="disabled"
          @input="formatInput"
        />
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
    disabled: {
      type: Boolean,
      default: false
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
  data() {
    return {
      number: {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
      }
    }
  },
  computed: {
    fieldValue: {
      get() {
        const fields = this.$store.getters[`${this.moduleName}/fields`]

        const val = fields[this.storeKey]
        return val?.toLocaleString()
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
    formatInput() {
      // Remove non-numeric characters from the input value

      if (this.fieldValue === '') {
        return
      }

      const numericValue = this.fieldValue?.replace(/[^0-9.]/g, '')

      // Convert the numeric value to a number
      const numberValue = Number(numericValue)

      const formattedValue = Number(numberValue.toFixed(3)).toLocaleString()

      // Update the input value with the formatted value
      this.fieldValue = formattedValue
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
