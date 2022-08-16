<template>
  <div class="home">
    <div v-if="!alreadyInit" class="new-user-prompt">
      <h3>Hello there, looks like you are new here!</h3>
      <button @click="createAccount">Create Account</button>
    </div>
    <div v-if="alreadyInit" class="content">
      <div class="topper">
        <Breadcrumbs @new-loc="breadSelection" :location="getActiveDir.substring(1)"/>
        <button class="settings btn">
          <component :is="svg.settings" />
        </button>
      </div>
      <div>
        <div class="folder-top">
          <h2>Available Folders</h2>
          <button class="new-folder-btn" @click="createNewFolder">+ New Folder</button>
        </div>
        <Folders :dirs="getCurrentFolders" :mode="mode"/>
      </div>
      <div>
        <div class="filebar">
          <h2>Files</h2>
          <div class="options">
            <button class="listmode btn" :class="{activemode: mode == 'list'}">
              <component :is="svg.listMode" />
            </button>
            <button class="tilemode btn" :class="{activemode: mode == 'tile'}">
              <component :is="svg.tileMode" />
            </button>
            <button class="sortorder btn">
              <div class="svg">
                <component :is="svg.sortOrder" />
              </div>
              <span>Name</span>
            </button>
            <button class="select btn">
              <span>Select</span>
            </button>
          </div>
        </div>
        <!-- <h3 v-if="getCurrentFiles.length == 0">Empty...</h3> -->
        <Files :files="getCurrentFiles" :fetch="mkDownload" :mode="mode" :url="getNodeUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import Breadcrumbs from '@/components/Breadcrumbs'
import Folders from '@/components/Folders'
import Files from '@/components/Files'
import SettingsSvg from '@/assets/svg/SettingsIcon'
import ListModeSvg from '@/assets/svg/ListIcon'
import TileModeSvg from '@/assets/svg/SquaresIcon'
import SortOrderSvg from '@/assets/svg/SortIcon'

import { onAccountChange, refContract, viewingKeyManager } from '@stakeordie/griptape.js'

import { deleteTarget, buildDir, saveDir, loadDirContents, initDirs } from '@/helpers/util'
import { fetchFile } from '@/helpers/fetch'
import { mapGetters, mapMutations } from 'vuex'

onAccountChange(() => {
  window.location.reload()
})

