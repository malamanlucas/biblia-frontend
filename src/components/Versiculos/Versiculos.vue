<template lang="html">
  <div :style="{'margin-top': marginTop}">

    <toggle-action-expressao />

    <write-mode v-if="hasPermissionToWriteExpressao" ref="content" :versiculos="versiculos" @refresh-versiculos="refreshVersiculos" />

    <read-mode v-else ref="content" :versiculos="versiculos" />

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ToggleActionExpressao from './ToggleActionExpressao'
  import versiculoService from '@/services/versiculoService'
  import ReadMode from './ReadMode'
  import WriteMode from './WriteMode'

  export default {
    name: 'versiculos',
    props: ['marginTop'],
    data: () => ({
      versiculos: null,
      scrollY: 0
    }),
    computed: {
      ...mapGetters([
        'getCapitulo',
        'hasPermissionToWriteExpressao'
      ])
    },
    components: {
      ToggleActionExpressao,
      ReadMode,
      WriteMode
    },
    watch: {
      getCapitulo(newValue) {
        this.getVersiculos(newValue)
      },
      hasPermissionToWriteExpressao(newValue) {
        this.applyVersiculosActions()
      }
    },
    methods: {
      refreshVersiculos() {
        this.getVersiculos(this.getCapitulo)
      },
      applyVersiculosActions() {
        this.$nextTick(() => {
          this.$refs.content.whenVersiculosLoaded()
        })
      },
      getVersiculos(capitulo, callbackPostLoad) {
        versiculoService.search(capitulo)
          .then(response => {
            this.$nextTick(() => {
              this.versiculos = response.data
              this.applyVersiculosActions()
              window.scrollTo(0, 0)
            })
          }).catch(e => {
            window.console.log(e)
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
