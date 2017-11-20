<template lang="html">
  <div class="panel">
    <div class="metade"></div>
    <!-- <div class="panel__jesus">
      <span>Jesus</span>
      <span>disse:</span>
    </div> -->
    <div class="panel__title">
      <span>VAI-TE</span>
      <span>e</span>
      <span>NÃO</span>
    </div>
    <div class="panel__main">
      <span>PEQUES</span>
      <span>MAIS!!</span>
    </div>
    <div class="panel__footer">
      <div>
        <span>SENÃO</span>
        <span @click="teste">INFERNO</span>
      </div>
      <div>
        <span>JOÃO 8.11</span>
        <span>ROMANOS 6.23</span>
        <span>MATEUS 10.28</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nao-peques-mais',
    data: () => ({
      page: 1
    }),
    methods: {
      async teste() {
        // page++
        const v = '_r=1511062119092&country=US&hl=pt-BR&i_token=TkRRNE5USTBOZz09fDE1MTEwNjE3NTN8OTRkMDRiNDcwZTRjYjkzYTI4MGQ0YmNiNGFlNWZhNDM3YTUxYjUyNA%3D%3D&is_instant=&is_native=&is_trial=&is_video=&'
        let response = null
        try {
          response = await this.$http.get(`/teachersv2?${v}page=${this.page}&price_usd=&sort_type=1&speak=&teach=english&teacher_type=2`)
          console.log(response)
        } catch (err) {
          console.log(err)
          console.log(response)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './nao-peques-mais';
</style>
