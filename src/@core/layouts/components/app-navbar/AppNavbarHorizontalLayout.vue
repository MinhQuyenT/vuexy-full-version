<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <!-- <bookmarks /> -->
      <div class="content-wrapper clearfix" :class="'container p-0'" style="display: block!important;">
        <slot name="breadcrumb">
          <app-breadcrumb />
        </slot>
      </div>
    </div>

    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale />
      <dark-Toggler class="d-none d-lg-block" />
      <search-bar />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav,
} from 'bootstrap-vue'
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
import SearchBar from './components/SearchBar.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    Bookmarks,
    Locale,
    DarkToggler,
    SearchBar,
    UserDropdown,
    AppBreadcrumb
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },

}
</script>
