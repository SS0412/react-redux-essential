import React from 'react'
import { useSelector } from 'react-redux'
import { IState } from '../../app/store'

export const PostAuthor = (props: { userId?: string }): JSX.Element => {
  const author = useSelector((state: IState) =>
    state.users.find((user) => user.id === props.userId)
  )

  return <span>By {author ? author.name : 'Unknown author'}</span>
}
