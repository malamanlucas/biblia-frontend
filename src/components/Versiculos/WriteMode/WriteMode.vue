<template lang="html">
  <div class="write-mode">

    <ul class="list-group" id="versiculosCustomizados">
      <li class="list-group-item" v-for="v in versiculos">
        <div :json="v.key.json" v-html="v.versiculoMontado" class="lead versiculo"></div>
      </li>
    </ul>

    <ul class="list-group lista_limpa" id="versiculosLimpos">
      <li class="list-group-item" v-for="v in versiculos">
        <div :json="v.key.json" class="versiculo lead" v-text="v.texto"></div>
      </li>
    </ul>

    <edit-expressao-dialog ref="editExpressaoDialog" @on-save-new-success="$emit('refresh-versiculos')"
      @on-modal-close="onModalClose" @on-delete-success="$emit('refresh-versiculos')" />

  </div>
</template>

<script>
  import '@/js/selection.js'
  import '@/js/selectionVersiculo.js'
  import $ from 'jquery'
  import EditExpressaoDialog from './EditExpressaoDialog'

  export default {
    name: 'write-mode',
    props: ['versiculos'],
    components: {
      EditExpressaoDialog
    },
    methods: {
      onModalClose() {
        window.scrollTo(0, this.scrollY)
      },
      whenVersiculosLoaded() {
        this.bindVersiculoSelect(this)
      },
      bindVersiculoSelect(_this) {
        $('.list-group').css('position', 'absolute')

        $('.lista_limpa .versiculo').off('mouseup').on('mouseup', event => {
          let expressao = $(event.currentTarget).textSelected()

          if (expressao !== undefined && expressao !== null && expressao.text !== '') {
            let keyAsJson = $(event.currentTarget).attr('json')

            console.log(`${expressao.text} - ${keyAsJson}`)

            this.scrollY = window.scrollY

            this.$refs.editExpressaoDialog.abrirModal({
              expressao,
              searchParam: {
                versiculoKey: JSON.parse(keyAsJson),
                inicio: expressao.start,
                fim: expressao.end
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './write-mode';
</style>
