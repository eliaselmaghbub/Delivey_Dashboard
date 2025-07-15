<template>
  <b-card>
    <b-row class="justify-content-center align-items-center row-buttons">
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
        to="/administrative/employees/new"
        @click="reset"
      >
        جديد
      </b-button>

      <b-button
        v-b-modal.modal-1
        variant="primary"
        class="btn-w"
      >
        ارفاق صورة شخصية
      </b-button>

      <b-modal
        id="modal-1"
        title="ارفاق صورة شخصية"
        ok-title="نعم"
        ok-only
      >
        <b-row>
          <FormFFile
            store-key="image"
            :module-name="moduleName"
            lg="12"
          />
        </b-row>
      </b-modal>

      <b-button
        variant="primary"
        class="btn-w"
        to="/administrative/employees"
      >
        عودة للقائمة
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
      loading: false
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
      if (this.currentId) {
        await this.$store.dispatch(
          `${this.moduleName}/updateInDB`,
          this.currentId
        )
      } else {
        await this.$store.dispatch(`${this.moduleName}/addToDB`)
      }
      this.loading = await false
    },
    reset() {
      this.$store.dispatch(`${this.moduleName}/resetData`)
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      // files[0].size
      if (!files.length) {
        const schema = {
          name: files[0].name,
          file: files[0],
          id: Math.random(),
          size: files[0].size
        }

        this.files = []
        this.files.unshift(schema)
        this.PersonalPicture = 'تمت الإضافة'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
