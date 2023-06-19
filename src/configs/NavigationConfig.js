import { SoundOutlined, OrderedListOutlined  } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}`,
  title: 'Menu',
  icon: SoundOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'playlist',
      path: `${APP_PREFIX_PATH}/playlist`,
      title: 'Playlist',
      icon: OrderedListOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'musics',
      path: `${APP_PREFIX_PATH}/musics`,
      title: 'Musics',
      icon: SoundOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
