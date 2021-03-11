import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import IPost from './IPost'
import { sub } from 'date-fns'

const initialState: IPost[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state: IPost[], action: PayloadAction<IPost>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        }
      },
    },
    postUpdated(state: IPost[], action: PayloadAction<IPost>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id == id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(
      state: IPost[],
      action: PayloadAction<{ postId: string; reaction: string }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
