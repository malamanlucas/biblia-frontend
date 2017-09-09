<template lang="html">
  <modal>

    <span slot="header">{{ title }}</span>

    <div class="container-fluid">

      <bootstrap-responsive />

      <form>
        <div class="form-group row">
          <label for="exampleTextarea" class="col-form-label col-sm-6 col-xs-10">Descrição</label>
          <textarea v-model="expressaoObject.descricao" class="col-sm-20 col-xs-16" id="exampleTextarea" rows="3"></textarea>
        </div>

        <div class="form-group row">
          <div class="col-xs-16 col-sm-10">
            <input type="text" class="form-control" v-model="dicionario.key.id">
          </div>
          <div class="col-xs-4">
            <button class="btn btn-primary" type="button" name="button" @click="addDicionario">Adicionar</button>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-xs-10">
            <select class="form-control" v-model="dicionario.key.idioma">
              <option v-for="op in idiomas" :value="op">{{ op }}</option>
            </select>
          </div>
        </div>
      </form>

      <table id="datatable_id" class="table table-responsive table-bordered table-bordered">
        <thead>
          <tr>
            <td>CÓDIGO</td>
            <td>IDIOMA</td>
            <td>AÇÕES</td>
          </tr>
        </thead>
      </table>

      <button class="btn btn-primary" type="button" name="button" @click="save">Salvar</button>

    </div>

  </modal>
</template>

<script>
  import modalMixins from '@/core/components/Modal/modal-mixins'
  import expressaoService from '@/services/expressao'
  import $ from 'jquery'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [modalMixins],
    data: () => ({
      dt: null,
      expressao: null,
      expressaoObject: {
        descricao: ''
      },
      dicionario: {
        key: {
          id: null,
          idioma: ''
        }
      }
    }),
    computed: {
      ...mapGetters({
        idiomas: 'getIdiomas',
        livro: 'getLivro'
      }),
      title() {
        if (this.expressao) {
          return `"${this.expressao.text}" ${this.expressao.start}-${this.expressao.end}`
        }

        return 'Nenhuma expressão selecionada'
      }
    },
    methods: {
      initDicionario() {
        this.dicionario = {
          key: {
            id: null,
            idioma: this.livro.testamento.idioma
          }
        }
      },
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
              {
                data: 'acoes',
                defaultContent: '<i class="icon-delete fa fa-trash-o"></i>'
              }
            ]
          }

          this.dt = $('#datatable_id').DataTable(options)
          this.dt.draw()
        }
      },
      a() {
        window.alert('testando deleção')
      },
      addDicionario() {
        this.expressaoObject.dicionarios.push(this.dicionario)
        this.addTable(this.dicionario)
        this.refreshTable()
        this.initDicionario()
      },
      save() {
        expressaoService.save(this.expressaoObject)
      },
      async carregarDadosModal(expressaoParam) {
        this.createTable()

        this.dt.clear()

        try {
          this.expressaoObject = (await expressaoService.searchExpressaoByTermo(expressaoParam.searchParam)).data
          this.expressaoObject.dicionarios.forEach(this.addTable)
        } catch (err) {
          //
        } finally {
          this.refreshTable()
        }
      },
      refreshTable() {
        this.dt.draw()
        $('.icon-delete').off('click').on('click', this.a)
      },
      addTable(d) {
        this.dt.row.add({
          codigo: d.key.id,
          idioma: d.key.idioma
        })
      },
      prepareModalToShow(expressao) {
        this.expressao = expressao
        this.initDicionario()
      },
      abrirModal(expressaoParam) {
        this.prepareModalToShow(expressaoParam.expressao)
        this.show()
        this.carregarDadosModal(expressaoParam)
      }
    }
  }
</script>

<style lang="scss">
  .icon-delete {
    cursor: pointer;
  }
</style>
