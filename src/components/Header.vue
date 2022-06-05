<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-between items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'Home' }"
        exact-active-class="no-active"
      >Narrative Marketplace</router-link>

      <div class="flex items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'About' }">About</router-link>
          </li>
          <li v-if="!isUserLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="signIn">
              Login / Register
            </a>
          </li>
          <template v-if="isUserLoggedIn">
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['isUserLoggedIn']),
  },
  methods: {
    signIn() {
      this.$router.push({
        name: 'Auth',
      });
    },
    signOut() {
      this.$store.dispatch('signOut');

      this.$router.push({
        name: 'Auth',
      });
    },
  },
};
</script>
