import { ProductProps } from "@/utils/data/products"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import * as cartInMemory from "./helpers/cart-in-memory"

export type ProductCartProps = ProductProps & {
  quantity: number
}

type StateProps = {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useCardStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],

      add: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),

      remove: (producId: string) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, producId),
        })),

      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: "orders:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)