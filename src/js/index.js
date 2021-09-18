export default function RecursiveMenu(data = dataSet) {
  const clickListner = (event) => {
    [...event.target.children].forEach(element => {
      if (element.classList.contains('menu__item')) {
        element.classList.toggle('menu__item_hidden')
      }
      
    })
  }
  const createItemContent = (item) => {
    if (!item || !item.hasOwnProperty('items') || !item.hasOwnProperty('content')) {
      return null
    }

    const itemContent = document.createElement('div')
    itemContent.classList.add('menu__content')

    const itemText = document.createElement('span')
    itemText.classList.add('menu__text')
    itemText.innerText = item.content

    let itemChevronIcon = document.createElement('i')
    itemChevronIcon.classList.add('menu__icon', 'fas', 'fa-sm')
    let itemNestedItems = null
    if (item.items.length) {
      itemChevronIcon.classList.add('fa-chevron-up')
      itemNestedItems = createMenuList(item.items)
    }

    const itemFolderIcon = document.createElement('i')
    itemFolderIcon.classList.add('menu__icon', 'fas', 'fa-folder', 'fa-lg')

    itemChevronIcon && itemContent.appendChild(itemChevronIcon)
    itemContent.appendChild(itemFolderIcon)
    itemContent.appendChild(itemText)

    return itemNestedItems ? [itemContent, ...itemNestedItems] : [itemContent]
  }
  const createMenuList = (data, isroot = false) => {
    return data.map((item) => {
      const menuListItem = document.createElement('div')
      menuListItem.classList.add('menu__item')
      !isroot && menuListItem.classList.add('menu__item_hidden')

      const itemContent = createItemContent(item)
      if (itemContent) {    
        menuListItem.append(...itemContent)
      }

      return menuListItem
    })
  }

  const menu = document.createElement('div')
  menu.classList.add('menu')
  menu.addEventListener('click', clickListner)
  const menuList = createMenuList(data, true)
  menu.append(...menuList)

  return menu
}
