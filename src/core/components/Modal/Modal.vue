<template lang="html">
  <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">
            <slot name="header">
              Modal title
            </slot>
          </h4>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>
  import $ from 'jquery'

  export default {
    props: ['callBackOnModalClose'],
    methods: {
      registerListeners() {
        $('#myModal').off('hide.bs.modal').on('hide.bs.modal', () => {
          this.callBackOnModalClose && this.callBackOnModalClose()
          // this.$emit('on-modal-close')
        })
      }
    },
    mounted() {
      this.registerListeners()
    },
    updated() {
      this.registerListeners()
    }
  }
</script>

<style lang="scss" scoped>
</style>
