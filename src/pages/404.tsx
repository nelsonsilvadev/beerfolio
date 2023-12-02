import Layout from '@/components/Layout'

import Link from 'next/link'

export default function FourOFour() {
  return (
    <Layout>
      <div className="mt-0 py-50 lg:py-0 lg:-mt-32 flex flex-col lg:items-center lg:justify-center lg:h-screen text-center">
        <h1 className="text-5xl lg:text-6xl font-bold mb-2">Oops! 🍺</h1>

        <p className="text-xl mt-4">
          Looks like this beer doesn't exist... yet.
        </p>

        <p className="mt-2">Maybe it's still brewing? 🤔</p>

        <Link
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-semibold shadow-lg transition duration-300 ease-in-out opacity-95 hover:opacity-100 focus:outline-none bg-primary text-secondary mt-6 mx-auto uppercase"
          href="/"
        >
          Return to beerfolio
        </Link>
      </div>
    </Layout>
  )
}
