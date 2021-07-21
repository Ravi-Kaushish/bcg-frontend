import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import IgniteIconWhiteI from '../../assets/images/ignite-icon-i-white.png'
import IgniteIconWhiteFull from '../../assets/images/ignite-icon-full-white.png'

import navigation from '../../utils/nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <CImg
          src={IgniteIconWhiteFull}
          className="c-sidebar-brand-full"
          name="logo-full"
          alt="Ignite"
          height={35}
        />
        <CImg
          src={IgniteIconWhiteI}
          className="c-sidebar-brand-minimized"
          name="logo-negative"
          alt="Ignite"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
