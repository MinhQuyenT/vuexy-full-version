
<template>
  <div>
    <b-row>
      <div v-for="item in options">
        <template v-if="item.type == 'text' ">
          <b-col cols="12">
            <b-form-group>
              <label style="float: left">{{ item.title }}:</label>
              <b-form-input :id="item.prop" v-model="params[item.prop]" autocomplete="off" :placeholder="item.title"
                :type="item.type" class="d-inline-block " />
              <div class="img" v-if="params[item.prop] != null && params[item.prop] != ''">
                <feather-icon icon="XIcon" @click="resetValue(item.prop)" />
              </div>
            </b-form-group>
          </b-col>
        </template>
        <template v-if="item.type == 'select'">
          <b-col cols="12">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{item.title}}:</h6>
              <v-select v-model="params[item.prop]" :placeholder="item.title" :clearable="item.clearable" :options="optionData" option-text="text"
                option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
        </template>

      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  mounted() {
    console.log(this.options);
  },
  created() {

  },
  data() {
    return {
      // param:{},
      // options: [{
      //   type: "text",
      //   title: "",
      //   prop: "personNO"
      // }]
    }
  },
  props: {
    options: Array,
    params: Object
  },
  methods: {
    resetValue(val) {
      if (val) this.params[val] = "";
    }
  },
}
</script>

<style lang="scss" scoped>
.img {
  right: 26px;
  position: absolute;
  margin-top: -30px;
  display: block;
  right: 20px;
  color: #6e6b7b;
}
</style>

