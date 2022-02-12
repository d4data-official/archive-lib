import Reddit from '../Reddit'
import { StatisticType } from '../../../../../types/schemas/Statistic'

Reddit.prototype.getCommentsStatistics = async function getCommentsStatistics() {
  let Nyear = 1
  const commentsData = await this.getComments({
    parsingOptions: {
      pagination: {
        offset: 0,
        items: Infinity,
      },
    },
  })

  if (!commentsData) {
    return null
  }
  commentsData.data.forEach((entry) => {
    const end = new Date(new Date().setFullYear(new Date().getFullYear() - Nyear))
    for (Nyear; entry.creationDate < end; Nyear += 1) {
      Nyear += 1
      break
    }
  })
  return {
    statistics: [
      {
        type: StatisticType.NUMBER,
        value: (commentsData.data.length / Nyear),
        name: 'comments over Time',
      },
    ],
    parsedFiles: commentsData?.parsedFiles ?? [],
  }
}
