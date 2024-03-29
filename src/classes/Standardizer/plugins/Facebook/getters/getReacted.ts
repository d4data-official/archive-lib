import Facebook from '../Facebook'
import { Community, Post, Reacted } from '../../../../../types/schemas'
import withAutoParser from '../../../../../modules/Standardizer/withAutoParser'

const LIKED_PAGES_FILE = 'likes_and_reactions/pages.json'
const LIKED_POSTS_FILE = 'likes_and_reactions/posts_and_comments.json'

interface PagesLiked {
  page_likes: Array<{
    name: string,
    timestamp: number
  }>
}

interface PostsLiked {
  reactions: Array<{
    title: string,
    timestamp: number,
    data: Array<{
      reaction: {
        reaction: string,
        actor: string
      }
    }>
  }>
}

Facebook.prototype.getReacted = withAutoParser(async parser => {
  const { data: likedPageList } = await parser.parseAsJSON<PagesLiked>(LIKED_PAGES_FILE)
  const { data: likedPostList } = await parser.parseAsJSON<PostsLiked>(LIKED_POSTS_FILE)

  const likedPages = likedPageList.page_likes.map((like): Reacted => ({
    entityType: 'community',
    entity: {
      name: like.name,
    } as Community,
    reaction: {
      name: 'like',
      reactionDate: new Date(like.timestamp * 1000),
    },
  }))

  const likedPosts = likedPostList.reactions.map((reaction): Reacted => ({
    entityType: 'post',
    entity: {
      title: reaction.title,
    } as Post,
    reaction: {
      name: reaction.data[0].reaction.reaction,
      description: reaction.title,
      reactionDate: new Date(reaction.timestamp * 1000),
    },
  }))

  return likedPages.concat(likedPosts)
})
