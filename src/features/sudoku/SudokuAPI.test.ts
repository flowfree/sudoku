import SudokuAPI, { Grid, printSudoku } from './SudokuAPI'

describe('Sudoku API', () => {
  let sudokuAPI = new SudokuAPI()

  let completedGrid: Grid
  let incompleteGrid: Grid

  beforeEach(() => {
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

  test('Generate empty grid', () => {
    const grid = sudokuAPI.emptyGrid()
    const numZeros = grid.flat().filter(x => x === 0).length

    expect(numZeros).toEqual(81)
  })

  test('Generate Sudoku', () => {
    const numCellsToHide = [0, 10, 30]
    numCellsToHide.forEach(num => {
      const grid = sudokuAPI.generateSudoku(num)
      const numZeros = grid.flat().filter(x => x === 0).length

      expect(numZeros).toEqual(num)
    })
  })

  describe('Validate Sudoku', () => {
    test('With valid grid', () => {
      const result = sudokuAPI.validateSudoku(completedGrid)
      expect(result).toBe(true)
    })

    test('With invalid grid', () => {
      const clone = JSON.parse(JSON.stringify(completedGrid))
      clone[1][1] = clone[0][0]
      const result = sudokuAPI.validateSudoku(clone)

      expect(sudokuAPI.validateSudoku(clone)).toBe(false)
    })

    test('With incomplete grid', () => {
      expect(sudokuAPI.validateSudoku(incompleteGrid)).toBe(false)
    })
  })

  test('Check if duplicate in rows/cols/blocks', () => {
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 1)).toBe(true)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 3)).toBe(true)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 7)).toBe(true)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 2)).toBe(false)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 4)).toBe(false)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 5)).toBe(false)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 6)).toBe(false)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 8)).toBe(false)
    expect(sudokuAPI.isValueSafe(incompleteGrid, 0, 0, 9)).toBe(false)
  })

  describe('Reveal single cell', () => {
    test('With incomplete grid', () => {
      // Create three empty cells
      const originalValue1 = completedGrid[1][1]
      const originalValue2 = completedGrid[2][2]
      const originalValue3 = completedGrid[3][3]
      completedGrid[1][1] = 0
      completedGrid[2][2] = 0
      completedGrid[3][3] = 0

      const [row, col, value] = sudokuAPI.reveal(completedGrid)

      expect.assertions(1)

      // It should fill in one of the following cells: (1,1), (2,2), or (3,3)
      if (row === 1 && col === 1) {
        expect(value).toEqual(originalValue1)
      } else if (row === 2 && col === 2) {
        expect(value).toEqual(originalValue2)
      } else if (row === 3 && col === 3) {
        expect(value).toEqual(originalValue3)
      }
    })

    test('With completed grid', () => {
      const [row, col, value] = sudokuAPI.reveal(completedGrid)

      expect(row).toBe(null)
      expect(col).toBe(null)
      expect(value).toBe(null)
    })

    test('With single empty element', () => {
      completedGrid[0][0] = 0

      const numZeros = completedGrid.flat().filter(x => x === 0).length
      expect(numZeros).toEqual(1)

      const [row, col, value] = sudokuAPI.reveal(completedGrid)

      expect(row).toBe(null)
      expect(col).toBe(null)
      expect(value).toBe(null)
    })

    test('With empty grid', () => {
      const emptyGrid = sudokuAPI.emptyGrid()
      const [row, col, value] = sudokuAPI.reveal(emptyGrid)

      expect(row).toBe(null)
      expect(col).toBe(null)
      expect(value).toBe(null)
    })
  })
})
