import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ crumbs }) => {
  // Don't render a single breadcrumb.
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <div className="mb-4 bg-gray-300">
      {/* Link back to any previous steps of the breadcrumb. */}
      {crumbs.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key} className="bold">
            {name}
          </span>
        ) : (
          <Link key={key} className="underline text-blue-500 mr-4" to={path}>
            {name}
          </Link>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
// const routes = [ 
//   {path: "/dashboard", component: DashboardPage},
//   {path: "/user-profile", component: UserProfilePage},
//   {path: "/logout", component: Logout},
//   {path: "/password", component: ChangePassword},
//   {path: "/locations-list", component: LocationsStep},
//   {path: "/friends-list", component: FriendsStep},
//   {path: "/latest-alerts", component: LatestAlerts},
//   {path: "/auth/login", component: Login},
//   {path: "/auth/forgot-password", component: ForgotPasswordPage},
//   {path: "/auth/profilestepper",  component: ProfileStepper}
// ];

// {routes.map(({path, Component}, key) => (
//   <Route
//     exact
//     path={path}
//     key={key}
//     render={props => {
//       const crumbs = routes
//         // Get all routes that contain the current one.
//         .filter(({ path }) => props.match.path.includes(path))
//         // Swap out any dynamic routes with their param values.
//         // E.g. "/pizza/:pizzaId" will become "/pizza/1"
//         .map(({ path, ...rest }) => ({
//           path: Object.keys(props.match.params).length
//             ? Object.keys(props.match.params).reduce(
//                (path, param) => path.replace(
//                  `:${param}`, props.match.params[param]
//                ), path
//               )
//             : path,
//           ...rest
//         }));
//       console.log(`Generated crumbs for ${props.match.path}`);
//       crumbs.map(({ name, path }) => console.log({ name, path }));
//       return (
//         <div className="p-8">
//           <Component {...props} />
//         </div>
//       );
//     }}
//   />
// ))}
