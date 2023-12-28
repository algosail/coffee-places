import { kv } from './db.ts'
import { getPlace, type Place } from '$utils/locations.ts'

export const USER_KEY = 'users'
const BOOKMARK_KEY = 'users_bookmarks'
const LIKE_KEY = 'users_likes'

export interface Like {
  userId: number
  placeId: string
}

export interface Bookmark {
  userId: number
  placeId: string
}

export interface User {
  chatId: number
  userId: number
  name: string
}

export const usersList = () => kv.list<User>({ prefix: [USER_KEY] })

export const setUser = async (user: User): Promise<boolean> => {
  const res = await kv.set([USER_KEY, user.chatId], user)
  return res.ok
}

export const deleteUser = async (chatId: number): Promise<void> => {
  await kv.delete([USER_KEY, chatId])
}

export const getUserBookmarks = async (
  userId: number,
  cursor?: string,
): Promise<[Place[], string]> => {
  const list = await kv.list<Bookmark>({ prefix: [BOOKMARK_KEY, userId] }, {
    limit: 10,
    cursor,
  })

  const places: Place[] = []

  for await (const it of list) {
    const place = await getPlace(it.value.placeId)
    if (place) places.push(place)
  }

  return [places, list.cursor]
}

export const hasBookmark = async (
  userId: number,
  placeId: string,
): Promise<boolean> => {
  const res = await kv.get([BOOKMARK_KEY, userId, placeId])
  return res.value !== null
}

export const addBookmark = async (bookmark: Bookmark): Promise<boolean> => {
  const res = await kv.set(
    [BOOKMARK_KEY, bookmark.userId, bookmark.placeId],
    bookmark,
  )
  return res.ok
}

export const deleteBookmark = async (bookmark: Bookmark): Promise<void> => {
  await kv.delete([BOOKMARK_KEY, bookmark.userId, bookmark.placeId])
}

export const getPlaceLikes = async (placeId: string): Promise<Like[]> => {
  const list = await kv.list<Like>({ prefix: [LIKE_KEY, placeId] })
  const likes: Like[] = []
  for await (const it of list) {
    likes.push(it.value)
  }

  return likes
}

export const hasUserLike = async (
  placeId: string,
  userId: number,
): Promise<boolean> => {
  const like = await kv.get([LIKE_KEY, placeId, userId])
  return like.value !== null
}

export const likePlace = async (
  placeId: string,
  userId: number,
): Promise<boolean> => {
  const res = await kv.set([LIKE_KEY, placeId, userId], { userId, placeId })
  return res.ok
}

export const unlikePlace = async (
  placeId: string,
  userId: number,
): Promise<void> => {
  await kv.delete([LIKE_KEY, placeId, userId])
}
