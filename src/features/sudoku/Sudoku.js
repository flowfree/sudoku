import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  generateSudoku,
  validateSudoku,
  setValue,
  clearAll,
  selectGrid,
  selectInitialGrid,
  selectSuccess
} from './sudokuSlice'
import './Sudoku.css'

export default function Sudoku() {
  const grid = useSelector(selectGrid)
  const initialGrid = useSelector(selectInitialGrid)
  const success = useSelector(selectSuccess)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(generateSudoku())
  }, [])

  function handleInputChange(e, row, col) {
    const value = e.target.value
    dispatch(setValue({ row, col, value }))
  }

  function handleCheck() {
    dispatch(validateSudoku())
  }

  return (
    <div>
      <table className={'sudoku ' + (success ? 'success' : '')}>
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
      <button onClick={e => dispatch(clearAll())}>
        Clear All
      </button>
      <button onClick={e => dispatch(generateSudoku())}>
        New Game
      </button>
      <button onClick={handleCheck}>
        Check
      </button>
      {success && <p>Awesome!!!</p>}
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
