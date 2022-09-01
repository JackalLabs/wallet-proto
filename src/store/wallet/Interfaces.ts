import WalletObject from '@/interfaces/IWalletObject'
import AllWalletsObject from "@/interfaces/IAllWalletsObject";

export interface WalletState {
  wallets: AllWalletsObject,
  activeWallet: string
}

export interface WalletGetters {
  getActiveWalletName(state: WalletState): string;
  getActiveWallet(state: WalletState): WalletObject;
}
