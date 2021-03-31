<template>
  <TheHeader />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/TheHeader/TheHeader.vue";

export default defineComponent({
  components: { TheHeader },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
});
</script>
