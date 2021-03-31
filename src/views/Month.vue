<template>
  <p>I am month with id: {{ id }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
});
</script>