@Options({
  components: {
    Breadcrumbs,
    Folders,
    Files
  },
  props: {},
  data: () => ({
    svg: {
      settings: SettingsSvg,
      listMode: ListModeSvg,
      tileMode: TileModeSvg,
      sortOrder: SortOrderSvg
    },
    dirData: {
      dirChildren: [],
      fileChildren: [],
      whoAmI: ''
    },
    alreadyInit: true
  }),
  methods: {
    ...mapMutations([
      'updateCurrentFolders',
      'updateCurrentFiles',
      'updateActiveDir',
      'updateLoadingStatus',
      'updateAllMessages'
    ]),
    async mkDownload (record) {
      await this.contract.get_contents(this.viewingKey(), record.longName)
        .then(async (resp) => {
          console.dir(resp)
          const fullRecord = {
            ...JSON.parse(resp.file.contents),
            name: record.name
          }
          const fileData = await fetchFile(fullRecord, this.nodeUrl)
          const file = new File([fileData.data], fileData.name)
          const aTag = document.createElement('a')
          aTag.href = URL.createObjectURL(file)
          aTag.download = fileData.name
          aTag.target = '_blank'
          aTag.click()
        })
    },
    async setVk (exists) {
      const refCon = refContract(this.contract.id)
      await refCon.create_viewing_key()
        .then(resp => {
          const respObj = resp.parse()
          if (exists) {
            viewingKeyManager.set(refCon, respObj.create_viewing_key.key)
          } else {
            viewingKeyManager.add(refCon, respObj.create_viewing_key.key)
          }
        })
        .catch(() => console.warn('Set viewing key failed'))
      location.reload()
    },
    async verifyVk () {
      return await this.contract.get_contents(this.viewingKey(), `${this.getAddress}/`)
        .then(resp => {
          return true
        })
        .catch(() => {
          console.warn('Viewing key verification failed')
          return false
        })
    },
    async processVk (key) {
      if (key) {
        const valid = await this.verifyVk()
        if (valid) {
          return true
        } else {
          await this.setVk(true)
        }
      } else {
        console.warn('No Viewing Key Saved, Creating...')
        await this.setVk(false)
      }
    },
    viewingKey () {
      return viewingKeyManager.get(this.contract.at)
    },
    async checkYouUpBro () {
      const res = await this.contract.you_up_bro()
      this.alreadyInit = res.init
      return res.init
    },
    async createAccount () {
      this.updateLoadingStatus(true)
      const res = await this.contract.init_address()
      // const res = await this.contract.init_address(['','','',''],['beta/', 'www/', 'tmp/'])
      const resObj = res.parse()
      // Save viewing key to localStorage
      const refCon = refContract(this.contract.id)
      const vkInLocalStorage = this.viewingKey()
      // set() for overwriting existing vk, add() when there is no vk in localstorage :shrug:
      if (vkInLocalStorage) {
        viewingKeyManager.set(refCon, resObj.create_viewing_key.key)
      } else {
        viewingKeyManager.add(refCon, resObj.create_viewing_key.key)
      }
      // Reload Page
      location.reload()
    },
    handleError (err, msg) {
      console.warn(msg)
      console.error(err)
      this.processing = false
    },
    async createNewFolder () {
      const folderName = prompt('Enter new folder name:').trim()
      if (folderName === 'bye_fren') {
        const text = confirm('You are about to delete EVERYTHING!\n\nCool with that?')
        if (text === true) {
          await this.getJackalContract.forget_me()
          console.log('bye bye')
          location.reload()
        }
      } else if (folderName === null || folderName.length === 0) {
        // do nothing
      } else if (folderName !== null || folderName.length > 0) {
        this.updateLoadingStatus(true)
        const newDirectory = `${this.getActiveDir}/${folderName}/`
        await buildDir(newDirectory)
        loadDirContents(this.getActiveDir)
        this.updateLoadingStatus(false)
      }
    },
    breadSelection (data) {
      const { index, location } = data
      let newPath = ''
      location.map((e, i) => {
        if (i <= index) {
          newPath = `${newPath}/${e}`
        } else {
          this.updateCurrentFiles([])
          this.updateCurrentFolders([])
          this.updateActiveDir(newPath)
          loadDirContents(newPath)
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getAddress',
      'getNodeUrl',
      'getActiveDir',
      'getCurrentFolders',
      'getCurrentFiles',
      'getJackalContract'
    ]),
    contract () {
      return this.getJackalContract
    }
  },
  mounted () {
    const init = async () => {
      if (this.getAddress === '' || this.getAddress == null) {
        setTimeout(() => {
          init()
        }, 500)
        return null
      }

      this.updateLoadingStatus(true)

      // Check if user already init
      const imUp = await this.checkYouUpBro()
      if (imUp) {
        // Check vk
        const vk = await this.processVk(this.viewingKey())
        if (vk) {
          // check if beta/ folder has already been made
          let betaFolder
          try {
            betaFolder = await this.contract.get_contents(this.viewingKey(), `${this.getAddress}/beta/`)
          } catch (error) {
            betaFolder = false
          }
          // if beta folder doesn't exist, go ahead and create
          // betaFolder || await buildDir('/beta/')
          betaFolder || await initDirs(['/beta/', '/www/'])
            .catch(err => {
              console.error('/beta Creation Failed', err)
            })

          loadDirContents(this.getActiveDir)
        }
      }

      this.updateLoadingStatus(false)
    }

    init()
  }
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  padding: 0 50px;
}
.home::-webkit-scrollbar {
    display: none;
}
h2 {
  margin-bottom: 10px;
}
h3 {
  width: fit-content;
  margin: 3rem auto;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 24px;
}
.topper {
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
}
.filebar {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.options {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}
//Buttons
.btn {
  border: 0;
  box-shadow: none;
  background: none;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: large;
}
.settings {
  height: 53px;
  width: 60px;
  margin-left: 30px;
  background: #0B152C;
  border-radius: 14px;
  align-items: center;
}
.settings component {
  height: 23.5px;
  width: 21px;
  background: #757B87;
}
.folder-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.new-folder-btn{
  color: #C0C5CE;
  background: none;
  border: none;
}
.listmode {
  height: 46px;
  width: 46px;
}
.listmode component {
  height: 10px;
  width: 12px;
  background: #C0C5CE;
}
.tilemode {
  height: 46px;
  width: 46px;
}
.tilemode component {
  height: 10px;
  width: 10px;
  background: #C0C5CE;
}
.sortorder {
  height: 46px;
  width: fit-content;
  color: #C0C5CE;
}
$SVGSize: 20px;

.sortorder > .svg {
  margin-right: 5px;
  width: $SVGSize;
  height: $SVGSize;
}

.btn > svg {
  width: $SVGSize;
  height: $SVGSize;
}

.svg > svg {
  width: 100%;
  height: 100%;
}

.select {
  height: 46px;
  width: fit-content;
  color: #C0C5CE;
}
//End Buttons

.activemode svg path {
  fill: #08B4B2;
}
</style>
