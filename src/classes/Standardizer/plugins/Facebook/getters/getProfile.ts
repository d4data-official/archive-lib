import Facebook from '../Facebook'
import { Profile } from '../../../../../types/schemas'
import withAutoParser from '../../../../../modules/Standardizer/withAutoParser'

const ACCOUNT_PROFILE_FILE = 'profile_information/profile_information.json'

interface FBProfile {
  profile: {
    name: {
      full_name: string,
      first_name: string,
      middle_name: string,
      last_name: string,
    },
    emails?: {
      emails?: Array<string>,
    },
    birthday: {
      year: number,
      month: number,
      day: number,
    },
    gender?: {
      gender_option?: string,
      pronoun?: string,
    },
    previous_names: Array<any>,
    other_names: Array<any>,
    current_city: {
      name: string,
      timestamp: number
    },
    hometown: {
      name: string,
      timestamp: number
    },
    relationship: {
      status: string,
      timestamp: number
    },
    family_members: Array<{
      name: string,
      relation: string,
      timestamp: Date
    }>
  }
}

Facebook.prototype.getProfile = withAutoParser(async parser => {
  const { data: accountDetails } = await parser.parseAsJSON<FBProfile>(ACCOUNT_PROFILE_FILE)
  const mail = accountDetails.profile?.emails?.emails?.[0]

  const account: Profile = {
    firstName: accountDetails.profile.name.first_name,
    lastName: accountDetails.profile.name.last_name,
    gender: accountDetails.profile?.gender?.pronoun,
    mails: mail ? [{ mail }] : undefined,
    birthday: new Date(accountDetails.profile.birthday.year,
      accountDetails.profile.birthday.month - 1, accountDetails.profile.birthday.day),
  }

  return account
})
