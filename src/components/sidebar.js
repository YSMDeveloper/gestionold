import { Sidebar, Menu, Icon } from 'semantic-ui-react'

export default function SideBar() {

return (
<Sidebar as={Menu} animation='push' icon='labeled' vertical visible width='very thin'>
  <Menu.Item as='a'>
    <Icon name='home' />
    Home
  </Menu.Item>
  <Menu.Item as='a'>
    <Icon name='gamepad' />
    Games
  </Menu.Item>
  <Menu.Item as='a'>
    <Icon name='camera' />
    Channels
  </Menu.Item>
</Sidebar>
)

}

