<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content" :data="[categoryData]" :probe-type="3"  ref="scroll" :pull-up-load="true" @pullingUp="loadMoreCategory">
        <div>
          <tab-content-category :subcategories="showSubCategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabclick="tabclick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
      <back-top @click.native="backclick" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
  import {getCategory,getSubcategory,getCategoryDetail} from "../../network/category";
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabContentDetail from "./childComps/TabContentDetail";
  import BackTop from "components/content/backTop/BackTop";
  export default {
    name:"Category",
    components:{
      NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail,
      BackTop
    },
    data(){
      return{
        categories:[],
        categoryData:{},
        currentIndex:-1,
        currentType:'pop',
        isShowBackTop:false,
        categoryDetail:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
      }
    },
    created() {
      this.getCategoryData()
    },
    computed:{
      showSubCategory(){
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail(){
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {

      loadMoreCategory(){
        this.getCategoryDetails(this.currentType)
      },
      /*
      * 网络请求相关方法
      * */
      getCategoryData() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.data.category.list
          console.log(res);
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this.getSubcategories(0)
        })
      },
      getSubcategories(index){
        this.currentIndex=index;
        const mailKey=this.categories[index].maitKey;
        getSubcategory(mailKey).then(res=>{
          this.categoryData[index].subcategories=res.data.data
          this.categoryData={...this.categoryData}
          this.getCategoryDetails('pop')
          this.getCategoryDetails('sell')
          this.getCategoryDetails('new')
        })
      },
      getCategoryDetails(type){
        //获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        const page =this.categoryDetail[type].page+1
        //2.发送请求，传入miniWallkey和type
        getCategoryDetail(miniWallkey,type,page).then(res =>{
          //3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type]=res.data
          this.categoryData={...this.categoryData}
          this.categoryDetail[type].list.push(...res.data)
          this.categoryDetail[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

      /*
      * 事件响应相关的方法
      * */
      selectItem(index) {
        this.getSubcategories(index)
      },
      tabclick(index){
        //console.log(index)
        switch (index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
      },
      //3.是否显示回到顶部
      /*backTopCategory(position){
        //1.判断backtop是否显示
        this.isShowBackTop = -(position.y) > 1000

      },*/
      backclick(){

        this.$refs.scroll.scrollTo(0,0,100)
      },
    }
  }

</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
