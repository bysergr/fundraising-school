import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserState = {
  nickname: string;
  email: string;
  contact_email: string;
  image_url: string;
  is_from_startups: boolean;
};

export type UserActions = {
  updateUserInfo: (
    nickname: string,
    contact_email: string,
    email: string,
    image_url: string,
    is_from_startups: boolean,
  ) => void;
  updateNickName: (nickname: string) => void;
  updateEmail: (email: string) => void;
  updateContactEmail: (contact_email: string) => void;
  updateImageURL: (image_url: string) => void;
  updateIsFromStartups: (is_from_startups: boolean) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return { contact_email: '', email: '', nickname: '', image_url: '', is_from_startups: false };
};

export const defaultInitState: UserState = {
  nickname: '',
  email: '',
  contact_email: '',
  image_url: '',
  is_from_startups: false,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,

        updateUserInfo: (nickname, contact_email, email, image_url, is_from_startups) =>
          set(() => ({
            contact_email: contact_email,
            email: email,
            nickname: nickname,
            image_url: image_url,
            is_from_startups: is_from_startups,
          })),

        updateNickName: (nickname) => set((state) => ({ ...state, nickname: nickname })),

        updateContactEmail: (contact_email) =>
          set((state) => ({ ...state, contact_email: contact_email })),

        updateEmail: (email) => set((state) => ({ ...state, email: email })),

        updateImageURL: (image_url) => set((state) => ({ ...state, image_url: image_url })),

        updateIsFromStartups: (is_from_startups) =>
          set((state) => ({ ...state, is_from_startups: is_from_startups })),
      }),
      {
        name: 'user-store', // nombre de almacenamiento en el localStorage
        storage: createJSONStorage(() => localStorage), // cambiar localStorage a cualquier otro storage si es necesario
      },
    ),
  );
};
