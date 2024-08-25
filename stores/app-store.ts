import { createStore } from 'zustand/vanilla';
import { VCProfile, StartupProfile } from '@/models/vc_list';
import { produce } from 'immer';

export type FilterStartupOptions = {
  traction: string[];
  sectors: string[];
  locations: string[];
};

export type SelectedStartupFilterOptions = {
  traction: string | null;
  sector: string | null;
  location: string | null;
  search_term: string | null;
};

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
  search_term: string | null;
};

export type AppState = {
  funds: VCProfile[];
  filter_funds_options: FilterFundsOptions;
  selected_funds_filter_options: SelectedFundsFilterOptions;
  funds_total: number;
  funds_page: number;

  startups: StartupProfile[];
  filter_startups_options: FilterStartupOptions;
  selected_startups_filter_options: SelectedStartupFilterOptions;
  startups_total: number;
  startups_page: number;

  modal_startup: StartupProfile | null;
  modal_vc: VCProfile | null;

  modal_update_startup: boolean;

  sign_in_stage: string | null;
  modal_sign_in: boolean;
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

  setStartups: (startups: StartupProfile[]) => void;
  addStartups: (startups: StartupProfile[]) => void;
  setStartupPage: (page: number) => void;
  setStartupTotal: (total: number) => void;
  setStartupFilterOptions: (filter_options: FilterStartupOptions) => void;
  setStartupSelectedFilterOptions: (selected_filter_options: SelectedStartupFilterOptions) => void;
  setFavoriteStartup: (id: number, favorite: boolean) => void;
  openStartupModal: (id: number) => void;
  openStartupModalWithValue: (id: StartupProfile) => void;

  closeStartupModal: () => void;

  closeUpdateStartupModal: () => void;
  openUpdateStartupModal: () => void;

  closeSignInModal: () => void;

  setSignInStage: (stage: string | null) => void;
  openSignInModal: () => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return {
    funds_total: 0,
    funds: [],
    funds_page: 1,
    filter_funds_options: {
      rounds: [],
      check_size: [],
      sectors: [],
      locations: [],
    },
    selected_funds_filter_options: {
      round: null,
      check_size: null,
      sector: null,
      location: null,
      search_term: null,
    },

    startups_total: 0,
    startups: [],
    startups_page: 1,
    filter_startups_options: { traction: [], sectors: [], locations: [] },
    selected_startups_filter_options: {
      traction: null,
      sector: null,
      location: null,
      search_term: null,
    },

    modal_startup: null,
    modal_vc: null,

    modal_update_startup: false,

    sign_in_stage: null,
    modal_sign_in: false,
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

    setStartupPage: (page) =>
      set(
        produce((state: AppState) => {
          state.startups_page = page;
        }),
      ),

    setStartupTotal: (total) =>
      set(
        produce((state: AppState) => {
          state.startups_total = total;
        }),
      ),

    setStartups: (startups) =>
      set(
        produce((state: AppState) => {
          state.startups = startups;
        }),
      ),

    addStartups: (startups) =>
      set(
        produce((state: AppState) => {
          state.startups.push(...startups);
        }),
      ),

    setStartupFilterOptions: (filter_options) =>
      set(
        produce((state: AppState) => {
          state.filter_startups_options = filter_options;
        }),
      ),

    setFavoriteStartup: (id, favorite) =>
      set(
        produce((state: AppState) => {
          state.startups = state.startups.map((fund) => {
            if (fund.id === id) {
              fund.favorite = favorite;
            }
            return fund;
          });
        }),
      ),

    openStartupModal: (id) =>
      set(
        produce((state: AppState) => {
          state.modal_startup = state.startups.find((startup) => startup.id === id) || null;
        }),
      ),

    openStartupModalWithValue: (startup) =>
      set(
        produce((state: AppState) => {
          state.modal_startup = startup;
        }),
      ),

    closeStartupModal: () =>
      set(
        produce((state: AppState) => {
          state.modal_startup = null;
        }),
      ),

    setStartupSelectedFilterOptions: (selected_filter_options) =>
      set(
        produce((state: AppState) => {
          state.selected_startups_filter_options = selected_filter_options;
          state.startups = [];
          state.startups_page = 1;
          state.startups_total = 0;
        }),
      ),

    closeUpdateStartupModal: () =>
      set(
        produce((state: AppState) => {
          state.modal_update_startup = false;
        }),
      ),

    openUpdateStartupModal: () =>
      set(
        produce((state: AppState) => {
          state.modal_update_startup = true;
        }),
      ),

    closeSignInModal: () =>
      set(
        produce((state: AppState) => {
          state.modal_sign_in = false;
        }),
      ),

    openSignInModal: () =>
      set(
        produce((state: AppState) => {
          state.modal_sign_in = true;
        }),
      ),

    setSignInStage: (stage) =>
      set(
        produce((state: AppState) => {
          state.sign_in_stage = stage;
        }),
      ),
  }));
};
