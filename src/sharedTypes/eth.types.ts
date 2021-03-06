export type EthereumNetwork = "kovan" | "mainnet";
export type Token =
  | "WBTC"
  | "PMGT"
  | "aUSDC"
  | "ETH"
  | "UNI"
  | "AAVE"
  | "YFI"
  | "REN";

export type ContractsAddressesMap = {
  [key in EthereumNetwork]: {
    ETH: string;
    WBTC: string;
    USDC: string;
    PMGT: string;
    PAXG: string;
    aUSDC: string;
    UNI: string;
    AAVE: string;
    YFI: string;
    REN: string;
    PortfolioBalancer: string;
  };
};

export type TokenDetailMap = {
  [key in Token]: {
    name: string;
    link: string;
    coingeckoId: string;
    assetClass: string;
    decimals: number;
  };
};

export type TokenAmounts = {
  [key in Token]: string;
};

export type UniswapAmounts = {
  [key in Token]: {
    amountOutMin: string;
    executionPrice: string;
    amountOutMinRaw: string;
  };
};

export type HistorcialPrices = {
  [key in Token]: number[];
};

export type NetworkMap = {
  [key: number]: EthereumNetwork;
};

export interface GasPrices {
  slow: number;
  standard: number;
  fast: number;
}
