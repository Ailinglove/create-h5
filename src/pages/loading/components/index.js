import loading from '@pages/loading/components/loading'
export default {
  install: (app) => {
    app.directive('tloading', loading)
  }
}
