import { MutationTree } from 'vuex'
import { PasswordState } from '@/store/password/Interfaces'
import PasswordContentsObject from '@/interfaces/IPasswordContentsObject'
import AllPasswordsObject from '@/interfaces/IAllPasswordsObject'
import PasswordPair from "@/interfaces/IPasswordPair";

const mutations: MutationTree<PasswordState> = {
  loadPasswordContents: (state: PasswordState, payload: PasswordContentsObject): void => {
    state.contents = payload
  },
  loadAllPasswords: (state: PasswordState, payload: AllPasswordsObject): void => {
    state.passwords = payload
  },
  addPassword: (state: PasswordState, payload: { domain: string, newPassword: PasswordPair }): void => {
    state.passwords = payload
  }
}

export default mutations
