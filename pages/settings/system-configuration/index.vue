<template>
  <div>
    <b-card no-body>
      <b-tabs
        pills
        card
        class="system-tabs"
        align="center"
      >
        <b-tab
          title="الإعدادات"
          active
        >
          <ModulesSettingsConfigurationIndexPage />
        </b-tab>
        <b-tab title="بيانات الجهة">
          <ModulesSettingsCompanyInfoIndexPage />
        </b-tab>
        <b-tab title="حول النظام">
          <ModulesSettingsSystemInfoIndexPage />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'SystemConfiguration',

  async asyncData({ $axios, store }) {
    const settingsModule = 'modules/settings/systemConfiguration'
    const { data } = await $axios.$get('/setting')
    await store.dispatch(`${settingsModule}/showData`, data)

    const companyInfoModule = 'modules/settings/companyInfo'
    const companyInfo = await $axios.$get('/company-info')
    store.dispatch(`${companyInfoModule}/showData`, companyInfo.data)
  },
  head() {
    return {
      title: 'إعدادات النظام'
    }
  }
}
</script>

<style lang="scss">
.system-tabs {
  .nav-pills {
    width: 100%;
  }
}
</style>
