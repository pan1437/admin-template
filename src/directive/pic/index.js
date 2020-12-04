import { imageIsExist } from './pic'

export default {
  install(Vue) {
    Vue.directive('real-img', async function(el, binding) {
      let imgURL = binding.value //获取图片地址
      let defaultURL = el.getAttribute('default-img') //获取默认图片地址
      if (imgURL) {
        let exist = await imageIsExist(imgURL)
        if (exist) {
          el.setAttribute('src', imgURL)
        } else {
          if (defaultURL) {
            el.setAttribute('src', defaultURL)
          }
        }
      }
    })
  }
}
// 使用 <img  v-real-img="1" :default-img="require('@/assets/image/avatar.png')" alt="" >
