import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
type UseWorkspaceType = {
  workspaceId: string | null;
  setWorkspaceId: (workspaceId: string) => void;
};

export const useWorkspace = create<UseWorkspaceType>()(
  persist(
    (set, get) => ({
      workspaceId: null,
      setWorkspaceId: (workspaceId) =>
        set({
          workspaceId,
        }),
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
