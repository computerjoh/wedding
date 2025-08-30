import { createRouter, createRoute, createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { Home } from './pages/Home'
import { Registry } from './pages/Registry'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const rootRoute = createRootRoute({
  component: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="min-h-screen bg-pink-50 text-foreground">
        <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
                John & Aria Wedding
              </Link>
              
              {/* Desktop */}
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/registry" className="text-muted-foreground hover:text-primary transition-colors">Registry</Link>
              </div>

              {/* Mobile */}
              <button
                className="md:hidden p-2 hover:text-primary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden pt-4 border-t border-border">
                <div className="space-y-2">
                  <Link to="/" className="block py-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                  <Link to="/registry" className="block py-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                    Registry
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    )
  },
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
