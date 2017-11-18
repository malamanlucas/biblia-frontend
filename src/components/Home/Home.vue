<template lang="html">
  <div class="body">

    <footer>
      <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#footer-body">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link to="/" class="navbar-brand">Fuja dos falsos profetas!</router-link>
          </div>
          <div class="collapse navbar-collapse" id="footer-body">
            <ul class="nav navbar-nav">
              <li>
                <router-link to="/livros">Livros</router-link>
              </li>
              <li>
                <router-link to="/sentenca">Sentença</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>

    <router-view :name="ROUTER_VIEW_HOME"></router-view>

  </div>
</template>

<script>
  import { ROUTER_VIEW_HOME } from '@/router-view-names'

  export default {
    name: 'home',
    computed: {
      ROUTER_VIEW_HOME: () => ROUTER_VIEW_HOME
    }
  }
</script>

<style lang="scss" scoped>
  @import './home';
</style>
