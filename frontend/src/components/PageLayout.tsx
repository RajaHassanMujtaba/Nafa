import Navbar from './Navbar'

interface PageLayoutProps {
  children: React.ReactNode
  transparent?: boolean
}

export default function PageLayout({ children, transparent = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar transparent={transparent} />
      {children}
    </div>
  )
}
