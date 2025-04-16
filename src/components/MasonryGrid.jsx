"use client"

import { useEffect, useState } from "react"
import Pin from "./Pin"
import "./MasonryGrid.css"

function MasonryGrid({ pins, onPinClick }) {
  const [columns, setColumns] = useState(4)

  // Responsive columns based on screen width
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(2)
      } else if (window.innerWidth < 768) {
        setColumns(3)
      } else if (window.innerWidth < 1024) {
        setColumns(4)
      } else {
        setColumns(5)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute pins into columns
  const distributeColumns = () => {
    const columnArrays = Array.from({ length: columns }, () => [])

    pins.forEach((pin, index) => {
      const columnIndex = index % columns
      columnArrays[columnIndex].push(pin)
    })

    return columnArrays
  }

  const columnArrays = distributeColumns()

  return (
    <div className="masonry-grid" style={{ "--columns": columns }}>
      {columnArrays.map((column, columnIndex) => (
        <div key={columnIndex} className="masonry-column">
          {column.map((pin) => (
            <Pin key={pin.id} pin={pin} onClick={() => onPinClick(pin)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default MasonryGrid
