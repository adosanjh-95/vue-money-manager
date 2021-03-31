<template>
  <div class="month_card">
    <h3 class="month_card__date">{{ getReadableDate }}</h3>
    <h4 class="month_card__net">£{{ net.toFixed(2) }}</h4>
    <div class="month_card__breakdown">
      <h5 class="month_card__incoming">
        <font-awesome-icon
          :icon="['fas', 'arrow-circle-up']"
          class="month_card__incoming_icon"
        />
        £{{ incoming.toFixed(2) }}
      </h5>
      <h5 class="month_card__outgoing">
        <font-awesome-icon
          :icon="['fas', 'arrow-circle-down']"
          class="month_card__outgoing_icon"
        />
        £{{ outgoing.toFixed(2) }}
      </h5>
    </div>
    <div class="month_card__actions">
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="month_card__action month_card__action--trash"
        @click="$emit('delete')"
      />
      <font-awesome-icon
        :icon="['fas', 'expand-alt']"
        class="month_card__action month_card__action--expand"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    date: { type: Date, required: true },
    net: { type: Number, required: true },
    incoming: { type: Number, required: true },
    outgoing: { type: Number, required: true },
  },
  computed: {
    getReadableDate(): string {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${monthNames[this.date.getMonth()]} ${this.date.getFullYear()}`;
    },
  },
});
</script>
