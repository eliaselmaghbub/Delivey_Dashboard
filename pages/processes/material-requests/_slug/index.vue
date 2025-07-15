<template>
  <div>
    <b-tabs
      v-model="tabIndex"
      content-class="mt-1"
    >
      <b-tab
        title="بيانات الطلب"
        lazy
      >
        <ModulesProcessesMaterialRequestsEditorHeroCard
          :module-name="moduleName"
        />
        <ModulesProcessesMaterialRequestsEditorDetailsCard
          :module-name="moduleName"
        />
        <ModulesProcessesMaterialRequestsEditorMovementCard
          :module-name="moduleName"
        />
        <ModulesProcessesMaterialRequestsEditorButtonsCard
          :module-name="moduleName"
        />
      </b-tab>
      <b-tab
        title="الحركات والاعتمادات"
        lazy
      >
        <ModulesProcessesMaterialRequestsEditorMovementsIndexPage
          :module-name="moduleName"
        />
      </b-tab>
      <b-tab
        title="أوامر الصرف"
        lazy
      >
        <template #title>
          <span>أوامر الصرف</span>
          <b-spinner
            v-if="releaseOrdersDisplay.tabLoading"
            class="ml-2"
            type="border"
            small
          ></b-spinner>
        </template>
        <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageTheEditorCurrentPage
          v-if="releaseOrdersDisplay.isEditor"
          :module-name="`${moduleName}/releaseOrders/editor`"
        />
        <ModulesProcessesMaterialRequestsEditorReleaseOrdersIndexPageTheIndex
          v-else
          :module-name="`${moduleName}/releaseOrders`"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'MaterialRequestsEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/processes/materialRequests/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/material-requests/${params.slug}`)

    await store.dispatch(`${moduleName}/showSingleData`, data)

    return {
      moduleName
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  computed: {
    releaseOrdersDisplay() {
      return this.$store.getters[`${this.moduleName}/releaseOrders/display`]
    },
    currentId() {
      return this.$route.params.slug
    }
  },
  head() {
    return {
      title: ' طلبات الأصناف | جديد'
    }
  },
  watch: {
    tabIndex(newValue, oldValue) {
      this.$store.commit(`${this.moduleName}/releaseOrders/setDisplayValue`, {
        key: 'isEditor',
        value: null
      })
      this.$store.commit(
        `${this.moduleName}/releaseOrders/editor/setDisplayValue`,
        {
          key: 'id',
          value: null
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
