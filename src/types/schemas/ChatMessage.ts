import Reaction from './Reaction'

export default interface ChatMessage {
  /**
   * The name of the sender
   */
  sender: string

  /**
   * The text sent by the sender
   */
  text?: string;

  /**
   * URL of the meta data if any
   */
  metaData?: string;

  /**
   * reaction linked with message
   */
  reactions?: Array<Reaction>;
}