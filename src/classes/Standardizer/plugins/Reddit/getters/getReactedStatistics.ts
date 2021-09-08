import Reddit from '../Reddit'
import { StatisticType } from '../../../../../types/schemas/Statistic'

Reddit.prototype.getReactedStatistics = async function getReactedStatistics() {
  let Nyear = 1
  let up = 0
  let down = 0
  const reactedData = await this.getReacted({
    parsingOptions: {
      pagination: {
        offset: 0,
        items: Infinity,
      },
    },
  })

  if (!reactedData) {
    return null
  }
  reactedData.data.forEach((entry) => {
    const end = new Date(new Date().setFullYear(new Date().getFullYear() + Nyear))
    for (Nyear; entry.reaction.reactionDate! < end; Nyear += 1) {
      Nyear += 1
    }
    if (entry.reaction.name === 'up') {
      up += 1
    } else {
      down += 1
    }
  })
  console.log((reactedData.data.length / Nyear))
  return {
    statistics: [
      {
        type: StatisticType.NUMBER,
        value: (reactedData.data.length / Nyear),
        name: 'reacted over Time',
      },
      {
        type: StatisticType.NUMBER,
        value: (up / reactedData.data.length),
        name: 'Up reacted over Time',
      },
      {
        type: StatisticType.NUMBER,
        value: (down / reactedData.data.length),
        name: 'Down reacted over Time',
      },
    ],
    parsedFiles: reactedData?.parsedFiles ?? [],
  }
}