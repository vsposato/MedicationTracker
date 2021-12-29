/* eslint-disable import/prefer-default-export */
import { NavigationAction, NavigationActionTypes } from 'types/redux/navigation';

export function toggleSidebar(state: any) {
  return {
    type: NavigationActionTypes.TOGGLE_SIDEBAR,
    payload: state,
  };
}

export function openSidebar() {
  return {
    type: NavigationActionTypes.OPEN_SIDEBAR,
  };
}

export function closeSidebar() {
  return {
    type: NavigationActionTypes.CLOSE_SIDEBAR,
  };
}

export function changeActiveSidebarItem(activeItem: any) {
  return {
    type: NavigationActionTypes.CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}
