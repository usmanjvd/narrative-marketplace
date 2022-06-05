<template>
  <div>
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
