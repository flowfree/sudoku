import { createSlice } from "@reduxjs/toolkit"
import SudokuAPI from "./SudokuAPI"

const sudokuAPI = new SudokuAPI()

const initialState = {
  level: 'easy',
  initialGrid: [],
  invalidMask: [],
  grid: [],
  success: false
}

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload      
    },

    generateSudoku: (state) => {
      let numCellsToHide = 5
      if (state.level === 'easy') {
        numCellsToHide = 15
      } else if (state.level === 'medium') {
        numCellsToHide = 35
      } else if (state.level === 'hard') {
        numCellsToHide = 45
      }

      const grid = sudokuAPI.generateSudoku(numCellsToHide)
      state.grid = grid
      state.initialGrid = grid
      state.invalidMask = sudokuAPI.emptyGrid()
      state.success = false
    },

    validateSudoku: (state) => {
      state.success = sudokuAPI.validateSudoku(state.grid)
    },

    setValue: (state, action) => {
      const { row, col } = action.payload
      let { value } = action.payload
      state.grid[row][col] = ''
      state.invalidMask[row][col] = 0
      if (isNaN(parseInt(value))) {
        return
      }
      value = Number(value)
      state.grid[row][col] = value
      if (sudokuAPI.isValueSafe(state.grid, row, col, value) === false) {
        state.invalidMask[row][col] = 1
      }
    },

    clearAll: (state) => {
      state.grid = state.initialGrid
      state.invalidMask = sudokuAPI.emptyGrid()
      state.success = false
    }
  }
})

export const { 
  generateSudoku, 
  validateSudoku, 
  setValue, 
  setLevel,
  clearAll 
} = sudokuSlice.actions

export const selectGrid = state => state.sudoku.grid
export const selectInitialGrid = state => state.sudoku.initialGrid
export const selectInvalidMask = state => state.sudoku.invalidMask
export const selectSuccess = state => state.sudoku.success

export default sudokuSlice.reducer
