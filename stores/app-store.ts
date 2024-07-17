import { createStore } from 'zustand/vanilla';
import { VCProfile } from '@/models/vc_list';
import { produce } from 'immer';

export type FilterFundsOptions = {
  rounds: string[];
  check_size: string[];
  sectors: string[];
  locations: string[];
};

export type SelectedFundsFilterOptions = {
  round: string | null;
  check_size: string | null;
  sector: string | null;
  location: string | null;
};

export type AppState = {
  funds: VCProfile[];
  filter_funds_options: FilterFundsOptions;
  selected_funds_filter_options: SelectedFundsFilterOptions;
  funds_total: number;
  funds_page: number;
  modal_vc: VCProfile | null;
};

export type AppActions = {
  setFunds: (funds: VCProfile[]) => void;
  addFunds: (funds: VCProfile[]) => void;
  setFundPage: (page: number) => void;
  setFundTotal: (total: number) => void;
  setFundFilterOptions: (filter_options: FilterFundsOptions) => void;
  setFundSelectedFilterOptions: (selected_filter_options: SelectedFundsFilterOptions) => void;
  setFavoriteFund: (id: number, favorite: boolean) => void;
  openFundModal: (id: number) => void;
  closeFundModal: () => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return {
    funds_total: 0,
    funds: [],
    funds_page: 1,
    filter_funds_options: { rounds: [], check_size: [], sectors: [], locations: [] },
    selected_funds_filter_options: { round: null, check_size: null, sector: null, location: null },
    modal_vc: null,
  };
};

export const defaultInitState: AppState = initAppStore();

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>((set) => ({
    ...initState,

    setFundPage: (page) =>
      set(
        produce((state: AppState) => {
          state.funds_page = page;
        }),
      ),

    setFundTotal: (total) =>
      set(
        produce((state: AppState) => {
          state.funds_total = total;
        }),
      ),

    setFunds: (funds) =>
      set(
        produce((state: AppState) => {
          state.funds = funds;
        }),
      ),

    addFunds: (funds) =>
      set(
        produce((state: AppState) => {
          state.funds.push(...funds);
        }),
      ),

    setFundFilterOptions: (filter_options) =>
      set(
        produce((state: AppState) => {
          state.filter_funds_options = filter_options;
        }),
      ),

    setFavoriteFund: (id, favorite) =>
      set(
        produce((state: AppState) => {
          state.funds = state.funds.map((fund) => {
            if (fund.id === id) {
              fund.favorite = favorite;
            }
            return fund;
          });
        }),
      ),

    openFundModal: (id) =>
      set(
        produce((state: AppState) => {
          state.modal_vc = state.funds.find((fund) => fund.id === id) || null;
        }),
      ),

    closeFundModal: () =>
      set(
        produce((state: AppState) => {
          state.modal_vc = null;
        }),
      ),

    setFundSelectedFilterOptions: (selected_filter_options) =>
      set(
        produce((state: AppState) => {
          state.selected_funds_filter_options = selected_filter_options;
          state.funds = [];
          state.funds_page = 1;
          state.funds_total = 0;
        }),
      ),
  }));
};
