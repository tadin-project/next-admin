const api = "api/";

const AppRoutes = {
  // auth
  login: "/",
  // admin panel
  dashboard: "/dashboard",
  users: "/users",
  // api
  api: {
    login: api + "login",
    logout: api + "logout",
  },
};

export default AppRoutes;
