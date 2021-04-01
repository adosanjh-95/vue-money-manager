import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

enum TransactionTypes {
  IN = "In",
  OUT = "Out",
}
interface TransactionDetails {
  type: TransactionTypes;
  description: string;
  amount: number;
}
export interface Transaction extends TransactionDetails {
  id: string;
}
interface Month {
  id: string;
  date: number;
  transactions: Transaction[];
}
interface State {
  startingAmount: number;
  commonTransactions: Transaction[];
  monthsData: Month[];
}

const state: State = {
  commonTransactions: [],
  startingAmount: 200,
  monthsData: [],
};

interface MonthSummary {
  id: string;
  date: Date;
  net: number;
  outgoing: number;
  incoming: number;
}

export interface FullMonthData {
  date: Date;
  transactions: Transaction[];
  net: number;
  outgoing: number;
  incoming: number;
}

interface AddTransactionPayload extends TransactionDetails {
  monthId: string;
}

interface DeleteTransactionPayload {
  monthId: string;
  transactionId: string;
}
interface EditTransactionPayload extends AddTransactionPayload {
  id: string;
}

const getters = {
  getMonthSummary: (state: State) => (monthId: string): MonthSummary => {
    const { id, date } = state.monthsData.find(
      (month) => month.id === monthId
    ) as Month;

    return {
      id,
      date: new Date(date),
      net: 200,
      outgoing: 150,
      incoming: 200,
    };
  },
  getMonthData: (state: State) => (monthId: string): FullMonthData => {
    const { date, transactions } = state.monthsData.find(
      (month) => month.id === monthId
    ) as Month;

    return {
      date: new Date(date),
      net: 200,
      outgoing: 150,
      incoming: 200,
      transactions,
    };
  },
};

const mutations = {
  initialiseStore(state: State): void {
    if (localStorage.getItem("store")) {
      Object.assign(state, JSON.parse(localStorage.getItem("store") as string));
    }
  },
  addMonth(state: State) {
    const numberExistingMonths = state.monthsData.length;

    if (!numberExistingMonths) {
      const date = new Date();

      state.monthsData.push({
        id: uuidv4(),
        date: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
        transactions: [...state.commonTransactions],
      });
    } else {
      const previousDate = new Date(
        state.monthsData[numberExistingMonths - 1].date
      );

      state.monthsData.push({
        id: uuidv4(),
        date: new Date(
          previousDate.setMonth(previousDate.getMonth() + 1)
        ).getTime(),
        transactions: [...state.commonTransactions],
      });
    }
  },
  deleteMonth: (state: State, monthId: string): void => {
    state.monthsData = state.monthsData.filter((month) => month.id !== monthId);
  },
  addTransaction: (state: State, payload: AddTransactionPayload): void => {
    const { monthId, type, amount, description } = payload;

    const targetMonth = state.monthsData.findIndex(
      (month) => month.id === monthId
    );

    state.monthsData[targetMonth].transactions.push({
      id: uuidv4(),
      type,
      amount,
      description,
    });
  },
  deleteTransaction: (state: State, payload: DeleteTransactionPayload) => {
    const { monthId, transactionId } = payload;

    const targetMonth = state.monthsData.findIndex(
      (month) => month.id === monthId
    );

    state.monthsData[targetMonth].transactions = state.monthsData[
      targetMonth
    ].transactions.filter((transaction) => transaction.id !== transactionId);
  },
  editTransaction: (state: State, payload: EditTransactionPayload) => {
    const { monthId, id, amount, description, type } = payload;

    const targetMonthIndex = state.monthsData.findIndex(
      (month) => month.id === monthId
    );

    const targetMonth = state.monthsData[targetMonthIndex];

    const targetTransactionIndex = targetMonth.transactions.findIndex(
      (transaction) => transaction.id === id
    );

    const updatedTransaction = {
      ...targetMonth.transactions[targetTransactionIndex],
      amount,
      description,
      type,
    };

    const updatedTransactions = [
      ...targetMonth.transactions.slice(0, targetTransactionIndex),
      updatedTransaction,
      ...targetMonth.transactions.slice(targetTransactionIndex + 1),
    ];

    targetMonth.transactions = updatedTransactions;
  },
  addCommonTransaction: (state: State, payload: TransactionDetails) => {
    state.commonTransactions.push({
      id: uuidv4(),
      ...payload,
    });
  },
  deleteCommonTransaction: (state: State, transactionId: string) => {
    state.commonTransactions = state.commonTransactions.filter(
      (transaction) => transaction.id !== transactionId
    );
  },
  editCommonTransaction: (state: State, payload: Transaction) => {
    const { id, type, amount, description } = payload;

    const targetTransactionIndex = state.commonTransactions.findIndex(
      (transaction) => transaction.id === id
    );

    const updatedTransaction = {
      ...state.commonTransactions[targetTransactionIndex],
      amount,
      description,
      type,
    };

    const updatedTransactions = [
      ...state.commonTransactions.slice(0, targetTransactionIndex),
      updatedTransaction,
      ...state.commonTransactions.slice(targetTransactionIndex + 1),
    ];

    state.commonTransactions = updatedTransactions;
  },
};

export default createStore({
  getters,
  state,
  mutations,
  actions: {},
  modules: {},
});
