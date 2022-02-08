import SudokuAPI from './SudokuAPI'

describe('Sudoku API', () => {
  let sudokuAPI

  let sampleGrid = [
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

  beforeEach(() => {
    sudokuAPI = new SudokuAPI()
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
      const result = sudokuAPI.validateSudoku(sampleGrid)
      expect(result).toBe(true)
    })

    test('With invalid grid', () => {
      const invalidGrid = JSON.parse(JSON.stringify(sampleGrid))
      invalidGrid[1][1] = invalidGrid[0][0]
      const result = sudokuAPI.validateSudoku(invalidGrid)

      expect(result).toBe(false)
    })

    test('With incomplete grid', () => {
      const invalidGrid = JSON.parse(JSON.stringify(sampleGrid))
      invalidGrid[0][0] = 0
      const result = sudokuAPI.validateSudoku(invalidGrid)

      expect(result).toBe(false)
    })
  })

  test('Check if duplicate in rows/cols/blocks', () => {
    const grid = [
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

    expect(sudokuAPI.isValueSafe(grid, 0, 0, 1)).toBe(true)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 3)).toBe(true)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 7)).toBe(true)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 2)).toBe(false)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 4)).toBe(false)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 5)).toBe(false)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 6)).toBe(false)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 8)).toBe(false)
    expect(sudokuAPI.isValueSafe(grid, 0, 0, 9)).toBe(false)
  })
})
