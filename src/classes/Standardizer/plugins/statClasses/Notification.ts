import moment from 'moment';
import { Notification } from '../../../../types/schemas';

export default class Calculator {
  constructor() {
    this.calendar = {}
  }

  process_record(chunk: Array<Notification>) {
    this.updateAverage(chunk)
  }

  private readonly calendar: Record<string, any>

  private updateAverage(chunk: Array<Notification>) {
    /**
         * calendar = {
         * '09-2021': [0,100,...]
         *  ...
         * }
         */
    chunk.forEach(notification => {
      const { calendar } = this
      const date = moment(notification.notificationDate)
      if (!date.isValid()) return
      // eslint-disable-next-line no-prototype-builtins
      if (!calendar.hasOwnProperty(date.format('YYYY-MM'))) {
        calendar[date.format('YYYY-MM')] = Array.from(new Array(date.daysInMonth()), () => 0)
      }
      calendar[date.format('YYYY-MM')][date.date() - 1] += 1
    })
  }

  get average() {
    return this.computeAverage()
  }

  private async computeAverage() {
    const { calendar } = this
    let sum: Array<number> = []
    await Object.keys(calendar).forEach(month => {
      sum = sum.concat(calendar[month])
    })
    const nb = sum.length
    const av = (sum.reduce((a, b) => a + b, 0) / nb) || 0
    return Math.trunc(av * 100) / 100
  }
}
