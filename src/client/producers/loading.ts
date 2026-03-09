import { createProducer } from "@rbxts/reflex";

export interface LoadingState {
  assetName: string;
  totalAssets: number;
  loadedAssets: number;
}

const initialState: LoadingState = {
  assetName: "Initializing...",
  totalAssets: 0,
  loadedAssets: 0,
};

export const loadingSlice = createProducer(initialState, {
  setAssetName: (state, name: string) => ({
    ...state,
    assetName: name,
  }),

  setTotalAssets: (state, count: number) => ({
    ...state,
    totalAssets: count,
  }),

  setLoadedAssets: (state, count: number) => ({
    ...state,
    loadedAssets: count,
  }),
});
