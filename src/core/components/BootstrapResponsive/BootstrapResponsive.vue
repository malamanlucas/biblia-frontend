<template lang="html">
  <div class="container-fluid">
    <div class="row responsive-utilities-test visible-on">
      <div class="col-xs-26 col-sm-6">
        <span class="hidden-xs">Extra small</span>
        <span class="visible-xs-block">✔ Visible on x-small</span>
      </div>
      <div class="col-xs-26 col-sm-7">
        <span class="hidden-sm">Small</span>
        <span class="visible-sm-block">✔ Visible on small</span>
      </div>
      <div class="clearfix visible-xs-block"></div>
      <div class="col-xs-26 col-sm-7">
        <span class="hidden-md">Medium</span>
        <span class="visible-md-block">✔ Visible on medium</span>
      </div>
      <div class="col-xs-26 col-sm-6">
        <span class="hidden-lg">Large</span>
        <span class="visible-lg-block">✔ Visible on large</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bootstrap-responsive'
  }
</script>

<style lang="scss" scoped>
  span[class^='hidden-'] {
    border: 1px solid black;
    padding: 0px 10px;
    border-radius: 2px;
  }
  span[class^='visible-'] {
    border: 1px solid black;
    border-radius: 2px;
    color: #468847;
    background-color: #dff0d8;
  }
</style>
