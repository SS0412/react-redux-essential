import { createSlice } from '@reduxjs/toolkit'
import IUser from './IUser'

const initialState: IUser[] = [
  { id: '0', name: 'Tia Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
