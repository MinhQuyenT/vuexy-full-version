
<template>
  <div class="app-calendar  border">
    <div class="row no-gutters" style="min-height: 790px;">
      <!-- Sidebar -->
      <div class="col app-calendar-sidebar flex-grow-0 d-flex flex-column" style="border-right: 1px solid #ebe9f1; background-color: unset">
        <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
          <div class="card shadow-none border-0 mb-0 rounded-0" style="border-bottom:1px solid #ebe9f1!important ;" >
          <div class="card-body pb-0">
            <div class="d-flex align-content-center justify-content-between w-100" >
              Department
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Calendar -->
      <div class="col position-relative" >
        <div class="card shadow-none border-0 mb-0 rounded-0" style="border-bottom:1px solid #ebe9f1!important ;" >
          <div class="card-body pb-0">
            <div class="d-flex align-content-center justify-content-between w-100" >
             Data Right
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataSearch',
  created() {

  },
  data() {
    return {
    }
  },
  props: {

  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/apps/calendar.scss";
</style>

