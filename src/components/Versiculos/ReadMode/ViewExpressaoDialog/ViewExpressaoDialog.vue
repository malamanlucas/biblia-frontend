<template lang="html">
  <modal>
    <span slot="header">{{ title }}</span>

    blabllba
  </modal>
</template>

<script>
  import modalMixins from '@/core/components/Modal/modal-mixins'
  import expressaoService from '@/services/expressaoService'

  export default {
    mixins: [modalMixins],
    computed: {
      title() {
        return 'titulo'
      }
    },
    methods: {
      loadData(keyAsJson) {
      },
      abrirModal(keyAsJson) {
        this.loadData(keyAsJson)
        this.show()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
