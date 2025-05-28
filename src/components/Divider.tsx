import React from 'react'

interface iDividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  color?: string
  thickness?: number
  margin?: string
}

const Divider: React.FC<iDividerProps> = ({
  orientation = 'horizontal',
  className = '',
  color = '#ccc',
  thickness = 1,
  margin = 0
}) => {
  const style: React.CSSProperties = {
    backgroundColor: color,
    margin
  }

  if (orientation === 'horizontal') {
    return (
      <div
        className={`divider ${className}`}
        style={{ height: thickness, width: '100%', ...style }}
      />
    )
  }

  return (
    <div
      className={`divider ${className}`}
      style={{
        display: 'inline-block',
        width: thickness,
        height: '100%',
        ...style
      }}
    />
  )
}

export default Divider
