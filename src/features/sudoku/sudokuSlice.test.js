import reducer, {
  setLevel,
  generateSudoku,
  validateSudoku,
  undo
} from './sudokuSlice'

describe('Sudoku Reducer', () => {
  let initialState
  let completedGrid
  let incompleteGrid

  beforeEach(() => {
    initialState = {
      level: 'Medium',
      initialGrid: [],
      invalidMask: [],
      grid: [],
      history: [],
      success: false
    }

    completedGrid = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ]

    incompleteGrid = [
      [0, 2, 0, 4, 5, 6, 0, 8, 0],
      [4, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 9, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 0, 0, 0, 0, 0, 0, 0],
      [8, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  })

  test('Should return the initial state', () => {
    const nextState = reducer(undefined, {})
    expect(nextState).toEqual(initialState)
  })

  test('Should handle valid level changes', () => {
    const levels = ['Practice', 'Easy', 'Medium', 'Hard']
    levels.forEach(level => {
      const nextState = reducer(initialState, setLevel(level))
      expect(nextState.level).toEqual(level)
    })
  })

  test('Should handle invalid level changes', () => {
    const levels = ['medium', 'hard', 'xxx']
    levels.forEach(level => {
      const nextState = reducer(initialState, setLevel(level))
      expect(nextState.level).toEqual(initialState.level)
    })
  })

  test('Generate New Sudoku', () => {
    const numCellsToHide = {
      'Practice': 5,
      'Easy': 15,
      'Medium': 35,
      'Hard': 45
    } 
    for (let level in numCellsToHide) {
      initialState.level = level

      const nextState = reducer(initialState, generateSudoku())
      const numZeros = nextState.grid.flat().filter(x => x === 0).length

      expect(numZeros).toEqual(numCellsToHide[level])
      expect(nextState.success).toBe(false)
    }
  })

  describe('Validate Sudoku', () => {
    test('With valid grid', () => {
      initialState.grid = completedGrid

      const nextState = reducer(initialState, validateSudoku())
      expect(nextState.success).toBe(true)
    })

    test('With incorrect grid', () => {
      const clone = JSON.parse(JSON.stringify(completedGrid))
      clone[0][0] = clone[1][1]
      initialState.grid = clone

      const nextState = reducer(initialState, validateSudoku())
      expect(nextState.success).toBe(false)
    })

    test('With incomplete grid', () => {
      initialState.grid = incompleteGrid

      const nextState = reducer(initialState, validateSudoku())
      expect(nextState.success).toBe(false)
    })
  })

  describe('Undo', () => {
    test('With non-empty history', () => {
      expect(incompleteGrid[0][0]).toEqual(0)

      incompleteGrid[0][0] = 1
      initialState.grid = incompleteGrid
      initialState.history = [[0,0]]

      const nextState = reducer(initialState, undo())

      expect(nextState.grid[0][0]).toEqual(0)
      expect(nextState.history).toEqual([])
    })

    test('With empty history', () => {
      initialState.grid = incompleteGrid
      initialState.history = []

      const nextState = reducer(initialState, undo())
      expect(nextState.grid).toEqual(incompleteGrid)
    })
  })
})
