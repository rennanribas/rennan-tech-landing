import {
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LeetCode from "./pages/LeetCode";
import Sorting from "./pages/Sorting";
import Provinces from "./pages/Provinces";
import SmallestMissingPositive from "./pages/SmallestMissingPositive";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "leetcode", element: <LeetCode /> },
      { path: "leetcode/sorting", element: <Sorting /> },
      { path: "provinces", element: <Provinces /> },
      { path: "smallest-missing-positive", element: <SmallestMissingPositive /> },
    ],
  },
];

export type RouterProps = { url?: string };

export function Router({ url }: RouterProps = {}) {
  const router =
    typeof window === "undefined"
      ? createMemoryRouter(routes, { initialEntries: [url || "/"] })
      : createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
