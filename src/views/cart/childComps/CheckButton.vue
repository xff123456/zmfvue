<template>
  <div>
    <div class="icon-selector" :class="{check: isChecked}" @click="selectItem">
      <img src="~/assets/img/cart/tick.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
  /*  watch: {
      value: function (newValue) {
        this.checked = newValue;
      }
    }*/
  }
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    top: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid darkgray;
    cursor: pointer;
  }

  .icon-selector img{
    width: 15px;
    height: 15px;
  }
  .check {
    background-color: red;
    border-color: red;
  }
</style>
