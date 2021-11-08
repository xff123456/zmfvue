export default {
  AddCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    payload.checked=false
    state.cartList.push(payload)
  }
}
