import App from "./App"
import type { RouteObject } from "react-router-dom";
const routes : RouteObject[] = [
    {
        path: "/",
        element: <App />,
    }
]

export default routes;