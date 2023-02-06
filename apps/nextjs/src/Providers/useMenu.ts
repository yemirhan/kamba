import { create } from "zustand";
import { RouterOutputs } from "@acme/api";

type useMenuProp = {
  menu: RouterOutputs["menu"]["all"];
  menuSet: (value: RouterOutputs["menu"]["all"]) => void;
  imageSet: ({
    value,
    indexvalue,
  }: {
    value: string;
    indexvalue: number;
  }) => void;
  isEdit: boolean;
  setIsEdit: () => void;
  isDelete: boolean;
  setIsDelete: () => void;
  itemIsEdit: boolean;
  setItemIsEdit: () => void;
};

export const useMenu = create<useMenuProp>((set) => ({
  menu: [],
  menuSet: (value) => set(() => ({ menu: [...value] })),
  imageSet: ({ value, indexvalue }) =>
    set((state) => {
      //@ts-ignore
      const effectedObject = [...state.menu].splice(indexvalue, 1, {
        ...state.menu[indexvalue],
        image: value,
      });
      return { menu: effectedObject };
    }),
  isEdit: false,
  setIsEdit: () => set((state) => ({ isEdit: !state.isEdit })),
  isDelete: false,
  setIsDelete: () => set((state) => ({ isDelete: !state.isDelete })),
  itemIsEdit: false,
  setItemIsEdit: () => set((state) => ({ itemIsEdit: !state.itemIsEdit })),
}));
