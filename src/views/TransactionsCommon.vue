<template>
  <TransactionListCard
    title="Common Transactions"
    hideDeleteParent
    :transactions="commonTransactions"
    class="transactions"
    @delete-transaction="
      (transactionId) => deleteCommonTransaction(transactionId)
    "
    @add-transaction="(transaction) => addCommonTransaction(transaction)"
    @edit-transaction="(transaction) => editCommonTransaction(transaction)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import TransactionListCard from "@/components/TransactionListCard/TransactionListCard.vue";

export default defineComponent({
  computed: {
    ...mapState(["commonTransactions"]),
  },
  methods: {
    ...mapMutations([
      "addCommonTransaction",
      "editCommonTransaction",
      "deleteCommonTransaction",
    ]),
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
