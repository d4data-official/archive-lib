import Reddit from '../Reddit'
import { Profile } from '../../../../../types/schemas'
import withAutoParser from '../../../../../modules/Standardizer/withAutoParser'

const ACCOUNT_PROFILE_FILE = 'statistics.csv'

interface RedditProfile {
  statistics?: string,
  value?: string
}

Reddit.prototype.getProfile = withAutoParser(async parser => {
  const accountDetails = await parser.parseAsCSV<RedditProfile>(ACCOUNT_PROFILE_FILE)
  const mail = accountDetails[5]?.value

  const profile: Profile = {
    displayName: accountDetails[0]?.value,
    mails: mail ? [{ mail }] : undefined,
  }

  return { data: profile }
})
