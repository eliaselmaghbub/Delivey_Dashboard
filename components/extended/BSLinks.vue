<!-- eslint-disable vue/no-v-html -->
<template>
  <li
    class="nav-item has-sub"
    :class="sub ? 'open' : ''"
  >
    <b-link
      class="d-flex align-items-center"
      @click.native="toggleSub"
    >
      <FAS
        :icon="`fa-solid fa-${icon}`"
        class="text-primary"
      />
      <span
        class="menu-title text-truncate"
        :title="page"
        v-text="page"
      />
    </b-link>
    <b-collapse
      v-model="sub"
      class="menu-content"
      tag="ul"
    >
      <li
        v-for="(child, i) in childRoutes"
        :key="i"
        class="nav-item"
        :class="{ active: $route.path == `/${child.route}` }"
      >
        <nuxt-link
          :to="`/${child.route}`"
          class="d-flex align-items-center"
        >
          <div
            class="text-primary circle-sidebar-icon"
            v-html="$feathericons['circle'].toSvg()"
          />
          <span
            class="menu-title text-truncate"
            :title="child.name"
            v-text="child.name"
          />
        </nuxt-link>
      </li>
    </b-collapse>
  </li>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    childRoutes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sub: false
    }
  },
  methods: {
    toggleSub() {
      this.sub = !this.sub
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
