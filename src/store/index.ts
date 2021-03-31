import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

enum TransactionTypes {
  IN,
  OUT,
}
interface Transaction {
  id: string;
  type: TransactionTypes;
  description: string;
  amount: number;
}
interface Month {
  id: string;
  date: Date;
  transactions: Transaction[];
}
interface State {
  startingAmount: number;
  monthsData: Month[];
}

const state: State = {
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

const getters = {
  getMonthSummary: (state: State) => (monthId: string): MonthSummary => {
    const { id, date } = state.monthsData.find(
      (month) => month.id === monthId
    ) as Month;

    return {
      id,
      date,
      net: 200,
      outgoing: 150,
      incoming: 200,
    };
  },
};

const mutations = {
  addMonth(state: State) {
    const numberExistingMonths = state.monthsData.length;

    if (!numberExistingMonths) {
      const date = new Date();

      state.monthsData.push({
        id: uuidv4(),
        date: new Date(date.getFullYear(), date.getMonth(), 1),
        transactions: [],
      });
    } else {
      const previousDate = state.monthsData[numberExistingMonths - 1].date;

      state.monthsData.push({
        id: uuidv4(),
        date: new Date(previousDate.setMonth(previousDate.getMonth() + 1)),
        transactions: [],
      });
    }
  },
  deleteMonth: (state: State, monthId: string): void => {
    state.monthsData = state.monthsData.filter((month) => month.id !== monthId);
  },
};

export default createStore({
  getters,
  state,
  mutations,
  actions: {},
  modules: {},
});
