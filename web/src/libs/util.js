const util = {

}
util.title = function (title) {
  title = title || 'vue.quasar.admin'
  window.document.title = title
}

util.getMenuByName = function (name, menulist) {
  let menu = {}
  const forFn = function (name, menulist) {
    for (var item of menulist) {
      if (item.name === name) {
        menu = item
      } else {
        if (item.children && item.children.length > 0) {
          forFn(name, item.children)
        }
      }
      if (menu.name) {
        break
      }
    }
  }
  forFn(name, menulist)
  return menu
}

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}
util.getParentMenusByName = function (openAccesseMenu, name) {
  const temp = []
  const forFn = function (openAccesseMenu, name) {
    for (var item of openAccesseMenu) {
      if (item.name === name && item.path !== '/') {
        temp.push(item)
        forFn(openAccesseMenu, item.parentName)
      }
    }
  }
  forFn(openAccesseMenu, name)
  temp.reverse()
  return temp
}

util.handleTitle = function (vm, item) {
  return item.title
}

util.setCurrentPath = function (vm, name) {
  const openAccesseMenu = vm.$store.state.app.openAccessMenu
  const menulistWithParent = util.getParentMenusByName(openAccesseMenu, name)
  const currentPathArr = []
  if (!menulistWithParent.some(item => {
    return item.name === 'home_index'
  })) {
    currentPathArr.push({
      title: vm.$t('Home'),
      path: '/home',
      name: 'home_index'
    })
  }
  currentPathArr.push(...menulistWithParent)
  vm.$store.commit('setCurrentPath', currentPathArr)
}
util.setCurrentModule = function (vm, name) {
  const openAccesseMenu = vm.$store.state.app.openAccessMenu
  const moduleList = vm.$store.state.app.moduleList
  const currentModule = vm.$store.state.app.currentModule
  const menulistWithParent = util.getParentMenusByName(openAccesseMenu, name)
  if (menulistWithParent.length > 0) {
    const moduleName = menulistWithParent[0].name
    if (moduleList.some(item => {
      return item.name === moduleName
    }) && currentModule !== moduleName) {
      vm.$store.dispatch('changeModule', moduleName)
    }
  }
}
util.toDefaultPage = function (menulist, to, routes, next) {
  if (to.path === '/') {
    next({ name: 'home_index', replace: true })
  } else {
    next()
  }
}
util.openAccesseMenu = function (accesseMenu) {
  const openAccesseMenu = []
  const forFn = function (menulist, parentName) {
    for (var item of menulist) {
      item.parentName = parentName
      openAccesseMenu.push(item)
      if (item.children && item.children.length > 0) {
        forFn(item.children, item.name)
      }
    }
  }
  forFn(accesseMenu, '')
  return openAccesseMenu
}

util.openNewPage = function (vm, name, argu, query) {
  const pageOpenedList = vm.$store.state.app.pageOpenedList
  const openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  if (!tagHasOpened) {
    const tags = vm.$store.state.app.openAccessMenu.filter((item) => {
      return name === item.name
    })
    if (tags.length > 0) {
      const tag = tags[0]
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.commit('increateTag', tag)
    }
  }
}

util.getNowFormatDate = function () {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var hours = date.getHours()
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours
  }
  var minutes = date.getMinutes()
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  var seconds = date.getSeconds()
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    ' ' + hours + seperator2 + minutes +
    seperator2 + seconds
  return currentdate
}

export default util
