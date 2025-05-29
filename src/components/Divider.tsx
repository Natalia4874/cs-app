import React from 'react'

import styled from 'styled-components'

interface iDividerProps {
  orientation?: 'horizontal' | 'vertical'
  color?: string
  thickness?: string
  margin?: string
}

const Divider: React.FC<iDividerProps> = ({
  orientation = 'horizontal',
  color = '#ccc',
  thickness = '1px',
  margin = '0',
  ...props
}) => {
  return (
    <StyledDivider
      orientation={orientation}
      color={color}
      thickness={thickness}
      margin={margin}
      {...props}
    />
  )
}

export default Divider

const StyledDivider = styled.div<iDividerProps>`
  background-color: ${({ color }) => color || '#ccc'};
  margin: ${({ margin }) => margin || '0'};

  ${({ orientation, thickness }) =>
    orientation === 'horizontal'
      ? `
          height: ${thickness || '1px'};
          width: 100%;
        `
      : `
          display: inline-block;
          width: ${thickness || '1px'};
          height: 100%;
        `}
`
