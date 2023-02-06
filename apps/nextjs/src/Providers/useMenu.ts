import { create } from "zustand";

type UseMenuProp = {
  editCard: boolean;
  SetEditCard: () => void;
  hoverImage: boolean;
  SetHoverImage: () => void;
  editCategoryImage: boolean;
  SetEditCategoryImage: () => void;
  deleteItem: boolean;
  SetDeleteItem: () => void;
  editItem: boolean;
  setEditItem: () => void;
  hoverItemImage: boolean;
  SetHoverItemImage: () => void;
  editItemImage: boolean;
  SetEditItemImage: () => void;
  editIndex: number;
  SetEditIndex: (value: number) => void;
};

export const useMenu = create<UseMenuProp>((set) => ({
  editCard: false,
  SetEditCard: () => set((state) => ({ editCard: !state.editCard })),
  hoverImage: false,
  SetHoverImage: () => set((state) => ({ hoverImage: !state.hoverImage })),
  editCategoryImage: false,
  SetEditCategoryImage: () =>
    set((state) => ({ editCategoryImage: !state.editCategoryImage })),
  deleteItem: false,
  SetDeleteItem: () => set((state) => ({ deleteItem: !state.deleteItem })),
  editItem: false,
  setEditItem: () => set((state) => ({ editItem: !state.editItem })),
  hoverItemImage: false,
  SetHoverItemImage: () =>
    set((state) => ({ hoverItemImage: !state.hoverItemImage })),
  editItemImage: false,
  SetEditItemImage: () =>
    set((state) => ({ editItemImage: !state.editItemImage })),
  editIndex: 0,
  SetEditIndex: (value) => set(() => ({ editIndex: value })),
}));
