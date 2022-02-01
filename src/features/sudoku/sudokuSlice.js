import { createSlice } from "@reduxjs/toolkit"
import SudokuAPI from "./SudokuAPI"

const sudokuAPI = new SudokuAPI()

const initialState = {
  initialGrid: [],
  grid: [],
  success: false
}

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    generateSudoku: (state) => {
      const grid = sudokuAPI.generateSudoku()
      state.grid = grid
      state.initialGrid = grid
      state.success = false
    },
    validateSudoku: (state) => {
      state.success = sudokuAPI.validateSudoku(state.grid)
    },
    setValue: (state, action) => {
      const { row, col, value } = action.payload
      if (isNaN(value)) {
        return
      }
      state.grid[row][col] = Number(value)
    },
    clearAll: (state) => {
      state.grid = state.initialGrid
      state.success = false
    }
  }
})

export const { generateSudoku, validateSudoku, setValue, clearAll } = sudokuSlice.actions

export const selectGrid = state => state.sudoku.grid
export const selectInitialGrid = state => state.sudoku.initialGrid
export const selectSuccess = state => state.sudoku.success

export default sudokuSlice.reducer
