<template>
  <div>
    <ModulesSettingsPermissionsHeroCard :module-name="moduleName" />
    <ModulesSettingsPermissionsButtonsCard :module-name="moduleName" />
    <ModulesSettingsPermissionsTheTable
      :headers="headers"
      :module-name="moduleName"
    />

    <ModulesSettingsPermissionsPermissionCard
      v-if="refreshCard"
      :module-name="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'Permissions',

  async asyncData({ $axios, store }) {
    const moduleName = 'modules/settings/permissions'
    store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get('/userGroups')
    await store.dispatch(`${moduleName}/getAllDataFromApi`, data)
    return {
      moduleName
    }
  },
  data() {
    return {
      refreshCard: true,
      headers: [
        {
          key: 'name',
          label: 'إسم المجموعة',
          sortable: true
        },
        {
          key: 'actions',
          label: 'إجراءات',
          sortable: true
        }
      ]
    }
  },
  head() {
    return {
      title: 'الصلاحيات'
    }
  },
  computed: {
    lists() {
      return this.$store.getters[`${this.moduleName}/lists`]
    }
  },

  watch: {
    lists: {
      deep: true,
      async handler(newValue, oldValue) {
        this.refreshCard = false
        await this.$nextTick()
        this.refreshCard = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
