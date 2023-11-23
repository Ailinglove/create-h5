import Loading from './Loading.vue'
/* 将loading添加到指令所在DOM */
const handleAppend = (el) => {
  el.appendChild(el.instance.$el)
}

const handleRemove = (el) => {
  el.removeChild(el.instance.$el)
}

const loadingDirective = {
  mounted(el, binding) {
    const { value, arg } = binding
    console.log(arg)
    const app = createApp(Loading)
    
    const instance = app.mount(document.createElement('div'))
    el.instance = instance

    if (arg) {
      instance.setTParams(arg)
    }
    if (value) {
      handleAppend(el)
    }
  },
  updated(el, binding) {
    const { value, oldValue, arg } = binding
    if (value !== oldValue) {
      if (arg) {
        el.instance.setTParams(arg)
      }
      value ? handleAppend(el) : handleRemove(el)
    }
  }
}

export default {
  install: (app) => {
    app.directive('tloading', loadingDirective)
  }
}