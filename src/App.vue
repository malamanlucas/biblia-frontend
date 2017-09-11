<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  import { SET_TOGGLE_EXPRESSAO } from '@/store/mutation-types'
  import { OPERATION_EXPRESSAO } from '@/enums'

  export default {
    name: 'app',
    methods: {
      ...mapActions(['loadEnums']),
      ...mapMutations({
        setToggleExpressao: [SET_TOGGLE_EXPRESSAO]
      })
    },
    created() {
      this.setToggleExpressao(OPERATION_EXPRESSAO.WRITE)
      this.loadEnums()
    }
  }
</script>
