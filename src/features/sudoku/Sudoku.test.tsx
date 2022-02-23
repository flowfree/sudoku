import SudokuAPI from './SudokuAPI'
import ToolBar from '../../app/ToolBar'
import Sudoku from './Sudoku'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import sudokuReducer, { initialState } from './sudokuSlice'

describe('Sudoku', () => {
  const sudokuAPI = new SudokuAPI()

  function renderSudoku(state = {}) {
    const store = configureStore({ 
      reducer: { sudoku: sudokuReducer },
      preloadedState: { sudoku: { ...initialState, ...state } },
    })
    const returnvalues = render(
      <Provider store={store}>
        <ToolBar />
        <Sudoku />
      </Provider>
    )
    return { ...returnvalues, store }
  }

  test('displays initial grid for the Practice level', () => {
    const { getAllByRole } = renderSudoku({ level: 'Practice' })
    expect(getAllByRole('textbox').length).toEqual(5)
  })

  test('displays initial grid for the Easy level', () => {
    const { getAllByRole } = renderSudoku({ level: 'Easy' })
    expect(getAllByRole('textbox').length).toEqual(15)
  })

  test('displays initial grid for the Medium level', () => {
    const { getAllByRole } = renderSudoku({ level: 'Medium' })
    expect(getAllByRole('textbox').length).toEqual(35)
  })

  test('displays initial grid for the Hard level', () => {
    const { getAllByRole } = renderSudoku({ level: 'Hard' })
    expect(getAllByRole('textbox').length).toEqual(45)
  })

  test('Validates the grid on each user input', () => {
    const { store, getByTestId, queryByText, getByText } = renderSudoku()

    const grid = store.getState().sudoku.grid
    const completedGrid = JSON.parse(JSON.stringify(grid))
    sudokuAPI.fillCell(completedGrid, 0, 0)

    expect(queryByText(/You got it!/)).not.toBeInTheDocument()

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          userEvent.type(
            getByTestId('cell-'+row+'-'+col),
            String(completedGrid[row][col])
          )
        }
      }
    }

    expect(getByText(/You got it!/)).toBeInTheDocument()
  })
})
