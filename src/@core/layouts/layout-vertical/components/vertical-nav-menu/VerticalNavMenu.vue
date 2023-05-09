<template>
  <div class="main-menu menu-fixed menu-accordion menu-shadow" :class="[
    { 'expanded': !isVerticalMenuCollapsed || (isVerticalMenuCollapsed && isMouseHovered) },
    skin === 'semi-dark' ? 'menu-dark' : 'menu-light'
  ]" @mouseenter="updateMouseHovered(true)" @mouseleave="updateMouseHovered(false)">
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot name="header" :toggleVerticalMenuActive="toggleVerticalMenuActive" :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon">
        <ul class="nav navbar-nav flex-row">

          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link class="navbar-brand" to="/">
              <span class="brand-logo">
                <b-img :src="appLogoImage" alt="logo" />
              </span>
              <h2 class="brand-text">
                {{ appName }}
              </h2>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon icon="XIcon" size="20" class="d-block d-xl-none" @click="toggleVerticalMenuActive" />
              <feather-icon :icon="collapseTogglerIconFeather" size="20" class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed" />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />

    <!-- main menu content-->
    <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="main-menu-content scroll-area" tagname="ul"
      @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }">
      <vertical-nav-menu-items :items="roleMenu" class="navigation navigation-main" />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import navMenuItems from '@/navigation/vertical'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BLink, BImg } from 'bootstrap-vue'
import { provide, computed, ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import { $themeConfig } from '@themeConfig'
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import useVerticalNavMenu from './useVerticalNavMenu'
import ItemTimekeepingMoth from '@/views/timekeeping/timekeeping-month/ItemTimekeepingMoth.vue'

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    // console.log(navMenuItems);
  },
  methods: {

  },

  setup(props) {
    let roleMenu = []
    let userRoles = JSON.parse(localStorage.getItem('userData'))?.role;

    if (userRoles[0] !== "*:*:*") {
      const dashboardIndex = userRoles.findIndex(x => x.split(':')[0] === 'dashboard');

      if (dashboardIndex !== -1) {
        const dashboardData = userRoles.splice(dashboardIndex, 1);
        userRoles.unshift(dashboardData[0]);
      }

      const navHeaders = ['dashboard', ...navMenuItems.filter(x => !!x.header).map(x => x.header)];
      const headers = userRoles.map(x => x.split(':')[0]).filter((v, i, a) => a.indexOf(v) === i).filter((v) => navHeaders.includes(v));

      headers.forEach(headerItem => {
        let roleMenuItem = [];
        const checkHeader = navMenuItems.find(x => x.header === headerItem)

        if (checkHeader) {
          roleMenuItem.push({ header: headerItem });
        }

        userRoles.forEach(roleItem => {
          const header = roleItem.split(':')[0];
          const route = roleItem.split(':')[1];
          const routeData = navMenuItems.find(x => x.route === route);
          if (headerItem === header && routeData) {
            roleMenuItem.push({ ...routeData });
          }
        });
        roleMenuItem =  roleMenuItem.filter((v, i, a) => a.findLastIndex(v2=>(v2.route === v.route))===i)
        roleMenu.push(roleMenuItem);
      })
      roleMenu = roleMenu.flat();
    } else {
      navMenuItems.forEach(v => {
        roleMenu.push(v)
      })
    }
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props)

    const { skin } = useAppConfig()

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    const collapseTogglerIconFeather = computed(() => (collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon'))

    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    return {
      roleMenu,
      navMenuItems,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";
</style>
