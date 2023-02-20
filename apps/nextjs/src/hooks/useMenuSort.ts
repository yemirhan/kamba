import { create } from "zustand";

type MenuSortState = {
  sortEnabled: boolean;
  setSortEnabled: (enabled: boolean) => void;
};

export const useMenuSort = create<MenuSortState>((set) => ({
  sortEnabled: false,
  setSortEnabled: (enabled: boolean) => set({ sortEnabled: enabled }),
}));
