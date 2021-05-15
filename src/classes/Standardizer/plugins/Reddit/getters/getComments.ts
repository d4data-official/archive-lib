import Reddit from '../Reddit'
import { Comment } from '../../../../../types/schemas'

const COMMENTS_FILE = 'comments.csv'

interface RedditComment {
  id: string,
  permalink?: string,
  date: string,
  ip_address?: string,
  subreddit?: string,
  gildings?: string,
  link?: string,
  parent?: string,
  body?: string
}

Reddit.prototype.getComments = async function getComments(options) {
  const commentList = await this.parser.parseAsCSV<RedditComment>(COMMENTS_FILE, options?.parsingOptions)

  const comments: Array<Comment> = commentList.map((comment) => ({
    sender: 'You',
    content: comment?.body,
    creationDate: new Date(comment.date),
    externalLink: comment.link,
  }))

  return {
    data: comments,
    parsedFiles: [COMMENTS_FILE],
  }
}
