export interface SidebarProps {
    routes: SidebarRoute[];
}

export interface SidebarRoute {
    label: string;
    route: string;
    icon?: JSX.Element;
}
