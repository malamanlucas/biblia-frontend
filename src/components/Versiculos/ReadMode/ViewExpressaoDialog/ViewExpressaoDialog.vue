<template lang="html">
  <modal>
    <span slot="header">{{ title }}</span>

    <span v-html="definicao"></span>
  </modal>
</template>

<script>
  import modalMixins from '@/core/components/Modal/modal-mixins'
  import dicionarioService from '@/services/dicionarioService'
  import { mapGetters } from 'vuex'
  import { isNil } from 'lodash'

  export default {
    mixins: [modalMixins],
    data: () => ({
      dics: null
    }),
    computed: {
      title() {
        return 'titulo'
      },
      ...mapGetters(['getLivro']),
      definicao() {
        if (!isNil(this.dics)) {
          return [{definicao: 'qweqewqeqw'}].concat(this.dics).map(e => e.definicao).join('<br />')
        }
        return ''
      }
    },
    methods: {
      async loadData(keyAsJson, dics) {
        this.dics = (await dicionarioService.search({
          'dics': [].concat(dics),
          idioma: this.getLivro.testamento.idioma
        })).data
      },
      abrirModal(keyAsJson, dics) {
        this.loadData(keyAsJson, dics)
        this.show()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
