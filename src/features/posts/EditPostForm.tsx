import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { IState } from '../../app/store'

import { postUpdated } from './postsSlice'

export const EditPostForm = (
  props: RouteComponentProps<{ postId: string }>
): JSX.Element => {
  const postId = props.match.params.postId
  const post = useSelector((state: IState) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
          user: post?.user,
          date: new Date().toISOString(),
          reactions:
            post?.reactions !== undefined
              ? post?.reactions
              : { thumbsUp: 0, hooray: 0, eyes: 0, heart: 0, rocket: 0 },
        })
      )
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
