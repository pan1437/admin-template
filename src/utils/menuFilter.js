import Layout from '@/layout'
export function filterAsyncRoutes(routes, level) {
  var children = []
  for (var i = 0; i < routes.length; i++) {
    const meta = {
      title: routes[i].name,
      icon: routes[i].icon
    }
    routes[i].meta = meta
    if (routes[i].level == 1) {
      routes[i].redirect = routes[i].url
      routes[i].path = '/' + routes[i].module
      routes[i].name = routes[i].module
      routes[i].component = Layout
      if (routes[i].path == '/dashboard') {
        routes[i].path = '/'
      }
    } else {
      routes[i].component = resolve =>
        require(['@/views/' + routes[i].url + 'index'], resolve)
      routes[i].path = routes[i].name = routes[i].module + routes[i].function
    }
    if (level == routes[i].pid) {
      routes[i].children = filterAsyncRoutes(routes, routes[i].id)
      if (routes[i].children.length === 0) {
        delete routes[i].children
      }
      children.push(routes[i])
    }
  }
  return children
}
