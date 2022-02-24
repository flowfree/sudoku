import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

import ToolBar from './ToolBar'
import sudokuReducer, { initialState, Level } from '../features/sudoku/sudokuSlice'

function renderToolBar(state = {}) {
  const store = configureStore({ 
    reducer: { sudoku: sudokuReducer },
    preloadedState: { sudoku: { ...initialState, ...state } },
  })
  const queries = render(
    <Provider store={store}>
      <ToolBar />
    </Provider>
  )
  return { ...queries, store }
}

describe('ToolBar Component', () => {
  test('renders the buttons', () => {
    const { getByRole } = renderToolBar(<ToolBar />)

    expect(getByRole('button', { name: /new game/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /reveal/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /undo/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /undo/i })).toBeDisabled()
  })

  test('open the level popup', () => {
    const { getByText, getByTestId } = renderToolBar()

    userEvent.click(getByTestId('selectLevel'))

    expect(getByText(/Choose level/)).toBeInTheDocument()
    expect(getByText(/practice/i)).toBeInTheDocument()
    expect(getByText(/easy/i)).toBeInTheDocument()
    expect(getByText(/medium ✔️/i)).toBeInTheDocument()
    expect(getByText(/hard/i)).toBeInTheDocument()
  })

  test('Change level', () => {
    const { getByText, getByTestId, getByRole, store } = renderToolBar()

    userEvent.click(getByTestId('selectLevel'))
    userEvent.click(getByText(/hard/i))

    const currentLevel = store.getState().sudoku.level
    expect(currentLevel).toEqual(Level.Hard)

    const newGameBtn = getByRole('button', { name: /new game/i })
    expect(newGameBtn).toHaveTextContent(/new game\s*hard/i)
  })
})
