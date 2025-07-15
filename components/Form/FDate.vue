<template>
  <b-col
    :lg="lg"
    :md="md"
    :sm="sm"
    class="date-picker-form"
  >
    <b-form-group
      :class="{ 'required-label': required }"
      :label="label"
    >
      <b-input-group>
        <Datepicker
          v-model="fieldValue"
          class="datepicker-input"
          placeholder="YYYY-MM-DD"
          :disabled="disabled"
          type="date"
          clear-button
          :format="format"
          @input="changeData($event)"
        />
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    moduleName: {
      type: String,
      default: null
    },
    storeKey: {
      type: String,
      default: null
    },
    label: {
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
    moment: {
      type: Boolean,
      default: false
    },
    change: {
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
      format: 'yyyy-MM-dd'
    }
  },
  computed: {
    fieldValue: {
      get() {
        const fields = this.$store.getters[`${this.moduleName}/fields`]
        const value = fields[this.storeKey]
        return this.moment ? this.$moment(value).format('YYYY-MM-DD') : value
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

<style lang="scss">
.date-picker-form {
  .form-control {
    flex-direction: row-reverse;
    text-align: right;
  }
  .vdp-datepicker {
    position: relative;
    &__clear-button {
      position: absolute;
      left: 10px;
      font-size: 25px;
    }
  }
}
</style>
