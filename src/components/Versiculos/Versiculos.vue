<template lang="html">
  <div :style="{'margin-top': marginTop}">
    <toggle-action-expressao />
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

    <detalhe-expressao-dialog ref="detalheExpressaoDialog" @on-save-new-success="refreshVersiculos"
      @on-modal-close="onModalClose" @on-delete-success="refreshVersiculos" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import '@/js/selection.js'
  import '@/js/selectionVersiculo.js'
  import $ from 'jquery'
  import DetalheExpressaoDialog from './DetalheExpressaoDialog'
  import ToggleActionExpressao from './ToggleActionExpressao'
  import versiculoService from '@/services/versiculoService'

  export default {
    name: 'versiculos',
    props: ['marginTop'],
    data: () => ({
      versiculos: null,
      scrollY: 0
    }),
    computed: {
      ...mapGetters([
        'getCapitulo'
      ])
    },
    components: {
      DetalheExpressaoDialog,
      ToggleActionExpressao
    },
    watch: {
      getCapitulo(newValue) {
        this.getVersiculos(newValue)
      }
    },
    methods: {
      onModalClose() {
        window.scrollTo(0, this.scrollY)
      },
      refreshVersiculos() {
        this.getVersiculos(this.getCapitulo)
      },
      getVersiculos(capitulo, callbackPostLoad) {
        versiculoService.search(capitulo)
          .then(response => {
            this.$nextTick(() => {
              this.versiculos = response.data
              this.$nextTick(() => {
                this.bindVersiculoSelect(this)
              })
              window.scrollTo(0, 0)
            })
          }).catch(e => {
            window.console.log(e)
          })
      },
      bindVersiculoSelect(_this) {
        $('.list-group').css('position', 'absolute')

        $('.lista_limpa .versiculo').off('mouseup').on('mouseup', event => {
          let expressao = $(event.currentTarget).textSelected()

          if (expressao !== undefined && expressao !== null && expressao.text !== '') {
            let keyAsJson = $(event.currentTarget).attr('json')

            console.log(`${expressao.text} - ${keyAsJson}`)

            this.scrollY = window.scrollY

            this.$refs.detalheExpressaoDialog.abrirModal({
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
    },
    mounted() {
      this.getVersiculos(this.getCapitulo)
    }
  }
</script>

<style lang="scss">
  @import './versiculos';
</style>
