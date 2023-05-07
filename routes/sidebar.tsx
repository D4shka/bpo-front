/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route);
  }

  return route?.exact
    ? pathname == route?.path
    : route?.path
    ? pathname.indexOf(route.path) === 0
    : false;
}

const routes: IRoute[] = [
  // {
  //   path: "/example",
  //   icon: "HomeIcon",
  //   name: "Нүүр хуудас",
  // },
  {
    path: "/example/forms",
    icon: "FormsIcon",
    name: "Цэрэг нэмэх",
  },
  {
    path: "/example/modals",
    icon: "ModalsIcon",
    name: "Цэргийн мэдээлэл шинчлэх",
  },
  {
    path: "/example/charts",
    icon: "ChartsIcon",
    name: "Хэрэглэгч нэмэх",
  },
  {
    path: "/example/cards",
    icon: "CardsIcon",
    name: "Хэрэглэгчийн мэдээлэл шинчлэх",
  },
  // {
  //   path: "/example/buttons",
  //   icon: "ButtonsIcon",
  //   name: "Нүүр хуудөс",
  // },
  {
    path: "/example/tables",
    icon: "TablesIcon",
    name: "Жагсаалт харах",
  },
  {
    icon: "PagesIcon",
    name: "Pages",
    routes: [
      // submenu
      {
        path: "/example/login",
        name: "Login",
      },
      {
        path: "/example/create-account",
        name: "Create account",
      },
      {
        path: "/example/forgot-password",
        name: "Forgot password",
      },
      {
        path: "/example/404",
        name: "404",
      },
      {
        path: "/example/blank",
        name: "Blank",
      },
    ],
  },
];

export type { IRoute };
export default routes;
