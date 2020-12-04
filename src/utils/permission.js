import store from '@/store'

/**
 * @description 检查权限
 * @param value
 * @returns {boolean}
 */
export default function checkPermission(value) {
  // if (value && value instanceof Array && value.length > 0) {
  //   const permissions = store.getters['user/permissions']
  //   const permissionPermissions = value
  //   return permissions.some(role => {
  //     return permissionPermissions.includes(role)
  //   })
  // } else {
  //   return false
  // }
  const permissions = store.getters['permission_routes']

  if (value) {
    const permissionPermissions = value
    let count = []
    permissions.forEach(role => {
      if (role.name && role.name == permissionPermissions) {
        count++
      } else {
        if (role.children && role.children.length > 0) {
          role.children.forEach(item => {
            if (item.name && item.name == permissionPermissions) {
              count++
            } else {
              if (item.children && item.children.length > 0) {
                item.children.forEach(it => {
                  if (it.name && it.name == permissionPermissions) {
                    count++
                  }
                })
              }
            }
          })
        }
      }
    })
    if (count == 0) {
      return false
    } else {
      return true
    }
  }
}
