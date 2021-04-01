<template>
  <TransactionListCard
    :title="getTitle"
    :net="getMonthInformation.net"
    :incoming="getMonthInformation.incoming"
    :outgoing="getMonthInformation.outgoing"
    :transactions="getMonthInformation.transactions"
    @delete="deleteMonth"
    class="transactions"
  />
</template>

<script lang="ts">
import TransactionListCard from "@/components/TransactionListCard/TransactionListCard.vue";
import { FullMonthData } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteMonth(): void {
      this.$store.commit("deleteMonth", this.id);
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    getMonthInformation(): FullMonthData {
      // being re-run after delete, could protect against it by checking what comes back
      return this.$store.getters.getMonthData(this.id);
    },
    getTitle(): string {
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

      return `${
        monthNames[this.getMonthInformation.date.getMonth()]
      } ${this.getMonthInformation.date.getFullYear()}`;
    },
  },
  components: {
    TransactionListCard,
  },
});
</script>

<style lang="scss" scoped>
.transactions {
  margin-bottom: 4rem;
}
</style>
