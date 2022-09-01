import { createStore, ModuleTree } from 'vuex'

import misc from '@/store/wallet'
import { RootState } from '@/store/StoreInterfaces'

const modules: ModuleTree<RootState> = {
  misc
}

export default createStore({ modules })
