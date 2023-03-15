import React from 'react'
import {Menu} from 'semantic-ui-react'

export default function SubMenu({Sections}) {

  const [activeItem, setActiveItem] = React.useState('Usuarios')
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return {
    jsx: (
      <div>
        <Menu pointing >
          {Sections && Sections.map((section) =>
            <Menu.Item
            name={section.name}
            active={activeItem === section.name}
            onClick={handleItemClick}
            />
          )}
        </Menu>
      </div>
    ),
    activeItem: activeItem
  }
}