export interface NavigationState {
  sidebarOpened: boolean;
  sidebarStatic: any;
  activeItem: any;
}

export enum NavigationActionTypes {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  OPEN_SIDEBAR = 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  CHANGE_ACTIVE_SIDEBAR_ITEM = 'CHANGE_ACTIVE_SIDEBAR_ITEM',
}

interface ToggleSidebar {
  type: NavigationActionTypes.TOGGLE_SIDEBAR;
  payload: any;
}

interface OpenSidebar {
  type: NavigationActionTypes.OPEN_SIDEBAR;
}

interface CloseSidebar {
  type: NavigationActionTypes.CLOSE_SIDEBAR;
}

interface ChangeActiveSidebarItem {
  type: NavigationActionTypes.CHANGE_ACTIVE_SIDEBAR_ITEM;
  payload: any;
}

export type NavigationAction = ToggleSidebar | OpenSidebar | CloseSidebar | ChangeActiveSidebarItem;
