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
  date: number;
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
      date: new Date(date),
      net: 200,
      outgoing: 150,
      incoming: 200,
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
        transactions: [],
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
