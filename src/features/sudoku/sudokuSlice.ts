import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../../app/store';
import SudokuAPI, { Grid } from "./SudokuAPI"

const sudokuAPI = new SudokuAPI()
const emptyGrid = sudokuAPI.emptyGrid()

export enum Level {
  Practice = 'Practice',
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export interface SudokuState {
  level: Level
  initialGrid: Grid
  invalidMask: number[][]
  grid: Grid
  history: [number, number][]
  success: boolean
}

export const initialState: SudokuState = {
  level: Level.Medium,
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
    setLevel: (state, action: PayloadAction<Level>) => {
      state.level = action.payload      
    },

    generateSudoku: (state) => {
      let numCellsToHide = 5
      if (state.level === Level.Easy) {
        numCellsToHide = 15
      } else if (state.level === Level.Medium) {
        numCellsToHide = 35
      } else if (state.level === Level.Hard) {
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
      if (row !== null && col !== null && value !== null) {
        state.grid[row][col] = value
        state.history.push([row, col])
      }
    },

    undo: state => {
      while (state.history.length) {
        const item = state.history.pop()
        if (item !== undefined) {
          const [row, col] = item
          if (state.grid[row][col] !== 0) {
            state.grid[row][col] = 0
            break
          }
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

export const selectGrid = (state: RootState) => state.sudoku.grid
export const selectInitialGrid = (state: RootState) => state.sudoku.initialGrid
export const selectInvalidMask = (state: RootState) => state.sudoku.invalidMask
export const selectSuccess = (state: RootState) => state.sudoku.success
export const selectHistory = (state: RootState) => state.sudoku.history

export default sudokuSlice.reducer
