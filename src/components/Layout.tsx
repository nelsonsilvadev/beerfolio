import { FC, ReactNode } from 'react'

import Sidebar from './Sidebar'

interface ILayout {
  children: ReactNode
}

const Layout: FC<ILayout> = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Sidebar />

      <div className="relative flex-auto">
        <main className="space-y-20 py-20 sm:space-y-32 sm:py-32">
          <div className="mx-auto px-6 lg:flex lg:px-8">
            <div className="lg:ml-96 lg:flex lg:w-full lg:pl-32">
              <div className="mx-auto max-w-3xl lg:w-0 lg:max-w-7xl lg:flex-auto">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout
