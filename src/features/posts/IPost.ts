interface IPost {
  id: string
  date: string
  title: string
  content: string
  user?: string
  reactions: {
    thumbsUp: number
    hooray: number
    heart: number
    rocket: number
    eyes: number
    [key: string]: number
  }
}

export default IPost
