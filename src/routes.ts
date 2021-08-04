import { AppstoreAddOutlined, AppstoreOutlined, HomeOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import IRoute from "./models/IRoute";

const traverse = (routes: IRoute[]): any => {
  let map: any = {};
  for (let i = 0; i < routes.length; i++) {
    map[routes[i].path] = { name: routes[i].breadcrumbName, icon: routes[i].icon };
    if (routes[i].children) {
      let subroutes = traverse(routes[i].children || []);
      Object.assign(map, subroutes);
    }
  }
  return map;
};

export const ROUTE_DASHBOARD = "dashboard.title";
export const ROUTE_CLIENTS = "clients.title";
export const ROUTE_CLIENTS_ADD = "clients.page_add.title";
export const ROUTE_CLIENTS_UPDATE = "clients.page_update.title";

export const routes: IRoute[] = [
  {
    path: "/",
    breadcrumbName: ROUTE_DASHBOARD,
    siderKey: ROUTE_DASHBOARD,
    icon: HomeOutlined,
  },
  {
    path: "/clients",
    breadcrumbName: ROUTE_CLIENTS,
    siderKey: ROUTE_CLIENTS,
    icon: AppstoreOutlined,
    children: [
      {
        path: "/clients/add",
        breadcrumbName: ROUTE_CLIENTS_ADD,
        siderKey: ROUTE_CLIENTS,
        icon: AppstoreAddOutlined,
      },
      {
        path: "/clients/edit/:clientId",
        breadcrumbName: ROUTE_CLIENTS_UPDATE,
        siderKey: ROUTE_CLIENTS,
        icon: AppstoreAddOutlined,
      },
    ],
  },
];

export const routesMap = traverse(routes);

export const getRouteStack = (routes: IRoute[], key: string): IRoute[] => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].breadcrumbName === key) {
      const route = { ...routes[i] };
      delete route.children;
      return [route];
    } else if (routes[i].children) {
      let subRoutes = getRouteStack(routes[i].children || [], key);
      if (subRoutes.length) {
        const route = { ...routes[i] };
        delete route.children;
        subRoutes.unshift(route);
        return subRoutes;
      }
    }
  }
  return [];
};
