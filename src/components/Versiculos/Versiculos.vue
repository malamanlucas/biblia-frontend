$<template lang="html">
  <div class="" :style="{'margin-top': marginTop}">
    <ul class="list-group">
      <li class="list-group-item" v-for="v in versiculos">
        <div :json="v.key.json" v-html="v.versiculoMontado" class="versiculo"></div>
      </li>
    </ul>

    <ul class="list-group lista_limpa">
      <li class="list-group-item" v-for="v in versiculos">
        <div :json="v.key.json" class="versiculo" v-text="v.texto"></div>
      </li>
    </ul>

    <detalhe-expressao-dialog ref="detalheExpressaoDialog" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import '@/js/selection.js'
  import '@/js/selectionVersiculo.js'
  import $ from 'jquery'
  import DetalheExpressaoDialog from './DetalheExpressaoDialog'

  export default {
    name: 'versiculos',
    props: ['marginTop'],
    data: () => ({
      versiculos: null
    }),
    computed: {
      ...mapGetters([
        'getCapitulo'
      ])
    },
    components: {
      DetalheExpressaoDialog
    },
    watch: {
      getCapitulo(newValue) {
        this.getVersiculos(newValue)
      }
    },
    methods: {
      getVersiculos(capitulo) {
        this.$http.get('/api/versiculos/', {
          params: {
            livroId: capitulo.key.livroId,
            capituloId: capitulo.key.id
          }
        }).then(response => {
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
