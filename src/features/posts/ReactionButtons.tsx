import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'
import IReactionEmoji from './IReactionEmoji'
import IPost from './IPost'

const reactionEmoji: IReactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = (props: { post: IPost }): JSX.Element => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: props.post.id, reaction: name }))
        }
      >
        {emoji} {props.post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
