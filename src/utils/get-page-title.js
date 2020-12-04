import defaultSettings from '@/settings'

const title = defaultSettings.title || '瞳仁堂护眸天使管理后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
