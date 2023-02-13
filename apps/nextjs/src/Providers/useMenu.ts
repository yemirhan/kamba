import { create } from "zustand";

type UseMenuProp = {
  isNewMenu: boolean;
  SetIsNewMenu: () => void;
  isEditMenu: boolean;
  SetIsEditMenu: () => void;
  isEditCategoryImage: boolean;
  SetIsEditCategoryImage: () => void;
};

export const useMenu = create<UseMenuProp>((set) => ({
  isNewMenu: false,
  SetIsNewMenu: () => set((state) => ({ isNewMenu: !state.isNewMenu })),
  isEditMenu: false,
  SetIsEditMenu: () => set((state) => ({ isEditMenu: !state.isEditMenu })),
  isEditCategoryImage: false,
  SetIsEditCategoryImage: () =>
    set((state) => ({ isEditCategoryImage: !state.isEditCategoryImage })),
}));
