import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="relative flex-none overflow-hidden px-0 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[135rem] lg:max-w-[32rem] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden justify-center bg-slate-100 text-primary px-6 lg:px-0">
        <div className="mx-auto max-w-xl lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
            <div className="relative">
              <>
                <div>
                  <Link href="/">
                    <div className="flex items-center space-x-4">
                      <Image
                        className="select-none"
                        src="/logo.png"
                        alt="BeerFolio - Logo"
                        width={100}
                        height={100}
                      />

                      <h1 className="text-4xl font-bold">BeerFolio</h1>
                    </div>
                  </Link>
                </div>

                <h1 className="mt-14 font-display text-4xl/tight font-light">
                  Sip, savor, and story-tell with BeerFolio,{' '}
                  <span className="font-medium">your beer's portfolio!</span>
                </h1>

                <p className="mt-4 text-sm/6 opacity-70">
                  Discover a lively space where your beer portfolio comes to
                  life. It's your personal diary for brewing adventures,
                  capturing each tasting note and memory with playful spirit!
                </p>

                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-semibold shadow-lg transition duration-300 ease-in-out opacity-95 hover:opacity-100 focus:outline-none bg-primary text-secondary mt-6 uppercase"
                  href="https://github.com/nelsonsilvadev/beerfolio"
                  target="_blank"
                >
                  Uncover the source
                </Link>
              </>
            </div>
          </div>

          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
              <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
                BeerFolio &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
