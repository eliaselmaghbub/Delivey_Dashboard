<!-- eslint-disable vue/no-template-shadow -->
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
      <b-input-group class="d-flex flex-nowrap">
        <v-select
          v-model="fieldValue"
          class="w-100"
          dir="rtl"
          :reduce="item => (notId ? item : item[valueSelect])"
          :label="labelSelect"
          :multiple="multiple"
          :clearable="clearable"
          :options="listKey ? getAutoList : allData"
          :disabled="disabled"
          :placeholder="placeholder"
          :loading="loading"
          @search="searchData($event)"
          @input="changeData($event)"
        >
          <template
            v-if="imgAvatar || colorAvatar"
            #option="{ color, image }"
          >
            <span v-if="color">
              <b-avatar
                size="20"
                :style="{
                  backgroundColor: color,
                  color: color
                }"
              />
              <span class="ml-2">{{ color }}</span>
            </span>
            <b-avatar
              v-if="image"
              size="60"
              :src="`${$config.NODE_URL_images}/${storeKey}/${image}`"
            />
          </template>

          <template #spinner="{ loading }">
            <div
              v-if="loading"
              style="border-left-color: rgba(88, 151, 251, 0.71)"
              class="vs__spinner"
            >
              The .vs__spinner class will hide the text for me.
            </div>
          </template>
        </v-select>
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
    labelSelect: {
      type: String,
      default: 'name'
    },
    valueSelect: {
      type: String,
      default: 'id'
    },
    storeKey: {
      type: String,
      default: null
    },
    allData: {
      type: Array,
      default: null
    },
    moduleName: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    listKey: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'غير محدد'
    },
    imgAvatar: {
      type: Boolean,
      default: false
    },
    colorAvatar: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    global: {
      type: Boolean,
      default: false
    },
    change: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    notId: {
      type: Boolean,
      default: false
    },
    xl: {
      type: String,
      default: '3'
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
      loading: false
    }
  },
  computed: {
    fieldValue: {
      get: function () {
        const fields = this.$store.getters[`${this.moduleName}/fields`]
        return fields[this.storeKey]
      },
      set(val) {
        this.$store.commit(`${this.moduleName}/setFieldValue`, {
          key: this.storeKey,
          value: val
        })
      }
    },
    getAutoList() {
      if (this.global) {
        const data = this.$store.getters['global/lists']
        return data[this.listKey]
      } else {
        const lists = this.$store.getters[`${this.moduleName}/lists`]
        return lists[this.listKey]
      }
    },
    currentId() {
      return this.$route.params.slug
    }
  },
  methods: {
    async changeData(data) {
      this.loading = true

      if (this.change) {
        await this.$store.dispatch(
          `${this.moduleName}/${this.storeKey}Change`,
          { data, id: this.currentId }
        )
      }

      this.loading = false
    },
    async searchData(data) {
      this.loading = true

      if (this.search) {
        await this.$store.dispatch(
          `${this.moduleName}/${this.storeKey}Search`,
          data
        )
      }

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
