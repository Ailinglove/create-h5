import Loading from './Loading.vue' // 导入.vue文件
/* 将loading添加到指令所在DOM */
const handleAppend = (el) => {
  el.appendChild(el.instance.$el)
}

// 删除relative
const removeClass = (el, className) => {
  el.classList.remove()
}
/* 将loading在DOM中移除 */
const handleRemove = (el) => {
  removeClass(el)
  el.removeChild(el.instance.$el)
}

const loadingDirective = {
  /* 节点都挂载完成后调用 */
  mounted(el, binding) {
    /* 
       value 控制开启和关闭loding
       arg loading显示的文字
    */
   console.log(' loading shuju ', binding)
    const { value, arg } = binding
    /* 创建loading实例,并挂载 */
    const app = createApp(Loading)
    // 这一步 instance === loading.vue 
    // 此时就可以视同loading.vue 也就是组件实例的方法和属性
    const instance = app.mount(document.createElement('div'))
    /* 为了让elAppend获取到创建的div元素 */
    el.instance = instance
    /* 如果传入了自定义的文字就添加title */
    if (arg) {
      instance.setTitle(arg)
    }
    /* 如果showLoading为true将loading实例挂载到指令元素中 */
    if (value) {
      // 添加方法方法, 看下文
      handleAppend(el)
    }
  },
    /* 更新后调用 */
    updated(el, binding) {
      const { value, oldValue, arg } = binding
      if (value !== oldValue) {
        /* 更新标题 */
        if (arg) {
          el.instance.setTitle(arg)
        }
        // 是显示吗? 如果是就添加 : 如果不是就删除
        value ? handleAppend(el) : handleRemove(el)
      }
    }
  
}

export default loadingDirective