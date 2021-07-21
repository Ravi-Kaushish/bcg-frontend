import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CHeader, CToggler, CHeaderBrand, CHeaderNav, CDropdown,
  CDropdownToggle, CImg, CDropdownMenu, CDropdownItem, CSubheader, CBreadcrumbRouter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Auth from '../../utils/auth';
import routes from '../../utils/routes';
import DefaultAvatar from '../../assets/images/default-user-avatar.png';

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const logout = async () => {
    await Auth.logout();
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
      </CHeaderNav>
      <CHeaderNav className="px-3">
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down" >
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <div className="c-avatar">
              <CImg src={DefaultAvatar} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
            </div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem onClick={logout}>
              <CIcon name="cil-lock-locked" className="mfe-2" />Log Out
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CHeaderNav>
      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader;
