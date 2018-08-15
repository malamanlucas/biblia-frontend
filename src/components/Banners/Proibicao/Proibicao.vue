<template lang="html">
  <div class="proibicao">

    <div class="perigo">
      PERIGO! CONDUZ AO...
    </div>

    <div class="row">
      <ball>
        <img src="/static/assets/maconha.svg" />
      </ball>

      <ball class="cerveja">
        <img src="/static/assets/cerveja.png" />
      </ball>

      <ball>
        <div class="">
          PORNÔ
        </div>
      </ball>

    </div>

    <div class="row">
      <img src="/static/assets/aborto.jpeg" />


      <ball class="gay">
        <div>
          <img class="homosexual" src="/static/assets/homosexual.png" />
          <img class="lesbica" src="/static/assets/lesbica.png" />
        </div>
      </ball>

      <ball class="feiticeiro">
        <img src="/static/assets/feiticeiro.svg" />
      </ball>
    </div>

    <div class="inferno">
      INFERNO!!
    </div>


  </div>
</template>

<script>
  import Ball from './Ball'

  export default {
    name: 'proibicao',
    components: {
      Ball
    }
  }
</script>

<style lang="scss" src="./proibicao.scss"></style>
