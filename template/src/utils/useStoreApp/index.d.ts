import { StoreType } from "@stores";

export function useStoreApp<TState = StoreType, TSelected = unknown>(
    selector: (state: TState) => TSelected,
): TSelected;
