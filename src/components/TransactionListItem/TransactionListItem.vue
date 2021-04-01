<template>
  <div class="transaction">
    <span :class="['transaction__type', `transaction__type_${typeToLower}`]">
      <font-awesome-icon
        :icon="['fas', getArrowType]"
        :class="['transaction__icon', `transaction__icon_${typeToLower}`]"
      />
    </span>
    <p :class="['transaction__amount', `transaction__amount_${typeToLower}`]">
      £{{ amount.toFixed(2) }}
    </p>
    <p class="transaction__description">{{ description }}</p>
    <div class="transaction__options">
      <font-awesome-icon
        :icon="['fas', 'edit']"
        class="transaction__option transaction__option--edit"
        @click="$emit('edit')"
      />
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="transaction__option transaction__option--trash"
        @click="$emit('delete')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getArrowType(): string {
      return this.type === "In" ? "arrow-up" : "arrow-down";
    },
    typeToLower(): string {
      return this.type.toLowerCase();
    },
  },
});
</script>
