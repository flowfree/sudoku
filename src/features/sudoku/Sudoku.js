import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  generateSudoku,
  validateSudoku,
  setValue,
  selectGrid,
  selectInitialGrid,
  selectInvalidMask
} from './sudokuSlice'
import './Sudoku.css'

export default function Sudoku() {
  const grid = useSelector(selectGrid)
  const initialGrid = useSelector(selectInitialGrid)
  const invalidMask = useSelector(selectInvalidMask)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(generateSudoku())
  }, [])

  function handleInputChange(e, row, col) {
    const value = e.target.value
    dispatch(setValue({ row, col, value }))
    dispatch(validateSudoku())
  }

  return (
    <div>
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
