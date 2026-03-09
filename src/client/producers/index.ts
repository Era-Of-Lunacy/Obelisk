import { combineProducers, InferState } from "@rbxts/reflex";
import { useProducer, UseProducerHook } from "@rbxts/react-reflex";
import { loadingSlice } from "./loading";

export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
  loading: loadingSlice,
});

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
