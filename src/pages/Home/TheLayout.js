import React from 'react';
import TheHeader from './TheHeader';
import TheSidebar from './TheSidebar';
import TheContent from './TheContent';
import TheFooter from './TheFooter';

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
