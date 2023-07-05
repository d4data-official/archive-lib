import Facebook from '../Facebook'
import { StatisticType } from '../../../../../types/schemas/Statistic'

Facebook.prototype.getFollowingsStatistics = async function getFollowingsStatistics() {
  let Nyear = 1
  const followingData = await this.getFollowings({
    parsingOptions: {
      pagination: {
        offset: 0,
        items: Infinity,
      },
    },
  })

  if (!followingData) {
    return null
  }
  followingData.data.forEach((entry) => {
    const end = new Date(new Date().setFullYear(new Date().getFullYear() - Nyear))
    for (Nyear; entry.followedSince! < end; Nyear += 1) {
      Nyear += 1
      break
    }
  })
  return {
    statistics: [
      {
        type: StatisticType.NUMBER,
        value: (followingData.data.length / Nyear).toFixed(2),
        name: 'Following over Time',
      },
    ],
    parsedFiles: followingData?.parsedFiles ?? [],
  }
}