import Event from 'types/schemas/Event';
import Location from 'types/schemas/Location';
import Media from 'types/schemas/Media';
import Reaction from 'types/schemas/Reaction';

export interface ExternalContext {
  /**
   * link of an external site
   */
  url?: string;
}

export default interface Post {
  /**
   * Creation date of the post in timestamp format
   */
  creationDate: Date;

  /**
   * video or image linked with post
   */
  medias?: Array<Media>;

  /**
   * reaction linked with post
   */
  reactions?: Array<Reaction>;

  /**
   * who posted
   */
  sender: string

  /**
   * pseudo of the sender for Twitter only
   */
  alias?: string;

  /**
   * Title of the post
   */
  title?: string;

  /**
   * message posted
   */
  content?: string;

  /**
   * post with a location link
   */
  location?: Location;

  /**
   * post with a event link
   */
  event?: Event;

  /**
   * post with link of an external site
   */
  externalContext?: ExternalContext;

  /**
   * list of person tag on the post
   */
  tags?: Array<string>;
}