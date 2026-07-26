import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20">
      <div className="container-max container-px text-center">
        <div className="font-display text-8xl font-semibold text-gradient">404</div>
        <h1 className="mt-4 font-display text-2xl font-semibold text-white">This chunk doesn't exist</h1>
        <p className="mt-2 text-sand-400">The page you're looking for may have been shipped elsewhere.</p>
        <Link to="/" className="mt-8 btn-primary inline-flex">
          <Home className="h-4 w-4" />
          Back to Shipyard
        </Link>
      </div>
    </div>
  )
}
