<template>
  <div class="pb-1">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'Errors',
  middleware: ['mode', 'lang', 'authentication']
}
</script>

<style lang="scss">
</style>
