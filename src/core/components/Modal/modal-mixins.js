import $ from 'jquery'

export default {
  methods: {
    show() {
      $(this.$el).modal('show')
    },
    hide() {
      $(this.$el).modal('hide')
    }
  }
}
