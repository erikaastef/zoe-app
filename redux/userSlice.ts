import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
  currentIncome: string,
  agents: Array<any>,
  hiddenAgents: Array<any>,
}

// Initial state 
const initialState: userState = {
  currentIncome: '',
  agents: [],
  hiddenAgents: []
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentIncome: (state, action: PayloadAction<string>) => { state.currentIncome = action.payload },
    setAgents: (state, action: PayloadAction<Array<any>>) => { state.agents = action.payload },
    setHiddenAgents: (state, action: PayloadAction<Array<any>>) => { state.hiddenAgents = action.payload }
  },
})


// Action creators 
export const { setCurrentIncome, setAgents, setHiddenAgents } = userSlice.actions



export default userSlice.reducer