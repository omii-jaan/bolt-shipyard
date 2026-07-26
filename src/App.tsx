import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductPage'
import FlowchartPage from './pages/FlowchartPage'
import BuildersPage from './pages/BuildersPage'
import PricingPage from './pages/PricingPage'
import DocsPage from './pages/DocsPage'
import DashboardPage from './pages/DashboardPage'
import NewProjectPage from './pages/NewProjectPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/flowchart" element={<FlowchartPage />} />
        <Route path="/builders" element={<BuildersPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/new" element={<NewProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
