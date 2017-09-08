<template lang="html">
  <div>
    <div class="row capitulos">

      <div class="col-xs-26">
        <loading ref="loading" border="0.5em" width="5em" :horizontal="true"></loading>
      </div>

      <div class="col-xs-26" id="capitulos">
        <div class="capitulos__capitulo col-xs-1 text-left" v-for="c in capitulos" @click="goVersiculos(c)">
          {{ c.key.id }}
        </div>
      </div>
    </div>

    <div id="versiculos">
      <router-view name="versiculos" :marginTop="marginTop"></router-view>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { SET_CAPITULO } from '@/store/mutation-types'

  export default {
    data: () => ({
      marginTop: '0px'
    }),
    computed: {
      ...mapGetters({
        capitulos: 'getCapitulos'
      }),
    },
    methods: {
      goVersiculos(capitulo) {
        this.setCapitulo(capitulo)
        this.$router.push('/livros/capitulos/versiculos')
      },
      ...mapMutations({
        setCapitulo: SET_CAPITULO
      }),
    },
    updated() {
      const elem = document.getElementById('capitulos')

      if (elem) {
        this.marginTop = getComputedStyle(document.getElementById('capitulos')).height
      }
    }
  }
</script>

<style lang="scss">
  @import './capitulos';
</style>
