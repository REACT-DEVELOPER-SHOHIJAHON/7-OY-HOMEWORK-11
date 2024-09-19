import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import { SuspenseComponent as Suspense } from "../utils";

const Home = lazy(() => import('../routes/home/Home'));
const Profile = lazy(() => import('../routes/dashboard/profile/Profile'));
const Auth = lazy(() => import('../routes/auth/Auth'));
const Login = lazy(() => import('../routes/auth/login/Login'));
const SignUp = lazy(() => import('../routes/auth/signup/SignUp'));
const NotFound = lazy(() => import('../routes/not-found/NotFound'));
const Private = lazy(() => import('../routes/private/Private'));
const Details = lazy(() => import('../routes/details/Details'));
const Search = lazy(() => import('../routes/search/Search'));
const Users = lazy(() => import('../routes/dashboard/users/Users'));
const Dashboard = lazy(() => import('../routes/dashboard/Dashboard'));
const Like = lazy(() => import('../components/liked/Liked'));

const RouteController = () => {
    return useRoutes([
        {
            path: "/",
            element: <Suspense><Home /></Suspense>
        },
        {
            path: "/liked",
            element: <Suspense><Like /></Suspense>
        },
        {
            path: "/dashboard",
            element: <Suspense><Private /></Suspense>,
            children: [
                {
                    path: "/dashboard/",
                    element: <Suspense><Dashboard /></Suspense>,
                    children: [
                        {
                            path: "/dashboard/profile",
                            element: <Suspense><Profile /></Suspense>
                        },
                        {
                            path: "/dashboard/users",
                            element: <Suspense><Users /></Suspense>
                        }
                    ]

                }

            ]
        },
     
        {
            path: "/search",
            element: <Suspense><Search /></Suspense>
        },
        {
            path: "/auth",
            element: <Suspense><Auth /></Suspense>,
            children: [
                {
                    path: "/auth/login",
                    element: <Suspense><Login /></Suspense>
                },
                {
                    path: "/auth/signup",
                    element: <Suspense><SignUp /></Suspense>
                }
            ]
        },
        {
            path: "/products/:id",
            element: <Suspense><Details /></Suspense>
        },
        {
            path: "*",
            element: <Suspense><NotFound /></Suspense>
        }
    ])
}

export default RouteController