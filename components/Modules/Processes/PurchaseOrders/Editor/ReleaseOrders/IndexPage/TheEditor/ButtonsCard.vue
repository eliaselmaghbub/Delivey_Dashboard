<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
      <b-button
        variant="success"
        class="btn-w"
        :disabled="!display.id || display.isConfirmed || loadingConfirm"
        @click="confirm"
      >
        اعتماد
        <b-spinner
          v-if="loadingConfirm"
          class="me-2"
          small
        />
      </b-button>
      <b-button
        variant="success"
        class="btn-w"
        :disabled="!display.id || !display.isConfirmed || loadingUnConfirm"
      >
        إلغاء الاعتماد
        <b-spinner
          v-if="loadingUnConfirm"
          class="me-2"
          small
        />
      </b-button>
      <b-button
        variant="primary"
        class="btn-w"
        :disabled="loading"
        @click="save"
      >
        حفظ
        <b-spinner
          v-if="loading"
          class="me-2"
          small
        />
      </b-button>
      <b-button
        variant="primary"
        class="btn-w"
        @click="back"
      >
        عودة للقائمة
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
    return {
      loading: false,
      loadingConfirm: false,
      loadingUnConfirm: false
    }
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
    async save() {
      this.loading = await true
      const result = await this.$store.dispatch(
        `${this.moduleName}/addToDB`,
        this.currentId
      )
      this.loading = await false

      if (result) {
        await this.back()
      }
    },
    async confirm() {
      this.loadingConfirm = await true
      await this.$store.dispatch(`${this.moduleName}/confirm`)
      this.loadingConfirm = await false
    },
    async unConfirm() {
      this.loadingUnConfirm = await true
      await this.$store.dispatch(`${this.moduleName}/unConfirm`)
      this.loadingUnConfirm = await false
    },
    async back() {
      const url = 'modules/processes/materialRequests/editor/releaseOrders'

      await this.$store.commit(`${url}/setDisplayValue`, {
        key: 'isEditor',
        value: false
      })

      this.$store.commit(`${url}/editor/setDisplayValue`, {
        key: 'id',
        value: null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
