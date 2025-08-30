import { createRouter, createRoute, createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { Home } from './pages/Home'
import { Registry } from './pages/Registry'

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-pink-50 text-foreground">
      <nav className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
            John & Aria Wedding
          </Link>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide">
              Home
            </Link>
            <Link to="/registry" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide">
              Registry
            </Link>
          </div>
        </div>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const registryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/registry',
  component: Registry,
})

const routeTree = rootRoute.addChildren([indexRoute, registryRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
