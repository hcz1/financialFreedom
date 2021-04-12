import React from 'react'
import classnames from 'classnames'

import style from './mortgage-table.module.scss'

export const MortgageTable = ({
  className,
}) => (
  <div className={classnames(style.mortgageTable, className)}>
    {/* Some content Here */}
  </div>
)

export default MortgageTable
