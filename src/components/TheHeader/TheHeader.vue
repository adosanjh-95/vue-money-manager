<template>
  <header class="header">
    <div class="logo">
      <font-awesome-icon :icon="['fas', 'wallet']" class="logo__icon" />
      <h1 class="logo__title">Money Manager</h1>
    </div>
    <font-awesome-icon
      :icon="['fas', 'bars']"
      class="header__menu_icon"
      @click="showNav"
    />
    <nav :class="['nav', { 'nav--mobile_open': openNav }]">
      <font-awesome-icon
        :icon="['fas', 'times']"
        class="nav__close_icon"
        @click="closeNav"
      />
      <div class="nav__routes">
        <router-link
          v-for="(route, index) in routes"
          v-bind:key="index"
          :to="route.path"
          active-class="nav__route--active"
          class="nav__route"
          @click="closeNav"
        >
          {{ route.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "@/router";

export default defineComponent({
  data() {
    return {
      routes,
      openNav: false,
    };
  },
  methods: {
    showNav(): void {
      this.openNav = true;
    },
    closeNav(): void {
      this.openNav = false;
    },
  },
});
</script>
