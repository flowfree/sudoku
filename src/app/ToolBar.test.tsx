import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import ToolBar from './ToolBar'
import sudokuReducer, { initialState } from '../features/sudoku/sudokuSlice'

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
})
