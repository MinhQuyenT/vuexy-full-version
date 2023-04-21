<template>
  <b-card-code title="Đồng Bộ Dữ Liệu" style="height: 95%;">
    <b-row>
      <!-- people group 1 -->
      <b-col md="5" class="border">
        <h6 class="text-primary text-center font-weight-bold mb-2 mt-2">
          ERP
        </h6>
        <!-- draggable -->
        <draggable :list="list1" tag="ul" group="people" class="list-group list-group-flush cursor-move ">
          <b-list-group-item v-for="(listItem, index) in list1" :key="index" tag="li">
            <div class="d-flex">
              <b-avatar :text="listItem.name.slice(0, 2)" />
              <div class="ml-25">
                <b-card-text class="mb-0 font-weight-bold">
                  {{ listItem.name }}
                </b-card-text>
                <small>{{ listItem.email }}</small>
              </div>
            </div>
          </b-list-group-item>
        </draggable>
      </b-col>

      <b-col md="2" class="mt-sm-2 mt-md-0" >
        <b-button style="margin-left: 25px; margin-top: 50%;" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="warning">
        <feather-icon icon="RefreshCcwIcon" class="mr-50" />
        <span class="align-middle">Đồng bộ dữ liệu</span>
      </b-button>
      </b-col>

      <!-- people group 2 -->
      <b-col md="5" class="mt-sm-2 mt-md-0 border">
        <h6 class="text-primary text-center font-weight-bold mb-2 mt-2">
          Jielink
        </h6>
        <!-- draggable -->
        <draggable :list="list2" tag="ul" group="people" class="list-group list-group-flush cursor-move">
          <b-list-group-item v-for="(listItem, index) in list2" :key="index" tag="li">
            <div class="d-flex">
              <b-avatar :text="listItem.name.slice(0, 2)" />
              <div class="ml-25">
                <b-card-text class="mb-0 font-weight-bold">
                  {{ listItem.name }}
                </b-card-text>
                <small>{{ listItem.email }}</small>
              </div>
            </div>
          </b-list-group-item>
        </draggable>
      </b-col>

      <!-- <b-col md="6" class="mt-1">
        <prism language="javascript" class="rounded">
          People Group 1: {{ list1 }}
        </prism>
      </b-col>

      <b-col md="6" class="mt-1">
        <prism language="javascript" class="rounded">
          People Group 2: {{ list2 }}
        </prism>
      </b-col> -->
    </b-row>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BListGroupItem, BAvatar, BRow, BCol, BCardText,BButton
} from 'bootstrap-vue'
import draggable from 'vuedraggable'
import Prism from 'vue-prism-component'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  components: {
    BButton,
    BCardCode,
    BAvatar,
    BListGroupItem,
    BCardText,
    BRow,
    BCol,
    Prism,
    draggable,
  },
  data() {
    return {
      list1: [
        {
          name: 'Paz Joya',
          email: 'girliness@spotlike.co.uk',
        },
        {
          name: 'Sunshine Cose',
          email: 'executrixship@equisized.edu',
        },
        {
          name: 'Alba Dobbin',
          email: 'bidding@demibob.or',
        },
        {
          name: 'Marlin Hinchee',
          email: 'preholding@scuffly.co.uk',
        },
      ],
      list2: [
        {
          name: 'Leia Atienza',
          email: 'unmeasurableness@interlamellar.co.uk',
        },
        {
          name: 'Lashawna Vaudrainm',
          email: 'soaking@khubber.com',
        },
        {
          name: 'Liliana Henscheid',
          email: 'lecideine@turndown.org',
        },
        {
          name: 'Keven Kolter',
          email: 'nontenure@anglicanum.co.uk',
        },
      ],
    }
  },
}
</script>
<style lang="scss">
.card{
  height: 95%;
}
</style>
