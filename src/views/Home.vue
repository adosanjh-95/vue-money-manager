<template>
  <div class="toolbar">
    <p class="toolbar__starting_amount">
      Starting amount: <strong>£{{ startingAmount.toFixed(2) }}</strong>
    </p>
    <button class="new_month_btn" @click="addMonth">
      <span class="new_month_btn__text">Add next month</span>
      <font-awesome-icon :icon="['fas', 'plus']" class="new_month_btn__icon" />
    </button>
  </div>

  <div class="months">
    <MonthSummaryCard
      v-for="month in monthsData"
      :key="month.id"
      v-bind="getMonthSummary(month.id)"
      @delete="deleteMonth(month.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import MonthSummaryCard from "@/components/MonthSummaryCard/MonthSummaryCard.vue";

export default defineComponent({
  computed: {
    ...mapState(["startingAmount", "monthsData"]),
    ...mapGetters(["getMonthSummary"]),
  },
  methods: {
    ...mapMutations(["deleteMonth"]),
    addMonth() {
      this.$store.commit("addMonth");
    },
  },
  components: {
    MonthSummaryCard,
  },
});
</script>
