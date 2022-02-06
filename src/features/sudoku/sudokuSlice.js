import { createSlice } from "@reduxjs/toolkit"
import SudokuAPI from "./SudokuAPI"

const sudokuAPI = new SudokuAPI()
const emptyGrid = sudokuAPI.emptyGrid()

const initialState = {
  level: 'easy',
  initialGrid: [],
  invalidMask: [],
  grid: [],
  history: [],
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
      state.invalidMask = emptyGrid
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
      state.history.push([row, col])
      if (sudokuAPI.isValueSafe(state.grid, row, col, value) === false) {
        state.invalidMask[row][col] = 1
      }
    },

    undo: state => {
      while (state.history.length) {
        const [row, col] = state.history.pop()
        if (state.grid[row][col] !== 0) {
          state.grid[row][col] = 0
          break
        }
      }
    }
  }
})

export const { 
  generateSudoku, 
  validateSudoku, 
  setValue, 
  setLevel,
  undo
} = sudokuSlice.actions

export const selectGrid = state => state.sudoku.grid
export const selectInitialGrid = state => state.sudoku.initialGrid
export const selectInvalidMask = state => state.sudoku.invalidMask
export const selectSuccess = state => state.sudoku.success
export const selectHistory = state => state.sudoku.history

export default sudokuSlice.reducer
