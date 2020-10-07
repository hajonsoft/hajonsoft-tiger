export interface IHeaderConfig {
    logo: string;
    smallLogo?: string;
    user?:{
        isLoggedIn: boolean;
    }
    elevation?: number;
    sideMenu: {
        title: string;
        items: IMenuItem[]
    };
    buttons: IMenuItem[];
    bookmarks?: IMenuItem[];
}

export interface IMenuItem {
    name?: string;
    route?: string;
    title: string;
    width?: string;
    icon?: any;
    menuItems?: IMenuItem[]
}
export interface IButtonState {
    key: string;
    open: boolean;
    anchorElement: string;
}
export interface state {
    drawerOpen: boolean;
    buttons: IButtonState[],
    sidebar: { selectedItem: string, selectedSubItem: string, anchorElement: any | null }
}