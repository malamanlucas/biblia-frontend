<template lang="html">
  <modal :callBackOnModalClose="callBackOnModalClose">

    <span slot="header">{{ title }}</span>

    <div class="container-fluid">

      <!-- <bootstrap-responsive /> -->

      <form class="form-horizontal" :data-vv-scope="SCOPE_NAME" @submit.prevent>
        <div class="form-group row">
          <label for="exampleTextarea" class="col-form-label col-sm-6 col-xs-10">Descrição</label>
          <textarea v-model="expressaoObject.descricao" name="descricao" class="col-sm-20 col-xs-16"
            id="exampleTextarea" rows="3" v-validate.initial="'required'" :data-vv-scope="`${SCOPE_NAME}.descricao`"
            :class="{'error-field': validation.has('descricao', `${SCOPE_NAME}.descricao`)}"></textarea>
        </div>

        <div class="form-group">
          <label for="codigo" class="col-xs-6 col-sm-3 control-label">Código: </label>
          <div class="col-xs-10 col-sm-10">
            <input v-validate.initial="'required|numeric'" type="text" id="codigo" name="codigo" class="form-control"
              v-model="dicionario.key.id" :class="{'error-field': validation.has('codigo', SCOPE_NAME)}" />
          </div>
          <div>
            <button class="btn btn-primary" type="button" name="button" @click="addDicionario"
              :class="{'disabled': validation.any(SCOPE_NAME)}" :id="idButtonAdd">Adicionar</button>
          </div>
        </div>


        <div class="form-group row">
          <label for="idioma" class="col-xs-6 col-sm-3 control-label">Idioma: </label>
          <div class="col-xs-10">
            <select id="idioma" class="form-control" v-model="dicionario.key.idioma"
              name="idioma" v-validate.initial="`required|in:${idiomasAllowed}`"
              :class="{'error-field': validation.has('idioma', SCOPE_NAME)}">
              <option v-for="op in idiomas" :value="op">{{ op }}</option>
            </select>
          </div>
        </div>
      </form>

      <table id="datatable_id" class="table table-responsive table-bordered table-condensed table-hover">
        <thead>
          <tr>
            <td>CÓDIGO</td>
            <td>IDIOMA</td>
            <td>AÇÕES</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="dicionarios">
            <tr v-for="d in dicionarios">
              <td>{{ d.key.id }}</td>
              <td>{{ d.key.idioma }}</td>
              <td>
                <i @click="deleteRow(d)" class="icon-delete fa fa-trash-o"></i>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3" class="txt-center">Não há expressões</td>
          </tr>
        </tbody>
      </table>

      <div class="actions">

      </div>

      <button class="btn btn-success btn-lg" type="button" name="button"
        :class="{'disabled': validation.has('descricao', `${SCOPE_NAME}.descricao`)}"
        @click="save" :id="idButtonSave">Salvar</button>

      <button class="btn btn-danger btn-lg" type="button" name="button"
        :class="{'disabled': !canDelete}" :id="idButtonDelete"
        @click="deleteExpressao">Remover</button>

    </div>

  </modal>
</template>

<script>
  import modalMixins from '@/core/components/Modal/modal-mixins'
  import expressaoService from '@/services/expressaoService'
  import { mapGetters } from 'vuex'
  import $ from 'jquery'

  export default {
    inject: ['$validator'],
    mixins: [modalMixins],
    data: () => ({
      expressao: null,
      expressaoObject: {
        descricao: ''
      },
      dicionario: {
        key: {
          id: null,
          idioma: ''
        }
      },
      idButtonAdd: 'idButtonAdd',
      idButtonSave: 'idButtonSave',
      idButtonDelete: 'idButtonDelete'
    }),
    computed: {
      canDelete() {
        return !!(this.expressaoObject && this.expressaoObject.key && this.expressaoObject.key.expressaoId)
      },
      SCOPE_NAME() {
        return 'dicionario-form'
      },
      ...mapGetters({
        idiomas: 'getIdiomas',
        testamento: 'getLivroTestamento',
        idiomasAllowed: 'getIdiomasAllowed'
      }),
      title() {
        if (this.expressao) {
          return `"${this.expressao.text}" ${this.expressao.start}-${this.expressao.end}`
        }

        return 'Nenhuma expressão selecionada'
      },
      dicionarios() {
        return this.expressaoObject.dicionarios
      }
    },
    methods: {
      deleteExpressao() {
        if (!this.isBtnDisabled(this.idButtonDelete)) {
          expressaoService.delete(this.expressaoObject.key)
          this.$emit('on-delete-success')
        }
      },
      callBackOnModalClose() {
        this.$emit('on-modal-close')
      },
      deleteRow(dicionario) {
        this.expressaoObject.dicionarios = this.expressaoObject.dicionarios.filter(d => d.key.id !== dicionario.key.id)
      },
      isBtnDisabled(id) {
        return $(`#${id}`).hasClass('disabled')
      },
      initDicionario() {
        this.dicionario = {
          key: {
            id: null,
            idioma: this.testamento.idioma
          }
        }
      },
      initObject(expressaoParam) {
        this.expressaoObject = {
          descricao: '',
          dicionarios: [],
          key: {
            versiculoId: expressaoParam.searchParam.versiculoKey.id,
            capituloId: expressaoParam.searchParam.versiculoKey.capituloId,
            livroId: expressaoParam.searchParam.versiculoKey.livroId
          },
          inicio: expressaoParam.expressao.start,
          fim: expressaoParam.expressao.end,
          texto: expressaoParam.expressao.text
        }
      },
      addDicionario() {
        if (!this.isBtnDisabled(this.idButtonAdd)) {
          window.console.log('qweqw')
          this.expressaoObject.dicionarios.push(this.dicionario)
          this.initDicionario()
        }
      },
      save() {
        if (!this.isBtnDisabled(this.idButtonSave)) {
          expressaoService.save(this.expressaoObject)
          if (!this.expressaoObject.key.expressaoId) {
            this.$emit('on-save-new-success')
          }
        }
      },
      async carregarDadosModal(expressaoParam) {
        try {
          this.expressaoObject = (await expressaoService.searchExpressaoByTermo(expressaoParam.searchParam)).data
        } finally {
          //
        }
      },
      prepareModalToShow(expressaoParam) {
        this.expressao = expressaoParam.expressao
        this.initObject(expressaoParam)
        this.initDicionario()
      },
      abrirModal(expressaoParam) {
        this.prepareModalToShow(expressaoParam)
        this.show()
        this.carregarDadosModal(expressaoParam)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-delete {
    cursor: pointer;
  }

  .error-field {
    border: 2px solid red;
  }
</style>
