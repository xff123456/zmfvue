<template>
  <div>
    <scroll>
      <tab-content-category></tab-content-category>
      <tab-content-detail></tab-content-detail>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import TabContentCategory from "./TabContentCategory";
  import TabContentDetail from "./TabContentDetail";
  export default {
    name: "TabContent",
    components: {
      Scroll,
      TabContentCategory,
      TabContentDetail
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      },
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>
