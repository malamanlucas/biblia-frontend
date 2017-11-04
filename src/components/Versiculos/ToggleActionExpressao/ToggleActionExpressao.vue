<template lang="html">
  <div class="toogle-expressao">

    <div class="btn-group btn-group-justified" data-toggle="buttons">
      <label class="btn btn-default active" for="write">
        <input type="radio" name="toggleExpressao" id="write" :value="OPERATION_EXPRESSAO.WRITE">
        <span class="text-button">Editar expressão</span>
      </label>
      <label class="btn btn-default" for="readOnly">
        <input type="radio" name="toggleExpressao" id="readOnly" :value="OPERATION_EXPRESSAO.READ_ONLY">
        <span class="text-button">Mostrar expressão</span>
      </label>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapMutations } from 'vuex'
  import { SET_TOGGLE_EXPRESSAO } from '@/store/mutation-types'
  import { OPERATION_EXPRESSAO } from '@/enums'

  export default {
    name: 'toggle-action-expressao',
    computed: {
      OPERATION_EXPRESSAO() {
        return OPERATION_EXPRESSAO
      }
    },
    methods: {
      ...mapMutations({
        setToggleExpressao: SET_TOGGLE_EXPRESSAO
      }),
      registerListenerOnRadio() {
        $(':radio[name="toggleExpressao"]').off('change').on('change', event => {
          this.setToggleExpressao($(event.currentTarget).val())
        })
      }
    },
    mounted() {
      this.registerListenerOnRadio()
    },
    updated() {
      this.registerListenerOnRadio()
    }
  }
</script>

<style lang="scss" scoped>
  .toogle-expressao {
    display: flex;
    justify-content: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 102;
    .text-button {
      font-size: 16px;
    }
  }
</style>
