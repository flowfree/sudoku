import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  generateSudoku,
  validateSudoku,
  setValue,
  clearAll,
  selectGrid,
  selectInitialGrid,
  selectInvalidMask,
  selectSuccess
} from './sudokuSlice'
import './Sudoku.css'

export default function Sudoku() {
  const grid = useSelector(selectGrid)
  const initialGrid = useSelector(selectInitialGrid)
  const invalidMask = useSelector(selectInvalidMask)
  const success = useSelector(selectSuccess)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(generateSudoku())
  }, [])

  function handleInputChange(e, row, col) {
    const value = e.target.value
    dispatch(setValue({ row, col, value }))
    dispatch(validateSudoku())
  }

  function handleNewGame(e) {
    e.preventDefault()
    dispatch(generateSudoku())
  }

  return (
    <div className="mt-3">
      <form className="row row-cols-sm-auto g-2 align-items-center justify-content-end mb-3">
        <div className="col-12">
          <label htmlFor="level">Level</label>
        </div>
        <div className="col-12">
          <select className="form-select shadow-none" id="level">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="col-12">
          <button
            className="btn btn-outline-primary shadow-none"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      </form>
      <table className="sudoku mb-3">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={'row-'+rowIndex}>
              {row.map((value, colIndex) => (
                <Cell 
                  key={'cell-'+rowIndex+'-'+colIndex} 
                  row={rowIndex}
                  col={colIndex}
                  value={value} 
                  isValid={invalidMask[rowIndex][colIndex] === 0}
                  onChange={e => handleInputChange(e, rowIndex, colIndex)}
                  editable={initialGrid[rowIndex][colIndex] === 0}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {success && <p>Good job 👍👍👍</p>}
    </div>
  )
}

function Cell({ row, col, value, isValid, editable, onChange }) {
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
  classNames += editable ? 'no-padding ' : ''
  classNames += isValid ? '' : 'invalid '

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
