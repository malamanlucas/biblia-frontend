<template lang="html">
  <div class="read-mode">
    <ul class="list-group">
      <li class="list-group-item" v-for="v in versiculos">
        <div :json="v.key.json" v-html="v.versiculoMontado" class="lead versiculo"></div>
      </li>
    </ul>

    <view-expressao-dialog ref="viewExpressaoDialog" />

  </div>
</template>

<script>
  import $ from 'jquery'
  import ViewExpressaoDialog from './ViewExpressaoDialog'

  export default {
    name: 'read-mode',
    props: ['versiculos'],
    components: {
      ViewExpressaoDialog
    },
    methods: {
      whenVersiculosLoaded() {
        $('.texto').off('click').on('click', event => {
          let keyAsJson = $(event.currentTarget).parent().attr('json')

          this.$refs.viewExpressaoDialog.abrirModal(JSON.parse(keyAsJson))
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './read-mode';
</style>
