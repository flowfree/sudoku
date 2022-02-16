import { createSlice } from "@reduxjs/toolkit"
import SudokuAPI from "./SudokuAPI"

const sudokuAPI = new SudokuAPI()
const emptyGrid = sudokuAPI.emptyGrid()
const validLevels = ['Practice', 'Easy', 'Medium', 'Hard']

export const sudokuSlice = createSlice({
  name: 'sudoku',

  initialState: {
    level: 'Easy',
    initialGrid: [],
    invalidMask: [],
    grid: [],
    history: [],
    success: false
  },

  reducers: {
    setLevel: (state, action) => {
      if (validLevels.includes(action.payload)) {
        state.level = action.payload      
      }
    },

    generateSudoku: (state) => {
      let numCellsToHide = 5
      if (state.level === 'Easy') {
        numCellsToHide = 15
      } else if (state.level === 'Medium') {
        numCellsToHide = 35
      } else if (state.level === 'Hard') {
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

    reveal: state => {
      const [row, col, value] = sudokuAPI.reveal(state.grid)
      if (row >= 0 && col >= 0 && value >= 0) {
        state.grid[row][col] = value
        state.history.push([row, col])
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
  reveal,
  undo
} = sudokuSlice.actions

export const selectGrid = state => state.sudoku.grid
export const selectInitialGrid = state => state.sudoku.initialGrid
export const selectInvalidMask = state => state.sudoku.invalidMask
export const selectSuccess = state => state.sudoku.success
export const selectHistory = state => state.sudoku.history

export const initialState = sudokuSlice.getInitialState()

export default sudokuSlice.reducer
