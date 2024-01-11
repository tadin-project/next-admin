const api = "api/";

const AppRoutes = {
  // auth
  login: "/",
  // admin panel
  dashboard: "/dashboard",
  users: "/users",
  // api
  api: {
    users: api + "users",
    // auth
    login: api + "login",
    logout: api + "logout",
  },
};

export default AppRoutes;
