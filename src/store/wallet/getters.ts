import { RootState } from '@/store/StoreInterfaces'
import { WalletGetters, WalletState } from '@/store/wallet/Interfaces'
import { GetterTree } from 'vuex'
import WalletObject from '@/interfaces/IWalletObject'

const getters: GetterTree<WalletState, RootState> & WalletGetters = {
  getActiveWalletName (state: WalletState): string {
    return state.activeWallet || ''
  },
  getActiveWallet (state: WalletState): WalletObject {
    return state.wallets[state.activeWallet] || { name: 'None Found', address: '', seed: '' }
  }
}

export default getters
