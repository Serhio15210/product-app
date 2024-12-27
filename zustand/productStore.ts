import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/api/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProductStore {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
}

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.uuid !== id),
        })),
      resetCart: () =>
        set({
          cart: [],
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useProductStore;
