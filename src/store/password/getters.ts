import { RootState } from '@/store/StoreInterfaces'
import { PasswordGetters, PasswordState } from '@/store/password/Interfaces'
import { GetterTree } from 'vuex'
import WalletObject from '@/interfaces/IWalletObject'
import PasswordPair from "@/interfaces/IPasswordPair";

const getters: GetterTree<PasswordState, RootState> & PasswordGetters = {
  getDomainPasswords (state: PasswordState, domain: string): PasswordPair[] {
    return Object.keys(state.passwords[domain]).map(key => ({ username: key, password: state.passwords[domain][key]})) || []
  },
  get (state: PasswordState): WalletObject {
    return state.wallets[state.activeWallet] || { name: 'None Found', address: '', seed: '' }
  }
}

export default getters
