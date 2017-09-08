<template lang="html">
  <modal>

    <span slot="header">{{ title }}</span>

    <div class="container-fluid">

      <table id="datatable_id" class="table table-responsive table-bordered table-bordered">
        <thead>
          <tr>
            <td>CÓDIGO</td>
            <td>IDIOMA</td>
            <td>AÇÕES</td>
          </tr>
        </thead>
      </table>

    </div>

  </modal>
</template>

<script>
  import modalMixins from '@/core/components/Modal/modal-mixins'
  import expressaoService from '@/services/expressao'
  import $ from 'jquery'

  export default {
    mixins: [modalMixins],
    data: () => ({
      dt: null,
      expressao: null
    }),
    computed: {
      title() {
        if (this.expressao) {
          return `"${this.expressao.text}" ${this.expressao.start}-${this.expressao.end}`
        }

        return 'Nenhuma expressão selecionada'
      }
    },
    methods: {
      createTable() {
        if (!$.fn.DataTable.isDataTable('#datatable_id')) {
          let options = {
            paging: false,
            ordering: false,
            info: false,
            dom: 't',
            language: {
              emptyTable: 'Nao há expressões'
            },
            columns: [
              {data: 'codigo'},
              {data: 'idioma'},
              {data: 'acoes', defaultContent: ''}
            ]
          }

          this.dt = $('#datatable_id').DataTable(options)
          this.dt.draw()
        }
      },
      async carregarDadosModal(expressaoParam) {
        this.createTable()

        this.dt.clear()

        try {
          let expressao = (await expressaoService.searchExpressaoByTermo(expressaoParam.searchParam)).data

          expressao.dicionarios.forEach(d => {
            this.dt.row.add({
              codigo: d.key.id,
              idioma: d.key.idioma
            })
          })
        } catch (err) {
          //
        } finally {
          this.dt.draw()
        }
      },
      prepareModalToShow(expressao) {
        this.expressao = expressao
      },
      abrirModal(expressaoParam) {
        this.prepareModalToShow(expressaoParam.expressao)
        this.show()
        this.carregarDadosModal(expressaoParam)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
