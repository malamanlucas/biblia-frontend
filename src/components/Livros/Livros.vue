<template lang="html">
  <div class="livros-container">

    <loading ref="loading"></loading>

    <div class="livros-container__sidebar">
      <div class="livros-container__sidebar__testamentos">
        <div class="testamento bg-info text-center" v-for="testamento in testamentos">
          <div class="h4 testamento__title text-danger" v-text="testamento.nome"></div>
          <div class="testamento__livro " v-for="livro in testamento.livros">
            <div class="testamento__livro__nome text-danger" @click="getCapitulos(livro)">
              {{ livro.nome }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="livros-container__main">
      <router-view name="capitulos"></router-view>
    </div>

  </div>
</template>

<script>
  import Capitulos from '../Capitulos'
  import { TESTAMENTO } from '@/params'
  import { mapMutations, mapActions } from 'vuex'
  import { SET_LIVRO } from '@/store/mutation-types'
  import livroService from '@/services/livro'

  export default {
    data: () => ({
      testamentos: [],
      capitulos: [1, 2, 3]
    }),
    components: {
      Capitulos
    },
    methods: {
      buildColumnText(c) {
        let totalExtraSpaces = 3 - c.toString().length

        let extraSpaces = ''

        for (let i = 0; i < totalExtraSpaces; i++) {
          extraSpaces += '&nbsp;'
        }

        return `${extraSpaces}${c}`
      },
      getCapitulos(livro) {
        this.setLivro(livro)
        this.$router.push('/livros/capitulos')
      },
      ...mapActions(['setLivro']),
      async loadTestamentos() {
        this.$refs.loading.show()

        const getTestamento = async testamento => {
          return {
            nome: testamento.label,
            livros: (await livroService.getLivroByTestamento(testamento.value)).data
          }
        }

        this.testamentos.push(await getTestamento(TESTAMENTO.NOVO))
        this.testamentos.push(await getTestamento(TESTAMENTO.VELHO))
        this.$refs.loading.hide()
      }
    },
    mounted() {
      this.loadTestamentos()
    }
  }
</script>

<style lang="scss" scoped>
  @import './livros';
</style>
