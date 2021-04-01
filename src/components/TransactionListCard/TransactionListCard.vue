<template>
  <div class="transaction_list_card">
    <div class="transaction_list_card__info">
      <h2 class="transaction_list_card__title">
        {{ title }}
        <button
          class="transaction_list_card__trash_btn"
          @click="$emit('delete-parent')"
          v-if="!hideDeleteParent"
        >
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="transaction_list_card__trash_btn_icon"
          />
        </button>
      </h2>
      <!-- Fix issue here when these are not present and grid has a lot of empty space -->
      <h5 v-if="net" class="transaction_list_card__net">£{{ net }}</h5>
      <h5 v-if="incoming" class="transaction_list_card__incoming">
        £{{ incoming }}
      </h5>
      <h5 v-if="outgoing" class="transaction_list_card__outgoing">
        £{{ outgoing }}
      </h5>
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

    <div class="transaction_list">
      <TransactionListItem
        v-for="transaction in getFilteredTransactions"
        :key="transaction.id"
        v-bind="transaction"
        @delete="$emit('delete-transaction', transaction.id)"
        @edit="
          $emit('edit-transaction', {
            id: transaction.id,
            type: 'Out',
            amount: 20.5,
            description: 'I am an edited transaction added as a dummy',
          })
        "
      />
    </div>

    <button
      class="transaction_list_card__new_transaction_btn"
      @click="addTransaction"
    >
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
import TransactionListItem from "../TransactionListItem/TransactionListItem.vue";

export default defineComponent({
  components: { TransactionListItem },
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
    hideDeleteParent: {
      type: Boolean,
      default: false,
    },
    net: {
      type: Number,
      default: null,
    },
    incoming: {
      type: Number,
      default: null,
    },
    outgoing: {
      type: Number,
      default: null,
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
    addTransaction() {
      this.$emit("add-transaction", {
        type: "In",
        amount: 10.5,
        description: "I am a new transaction added as a dummy",
      });
      this.selectedFilter = "All";
    },
  },
  computed: {
    getFilteredTransactions(): Transaction[] {
      if (this.selectedFilter === "All") {
        return this.transactions;
      } else {
        return this.transactions.filter(
          (transaction) => transaction.type === this.selectedFilter
        );
      }
    },
  },
});
</script>
