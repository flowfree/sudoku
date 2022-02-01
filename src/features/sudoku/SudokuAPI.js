class SudokuAPI {
  generate() {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    this._fillDiagonal(grid)
    this._fillCell(grid, 0, 0)
    this._removeElements(grid, 35)

    return grid
  }

  validate(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const val = grid[row][col]
        if (val === 0 || this._isSafe(grid, row, col, val) === false) {
          return false
        }
      }
    }
    return true
  }

  _fillDiagonal(grid) {
    for (let i = 0; i < 9; i += 3) {
      const numbers = [1,2,3,4,5,6,7,8,9]
      for (let j = i; j < i+3; j++) {
        for (let k = i; k < i+3; k++) {
          const idx = Math.floor(Math.random() * numbers.length)
          grid[j][k] = numbers[idx]
          numbers.splice(idx, 1)
        }
      }
    }
  }

  _fillCell(grid, row, col) {
    if (row === 8 && col === 9) {
      return true
    }

    if (col === 9) {
      row += 1
      col = 0
    }

    if (grid[row][col] !== 0) {
      return this._fillCell(grid, row, col+1)
    }

    for (let num = 1; num <= 9; num++) {
      if (this._isSafe(grid, row, col, num)) {
        grid[row][col] = num
        if (this._fillCell(grid, row, col+1)) {
          return true
        }
      } 
      grid[row][col] = 0
    }

    return false
  }

  _isSafe(grid, row, col, num) {
    // Row check
    for (let i = 0; i < 9; i++) {
      if (i !== col && grid[row][i] === num) {
        return false
      }
    }

    // Column check
    for (let i = 0; i < 9; i++) {
      if (i !== row && grid[i][col] === num) {
        return false
      }
    }

    // 3x3 block check
    let startRow = row - row % 3
    let startCol = col - col % 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (row === startRow + i && col === startCol + j) {
          continue
        }
        if (grid[startRow + i][startCol + j] === num) {
          return false
        }
      }
    }

    return true
  }

  _removeElements(grid, total = 10) {
    let count = total
    while (count > 0) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      if (grid[row][col] !== 0) {
        grid[row][col] = 0
        count--
      }
    }
  }
}

export function printSudoku(grid) {
  grid.forEach(row => {
    console.log(row.join('  '))
  })
}

export default SudokuAPI
