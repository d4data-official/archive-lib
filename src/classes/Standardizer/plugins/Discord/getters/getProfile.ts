import Discord from '../Discord'
import { Profile } from '../../../../../types/schemas'
import { MediaType } from '../../../../../types/schemas/Media'
import withAutoParser from '../../../../../modules/Standardizer/withAutoParser'

const ACCOUNT_FILE = 'account/user.json'

Discord.prototype.getProfile = withAutoParser(async parser => {
  const profile = await parser.parseAsJSON(ACCOUNT_FILE)
  return {
    displayName: profile.username,
    mail: profile.email,
    profilePicture: {
      current: {
        url: `file:///${ parser.resolveRelativePath('account/avatar.png') }`,
        type: MediaType.IMAGE,
      },
      history: [],
    },
  } as Profile
})
