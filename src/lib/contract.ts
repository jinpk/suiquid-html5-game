import { JsonRpcProvider, devnetConnection } from "@mysten/sui.js";
export const SMART_CONTRACT_ADDRESS =
  "0x1e32c5e09a43f0e8a58d6d3077e07b143df5452b935de4eeb60ffb3a83f0a75a";

export const suiProvider = new JsonRpcProvider(devnetConnection);