import defaultSettings from '@/settings'

const title = defaultSettings.title || '考研笔记分享系统'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
