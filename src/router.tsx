import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";

const rootRoute = createRootRoute({
  component: () => <div><Outlet /></div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterList,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page ?? 1),
  }),
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetails,
});

const routeTree = rootRoute.addChildren([indexRoute, characterRoute]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

