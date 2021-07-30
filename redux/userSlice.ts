import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
  currentIncome: string,
  agents: Array<any>
}

// Initial state 
const initialState: userState = {
  currentIncome: '',
  agents: []
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentIncome: (state, action: PayloadAction<string>) => { state.currentIncome = action.payload },
    setAgents: (state, action: PayloadAction<Array<any>>) => { state.agents = action.payload }
  },
})


// Action creators 
export const { setCurrentIncome, setAgents } = userSlice.actions



export default userSlice.reducer