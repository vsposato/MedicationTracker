import React from 'react';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import {
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from 'store/actions/navigationActions';
import isScreen from '../../core/screenHelper';
import { logoutUser } from 'store/actions/authActions';

import classnames from 'classnames';

import s2 from './LinksGroup/LinksGroup.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const Sidebar = () => {
  const sidebarStatic = useTypedSelector((store) => store.navigation.sidebarStatic);
  const sidebarOpened = useTypedSelector((store) => store.navigation.sidebarOpened);
  const activeItem = useTypedSelector((store) => store.navigation.activeItem);
  const currentUser = useTypedSelector((store) => store.auth.currentUser);

  const location = useLocation();
  const dispatch = useDispatch();

  const onMouseEnter = () => {
    if (!sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
      const paths = location.pathname.split('/');
      paths.pop();
      dispatch(openSidebar());
      dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  };

  const onMouseLeave = () => {
    if (!sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
      dispatch(closeSidebar());
      dispatch(changeActiveSidebarItem(null));
    }
  };

  const doLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className={`${!sidebarOpened && !sidebarStatic ? s.sidebarClose : ''} ${s.sidebarWrapper}`}
    >
      <nav onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={s.root}>
        <header className={s.logo}>
          <a href="/">
            <span className={`${s.logoStyle} mx-1`}>MedicationTracker</span>
          </a>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={activeItem}
            header="Dashboard"
            link="/app/dashboard"
            isHeader
            iconName="la-home"
          />

          {currentUser && currentUser.role === 'admin' && (
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Users"
              link="/admin/users"
              isHeader
              iconName="la-users"
            />
          )}

          {currentUser && currentUser.role === 'admin' && (
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Medications"
              link="/admin/medications"
              isHeader
              iconName="la-users"
            />
          )}

          {currentUser && currentUser.role === 'admin' && (
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={activeItem}
              header="Medication_fills"
              link="/admin/medication_fills"
              isHeader
              iconName="la-users"
            />
          )}

          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={activeItem}
            header="My Profile"
            link="/app/profile"
            isHeader
            iconName="la-user"
          />

          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={activeItem}
            header="Change Password"
            link="/app/password"
            isHeader
            iconName="la-key"
          />

          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={activeItem}
            header="Documentation"
            link="/documentation"
            isHeader
            iconName="la-book"
            index="documentation"
            labelColor="success"
            target="_blank"
            rel="noreferrer"
          />

          <li className={classnames('link-wrapper', s2.headerLink)}>
            <a
              target={'_blank'}
              rel="noreferrer"
              href={
                process.env.NODE_ENV === 'production'
                  ? window.location.origin + '/api-docs'
                  : 'http://localhost:8080/api-docs'
              }
            >
              <span className={classnames('icon', s2.icon)}>
                <i className={`la la-book`} />
              </span>
              API docs
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
