<template lang="html">
  <div class="panel">

    <div class="ceu">
      CÉU
    </div>

    <div class="ou">
      OU
    </div>

    <div class="inferno">
      INFERNO
    </div>

    <div class="versiculo">
      João 3.18 Apocalipse 20.15
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ceu-ou-inferno',
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
  @import './ceu-ou-inferno';
</style>
