import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
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
  const grid = useAppSelector(selectGrid)
  const initialGrid = useAppSelector(selectInitialGrid)
  const invalidMask = useAppSelector(selectInvalidMask)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(generateSudoku())
  }, [])

  function handleInputChange(e: React.FormEvent<HTMLInputElement>, row: number, col: number) {
    const input = e.target as HTMLInputElement
    const value = input.value
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

interface CellProps {
  row: number
  col: number
  value: number | ''
  isValid: boolean
  editable: boolean
  onChange(e: React.FormEvent<HTMLInputElement>): void
}

function Cell({ row, col, value, isValid, editable, onChange }: CellProps) {
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
          maxLength={1}
          value={value} 
          onChange={onChange} 
          data-testid={'cell-'+row+'-'+col}
        />
      </td>
    )
  } else {
    return <td className={classNames}>{value}</td>
  }
}
