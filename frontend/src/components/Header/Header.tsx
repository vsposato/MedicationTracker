import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { NavbarTypes } from 'store/reducers/layoutReducer';
import {
  Navbar,
  Nav,
  Dropdown,
  NavItem,
  NavLink,
  NavbarText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import chroma from 'chroma-js';
import cx from 'classnames';
import { logoutUser } from 'store/actions/authActions';
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from 'store/actions/navigationActions';

import s from './Header.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type HeaderProps = {
  openUsersList: boolean;
};

const Header = ({ openUsersList }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const sidebarOpened = useTypedSelector((store) => store.navigation.sidebarOpened);
  const sidebarStatic = useTypedSelector((store) => store.navigation.sidebarStatic);
  const navbarType = useTypedSelector((store) => store.layout.navbarType);
  const navbarColor = useTypedSelector((store) => store.layout.navbarColor);
  const user = useTypedSelector((store) => store.auth.currentUser);

  const avatar = user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;
  const firstUserLetter = user && (user.firstName || user.email)[0].toUpperCase();

  const toggleFocus = () => {
    setFocus((prevState) => !prevState);
  };

  const doLogout = () => {
    dispatch(logoutUser());
  };

  // collapse/uncolappse
  const switchSidebar = () => {
    if (sidebarOpened) {
      dispatch(closeSidebar());
      dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = location.pathname.split('/');
      paths.pop();
      dispatch(openSidebar());
      dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  };

  // static/non-static
  const handleToggleSidebar = () => {
    console.log(sidebarStatic);
    dispatch(toggleSidebar(!sidebarStatic));
    if (sidebarStatic) {
      localStorage.setItem('staticSidebar', 'false');
      dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem('staticSidebar', 'true');
      const paths = location.pathname.split('/');
      paths.pop();
      dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <Navbar
      className={`${s.root} d-print-none ${
        navbarType === NavbarTypes.FLOATING ? s.navbarFloatingType : ''
      }`}
      style={{ backgroundColor: navbarColor, zIndex: !openUsersList ? 100 : 0 }}
    >
      <Nav>
        <NavItem>
          <NavLink className="d-md-down-none ml-5" id="toggleSidebar" onClick={handleToggleSidebar}>
            <i
              className={`la la-bars ${chroma(navbarColor).luminance() < 0.4 ? 'text-white' : ''}`}
            />
          </NavLink>
          <UncontrolledTooltip placement="bottom" target="toggleSidebar">
            Turn on/off
            <br />
            sidebar
            <br />
            collapsing
          </UncontrolledTooltip>
          <NavLink className="fs-lg d-lg-none" onClick={switchSidebar}>
            <span className={`rounded rounded-lg d-md-none d-sm-down-block`}>
              <i
                className="la la-bars"
                style={{
                  fontSize: 30,
                  color:
                    navbarColor === '#ffffff'
                      ? '#ffffff'
                      : chroma(navbarColor).luminance() < 0.4
                      ? '#ffffff'
                      : '',
                }}
              />
            </span>
            <i
              className={`la la-bars ml-3 d-sm-down-none ${
                chroma(navbarColor).luminance() < 0.4 ? 'text-white' : ''
              }`}
            />
          </NavLink>
        </NavItem>
      </Nav>

      <Form className={`d-sm-down-none ml-5 ${s.headerSearchInput}`} inline>
        <FormGroup>
          <InputGroup
            onFocus={toggleFocus}
            onBlur={toggleFocus}
            className={cx('input-group-no-border', { focus: !!focus })}
          >
            <InputGroupAddon addonType="prepend">
              <i className="la la-search" />
            </InputGroupAddon>
            <Input
              id="search-input"
              placeholder="Search Dashboard"
              className={cx({ focus: !!focus })}
            />
          </InputGroup>
        </FormGroup>
      </Form>

      <NavLink
        className={`${s.navbarBrand} d-md-none ${
          chroma(navbarColor).luminance() < 0.4 ? 'text-white' : ''
        }`}
      >
        <i className="la la-circle text-primary mr-n-sm" />
        <i className="la la-circle text-danger" />
        &nbsp; react um &nbsp;
        <i className="la la-circle text-danger mr-n-sm" />
        <i className="la la-circle text-primary" />
      </NavLink>

      <Nav className="ml-auto">
        <NavbarText>
          <span className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}>
            {avatar ? (
              <img src={avatar} alt="..." title={user && (user.firstName || user.email)} />
            ) : (
              <span title={user && (user.firstName || user.email)}>{firstUserLetter}</span>
            )}
          </span>
          <span
            className={`d-sm-down-none ${
              chroma(navbarColor).luminance() < 0.4 ? 'text-white' : ''
            }`}
          >
            {user && (user.firstName || user.email)}
          </span>
        </NavbarText>
        <Dropdown nav isOpen={menuOpen} toggle={toggleMenu} className="tutorial-dropdown pr-4">
          <DropdownToggle nav>
            <i
              className={`la la-cog ${chroma(navbarColor).luminance() < 0.4 ? 'text-white' : ''}`}
            />
          </DropdownToggle>
          <DropdownMenu right className={`super-colors`}>
            <DropdownItem href="/#/app/profile">
              <i className="la la-user" /> My Account
            </DropdownItem>
            <DropdownItem onClick={doLogout}>
              <i className="la la-sign-out" /> Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
