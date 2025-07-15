<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow menu-light"
    :class="{
      expanded: makeLayoutCollapsed || true,
      expanded: hover
    }"
    @mouseenter="hoverSidebar"
    @mouseleave="hoverSidebar"
  >
    <div class="navbar-header expanded w-100 d-flex align-items-center pl-1">
      <ul class="nav navbar-nav flex-row w-100">
        <!-- <nuxt-link to="/">
          <div class="auth-login">
            <b-img
              :src="logo"
              alt="logo"
              class="auth-logo"
            />
            <h2 class="brand-text text-primary mb-0">
              {{ appTitle }}
            </h2>
          </div>
        </nuxt-link> -->
      </ul>
    </div>
    <div class="shadow-bottom" />
    <div
      class="ps-container main-menu-content scroll-area ps ps--active-y mt-2"
    >
      <ul class="navigation navigation-main">
        <ExtendedBSLink
          :title="$t(`dashboard`)"
          icon="home"
          route="/"
        />
      </ul>
      <ul class="navigation navigation-main">
        <ExtendedBSLinks
          page="الطلبيات"
          icon="box"
          :child-routes="mainOrderChild"
        />
      </ul>
      <ul class="navigation navigation-main">
        <ExtendedBSLink
          title="المناطق"
          icon="git-branch"
          route="/branchs"
        />
      </ul>
      <ul class="navigation navigation-main">
        <ExtendedBSLink
          title="المدن"
          icon="map-pin"
          route="/city"
        />
      </ul>

      <ul class="navigation navigation-main">
        <ExtendedBSLink
          title="الموظفين"
          icon="user"
          route="/users"
        />
      </ul>

      <ul class="navigation navigation-main">
        <ExtendedBSLink
          title="الزباين"
          icon="tablet"
          route="/customers"
        />
      </ul>

      <ul class="navigation navigation-main">
        <ExtendedBSLink
          title="المندوبين"
          icon="truck"
          route="/representativ"
        />
      </ul>

      <!-- <ul class="navigation navigation-main">
        <ExtendedBSLink
          title="الزباين"
          icon="users"
          route="/"
        />
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      mainOrderChild: [
        {
          name: 'قبول الطلبية',
          route: 'orders/Acceptance'
        },
        {
          name: 'ارسال الطلبية',
          route: 'orders/sendOrder'
        },
        {
          name: 'اغلاق الطلبية',
          route: 'orders/closeOrder'
        }
      ],
      hover: false,
      isOpen: false
    }
  },
  computed: {
    logoWidth() {
      return this.$store.getters.getLogoWidth
    },
    // appTitle() {
    //   return process.env.APP_TITLE
    // },
    logo() {
      return `/${process.env.LOGO}`
    }
  },

  methods: {
    hoverSidebar() {
      if (this.width > 1200) {
        this.hover = !this.hover

        if (!this.makeLayoutCollapsed) {
          this.$store.dispatch('logoWidth')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-login {
  display: flex;
  align-items: center;

  .auth-logo {
    width: 50px;
    height: 50px;
  }

  .brand-text {
    margin-top: 18px;
    font-size: 18px;
    font-weight: bold;
    margin-inline-start: 20px;
  }
}
</style>
