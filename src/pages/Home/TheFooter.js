import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div style={{ margin: "auto" }}>
        <a href="https://www.cgignite.com" target="_blank" rel="noopener noreferrer">Boston Consulting Group</a>
        <span className="ml-1">&copy; {new Date().getFullYear()} </span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter);