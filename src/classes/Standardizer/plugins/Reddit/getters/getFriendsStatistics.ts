import moment from 'moment'
import Reddit from '../Reddit'
import { StatisticType } from '../../../../../types/schemas/Statistic'

Reddit.prototype.getFriendsStatistics = async function getFriendsStatistics() {
  let Nyear = 1
  const FriendData = await this.getFriends({
    parsingOptions: {
      pagination: {
        offset: 0,
        items: Infinity,
      },
    },
  })

  if (!FriendData) {
    return null
  }
  const lastFriend = Date.now() - new Date(Math.max(...FriendData.data.map(x => x.date!.getTime()))).getTime()
  FriendData.data.forEach((entry) => {
    const end = new Date(new Date().setFullYear(new Date().getFullYear() - Nyear))
    for (Nyear; entry.date! < end; Nyear += 1) {
      Nyear += 1
      break
    }
  })
  return {
    statistics: [
      {
        type: StatisticType.NUMBER,
        value: (FriendData.data.length / Nyear).toFixed(2),
        name: 'Friend over Time',
      },
      {
        type: StatisticType.DURATION,
        value: moment.duration(lastFriend).toISOString(),
        name: 'Time since Last Friends added',
      },
    ],
    parsedFiles: FriendData?.parsedFiles ?? [],
  }
}
