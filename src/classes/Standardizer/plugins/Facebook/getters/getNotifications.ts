import Facebook from '../Facebook'
import { Notification } from '../../../../../types/schemas'
import withAutoParser from '../../../../../modules/Standardizer/withAutoParser'

const NOTIFICATIONS_FILE = 'about_you/notifications.json'

interface Notifications {
  notifications: Array<{
    text: string,
    timestamp: number,
    href: string,
    unread: boolean
  }>
}

Facebook.prototype.getNotifications = withAutoParser(async parser => {
  const { data: notificationList } = await parser.parseAsJSON<Notifications>(NOTIFICATIONS_FILE)

  return notificationList.notifications.map((notification): Notification => ({
    content: notification.text,
    notificationDate: new Date(notification.timestamp * 1000),
    href: notification.href,
  }))
})
