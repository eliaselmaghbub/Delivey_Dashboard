<template>
  <div class="pt-2">
    <b-card class="position-relative">
      <div class="title">
        <h2 class="fs-5 text-white font-bold mb-0 p-1">{{ title }}</h2>
      </div>
      <b-card-body class="mt-2">
        <slot />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: absolute;
  border-color: #54a0ff !important;
  background-color: #54a0ff !important;
  color: #fff !important;
  border-radius: 0.3rem;
  top: -20px;
}
</style>
