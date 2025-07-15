<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <input
      v-model="code"
      class="verification-code-input"
      type="text"
      maxlength="6"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<script>
export default {
  name: 'VerificationCodeInput',
  data() {
    return {
      code: ''
    }
  },
  methods: {
    handleKeyDown(event) {
      const key = event.key
      // Allow only numeric keys
      if (!/\d/.test(key)) {
        event.preventDefault()
        return
      }
      // Move to the next input field when a key is pressed
      if (this.code.length === 5 && key !== 'Backspace') {
        this.$refs.lastInput.focus()
      }
    }
  }
}
</script>
