<template>
  <li class="nav-item b-nav-dropdown dropdown dropdown-user">
    <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
    >
      <template #button-content>
        <div class="d-sm-flex d-none user-nav align-items-start">
          <p class="user-name font-weight-bolder fs-5 mb-0">
            {{ $auth.user.loginName || appTitle }}
          </p>
          <!-- <span class="user-status">
            {{ $auth.user.name || $t('admin') }}
          </span> -->
        </div>
        <b-avatar
          size="40"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
        />
      </template>

      <!-- <ExtendedBDropdownItem route="/settings" icon="user" title="الحساب الشخصي" /> -->

      <b-dropdown-divider />

      <b-dropdown-item
        link-class="d-flex align-items-center"
        @click="logout"
      >
        <UtilsTheFIcon icon="log-out" />
        <span class="fs-5 ml-1">{{ $t('logout') }}</span>
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </li>
</template>

<script>
export default {
  computed: {
    appTitle() {
      return process.env.APP_TITLE
    },
    logo() {
      return `/${process.env.LOGO}`
    },
    userImage() {
      return `${process.env.IMG_PATH}/users/${this.$auth.user.photo}`
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
