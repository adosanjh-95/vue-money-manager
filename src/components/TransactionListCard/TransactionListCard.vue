<template>
  <div class="transaction_list_card">
    <div class="transaction_list_card__info">
      <h2 class="transaction_list_card__title">
        {{ title }}
        <button class="transaction_list_card__trash_btn">
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="transaction_list_card__trash_btn_icon"
            @click="$emit('delete')"
          />
        </button>
      </h2>
      <h5 class="transaction_list_card__net">£{{ net }}</h5>
      <h5 class="transaction_list_card__incoming">£{{ incoming }}</h5>
      <h5 class="transaction_list_card__outgoing">£{{ outgoing }}</h5>
      <div class="transaction_list_card__filters">
        <font-awesome-icon
          :icon="['fas', 'money-check']"
          :class="[
            'transaction_list_card__filter',
            {
              'transaction_list_card__filter--active': selectedFilter === 'All',
            },
          ]"
          @click="setSelectedFilter('All')"
        />
        <font-awesome-icon
          :icon="['fas', 'arrow-up']"
          :class="[
            'transaction_list_card__filter',
            {
              'transaction_list_card__filter--active': selectedFilter === 'In',
            },
          ]"
          @click="setSelectedFilter('In')"
        />
        <font-awesome-icon
          :icon="['fas', 'arrow-down']"
          :class="[
            'transaction_list_card__filter',
            {
              'transaction_list_card__filter--active': selectedFilter === 'Out',
            },
          ]"
          @click="setSelectedFilter('Out')"
        />
      </div>
    </div>

    <!-- Need Transaction Cards here -->
    <div class="transaction_list"></div>

    <button class="transaction_list_card__new_transaction_btn">
      <font-awesome-icon
        :icon="['fas', 'plus']"
        class="transaction_list_card__new_transaction_btn_icon"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { Transaction } from "@/store";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emit: ["delete"],
  data() {
    return {
      selectedFilter: "All",
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    net: {
      type: Number,
      required: true,
    },
    incoming: {
      type: Number,
      required: true,
    },
    outgoing: {
      type: Number,
      required: true,
    },
    transactions: {
      type: Array as PropType<Transaction[]>,
      default: [],
    },
  },
  methods: {
    setSelectedFilter(value: string): void {
      this.selectedFilter = value;
    },
  },
});
</script>
