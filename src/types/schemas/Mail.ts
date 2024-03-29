import Media from 'types/schemas/Media';

export default interface Mail {
  /**
   * Sender of the mail
   */
  from: string

  /**
   * Receiver of the mail
   */
  to: Array<string>

  /**
   * Date at the time the mail was send
   */
  date?: Date | undefined;

  /**
   * Object of the mail
   */
  subject?: string | undefined

  /**
   * content of the mail
   */
  content?: string | undefined

  /**
   * info of the file link in the mail
   */
  attachments?: Array<Media> | undefined
}
