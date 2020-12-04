const getters = {
    loading: state => state.app.loading,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    code:state => state.user.code,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    permission_routes: state => state.permission.routes,
    permission_addRoutes: state => state.permission.addRoutes,
    get_common_date: state => state.app.commonDate
    // remove_menu: state => state.permission.removeMenu
}
export default getters
