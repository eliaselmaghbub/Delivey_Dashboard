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
        <ModulesProcessesPurchaseOrdersEditorHeroCard
          :module-name="moduleName"
        />
        <ModulesProcessesPurchaseOrdersEditorDetailsCard
          :module-name="moduleName"
        />

        <ModulesProcessesPurchaseOrdersEditorButtonsCard
          :module-name="moduleName"
        />
      </b-tab>
      <!-- <b-tab
        title="الحركات والاعتمادات"
        lazy
      >
        <ModulesProcessesPurchaseOrdersEditorMovementsIndexPage
          :module-name="moduleName"
        />
      </b-tab> -->
      <!-- <b-tab
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
        <ModulesProcessesPurchaseOrdersEditorReleaseOrdersIndexPageTheEditorCurrentPage
          v-if="releaseOrdersDisplay.isEditor"
          :module-name="`${moduleName}/releaseOrders/editor`"
        />
        <ModulesProcessesPurchaseOrdersEditorReleaseOrdersIndexPageTheIndex
          v-else
          :module-name="`${moduleName}/releaseOrders`"
        />
      </b-tab> -->
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'PurchaseOrdersEditor',
  async asyncData({ $axios, store, params }) {
    const moduleName = 'modules/processes/purchaseOrders/editor'
    await store.dispatch(`${moduleName}/resetData`)

    const { data } = await $axios.$get(`/purchase-orders/${params.slug}`)

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
    // releaseOrdersDisplay() {
    //   return this.$store.getters[`${this.moduleName}/releaseOrders/display`]
    // },
    currentId() {
      return this.$route.params.slug
    }
  },
  head() {
    return {
      title: 'المشتريات | جديد'
    }
  },
  watch: {
    // tabIndex(newValue, oldValue) {
    //   this.$store.commit(`${this.moduleName}/releaseOrders/setDisplayValue`, {
    //     key: 'isEditor',
    //     value: null
    //   })
    //   this.$store.commit(
    //     `${this.moduleName}/releaseOrders/editor/setDisplayValue`,
    //     {
    //       key: 'id',
    //       value: null
    //     }
    //   )
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
