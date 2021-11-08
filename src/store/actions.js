export default {
  addCart(context,payload){
    return new Promise((resolve, reject) =>{
    //1.查找之前数组中是否有改商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.判断oldProduct
      if (oldProduct){
        //oldProduct.count +=1
        context.commit('AddCounter',oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count=1
        //context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })
  }
}
