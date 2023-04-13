<template>
  <div class="app-calendar overflow-hidden border">
    <div class="row no-gutters">
      <!-- Sidebar -->
      <div
        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
      >
        <!-- <calendar-sidebar :is-event-handler-sidebar-active.sync="isEventHandlerSidebarActive" /> -->
      </div>

      <!-- Calendar -->
      <div class="col position-relative">
        <div class="card shadow-none border-0 mb-0 rounded-0">
          <div class="card-body pb-0">
            <b-row>
              <b-col cols="12">
                <div class="d-flex align-items-center">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-small">Small:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input
                        id="input-small"
                        placeholder="Enter your name"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <invoice-list />
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <!-- Sidebar Overlay -->
      <!-- <div
        class="body-content-overlay"
        :class="{ show: isCalendarOverlaySidebarActive }"
        @click="isCalendarOverlaySidebarActive = false"
      />
       <calendar-event-handler
        v-model="isEventHandlerSidebarActive"
        :event="event"
        :clear-event-data="clearEventData"
        @remove-event="removeEvent"
        @add-event="addEvent"
        @update-event="updateEvent"
      /> -->
    </div>
  </div>
</template>

<script>
import InvoiceList from "@/views/apps/invoice/invoice-list/InvoiceList.vue";
import { BRow, BCol, BFormInput } from "bootstrap-vue";
// import FullCalendar from "@fullcalendar/vue";
import store from "@/store";
import { onUnmounted } from "@vue/composition-api";
// import calendarStoreModule from './calendarStoreModule'
// import CalendarSidebar from './calendar-sidebar/CalendarSidebar.vue'
// import CalendarEventHandler from './calendar-event-handler/CalendarEventHandler.vue'
// import useCalendar from './useCalendar'

export default {
  components: {
    // make the <FullCalendar> tag available
    // CalendarSidebar,
    // CalendarEventHandler,
    BRow,
    BCol,
    BFormInput,
    InvoiceList,
  },
  setup() {
    const CALENDAR_APP_STORE_MODULE_NAME = "calendar";

    // Register module
    // if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CALENDAR_APP_STORE_MODULE_NAME))
        store.unregisterModule(CALENDAR_APP_STORE_MODULE_NAME);
    });

    // const {
    //   refCalendar,
    //   isCalendarOverlaySidebarActive,
    //   event,
    //   clearEventData,
    //   addEvent,
    //   updateEvent,
    //   removeEvent,
    //   fetchEvents,
    //   refetchEvents,
    //   calendarOptions,

    //   // ----- UI ----- //
    //   isEventHandlerSidebarActive,
    // } = useCalendar()

    // fetchEvents()

    // return {
    //   refCalendar,
    //   isCalendarOverlaySidebarActive,
    //   event,
    //   clearEventData,
    //   addEvent,
    //   updateEvent,
    //   removeEvent,
    //   refetchEvents,
    //   calendarOptions,

    //   // ----- UI ----- //
    //   isEventHandlerSidebarActive,
    // }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>
