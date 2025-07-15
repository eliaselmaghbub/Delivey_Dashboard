<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
      <b-button
        variant="primary"
        class="btn-w"
        :disabled="display.tabLoading"
        @click="change"
      >
        جديد
      </b-button>
    </b-row>
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
  data() {
    return {}
  },
  computed: {
    display() {
      return this.$store.getters[`${this.moduleName}/display`]
    },
    currentId() {
      return this.$route.params.slug
    }
  },
  methods: {
    change() {
      this.$store.commit(`${this.moduleName}/setDisplayValue`, {
        key: 'isEditor',
        value: true
      })
      this.$store.commit(`${this.moduleName}/setDisplayValue`, {
        key: 'tabLoading',
        value: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
