<template>
  <WrapTheCard title="أنشطة المستخدمين">
    <b-card
      no-body
      class="card-statistics"
    >
      <b-card-body class="statistics-body">
        <b-row>
          <FormFDate
            label="من تاريخ"
            store-key="from"
            :module-name="moduleName"
          />
          <FormFDate
            label="إلي تاريخ"
            store-key="to"
            :module-name="moduleName"
          />
          <FormFVSelect
            label="المستخدم"
            store-key="userId"
            list-key="usersList"
            :module-name="moduleName"
            label-select="value"
            value-select="key"
          />
          <FormFVSelect
            label="نوع العملية"
            store-key="action"
            list-key="actionList"
            :module-name="moduleName"
          />
          <FormFVSelect
            label="ترتيب الأحداث"
            store-key="sortType"
            list-key="sortTypeList"
            :module-name="moduleName"
          />
          <FormFVSelect
            not-id
            label="واجهة"
            store-key="type"
            list-key="typeList"
            :module-name="moduleName"
          />
        </b-row>
      </b-card-body>
    </b-card>
  </WrapTheCard>
</template>

<script>
export default {
  props: {
    moduleName: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
