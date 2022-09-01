import WalletObject from '@/interfaces/IWalletObject'
import PasswordContentsObject from '@/interfaces/IPasswordContentsObject'
import AllPasswordsObject from '@/interfaces/IAllPasswordsObject'

export interface PasswordState {
  contents: PasswordContentsObject,
  passwords: AllPasswordsObject
}

export interface PasswordGetters {
  getActiveWalletName(state: PasswordState): string;
  getActiveWallet(state: PasswordState): WalletObject;
}
