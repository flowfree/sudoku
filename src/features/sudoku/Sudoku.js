import { useEffect, useState } from 'react'
import './Sudoku.css'
import { generateSudoku, validateSudoku } from "./SudokuAPI"

export default function Sudoku() {
  const [initialGrid, setInitialGrid] = useState([])
  const [grid, setGrid] = useState([])
  const [playCount, setPlayCount] = useState(1)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const arr = generateSudoku()
    setInitialGrid(arr)
    setGrid(arr)
  }, [playCount])

  function handleInputChange(e, row, col) {
    const value = e.target.value
    if (isNaN(value)) {
      return
    }
    const clone = JSON.parse(JSON.stringify(grid))
    clone[row][col] = Number(value)
    setGrid(clone)
  }

  function handleClearAll() {
    setGrid(initialGrid)
    setMessage(null)
  }

  function handleNewGame() {
    setPlayCount(playCount+1)
    setMessage(null)
  }

  function handleSubmit() {
    if (validateSudoku(grid)) {
      setMessage('Awesome!')
    } else {
      setMessage('Sudoku still got incorrect numbers.')
    }
  }

  return (
    <div>
      <table className="sudoku">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={'row-'+rowIndex}>
              {row.map((value, colIndex) => (
                <Cell 
                  key={'cell-'+rowIndex+'-'+colIndex} 
                  row={rowIndex}
                  col={colIndex}
                  value={value} 
                  onChange={e => handleInputChange(e, rowIndex, colIndex)}
                  editable={initialGrid[rowIndex][colIndex] === 0}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleClearAll}
      >
        Clear All
      </button>
      <button
        onClick={handleNewGame}
      >
        New Game
      </button>
      <button
        onClick={handleSubmit}
      >
        Check
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

function Cell({ row, col, value, editable, onChange }) {
  let classNames = ''
  if (row === 2 || row === 5 || row === 8) {
    classNames += 'border-bottom-bold '
  } else {
    classNames += 'border-bottom '
  }
  if (col === 2 || col === 5 || col === 8) {
    classNames += 'border-right-bold '
  } else {
    classNames += 'border-right '
  }
  if (editable) {
    classNames += 'no-padding '
  }

  if (editable) {
    value = value === 0 ? '' : value
    return (
      <td className={classNames}>
        <input 
          type="text" 
          maxLength="1"
          value={value} 
          onChange={onChange} 
        />
      </td>
    )
  } else {
    return <td className={classNames}>{value}</td>
  }
}
