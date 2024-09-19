import { Suspense } from "react"

const SuspenseComponent = ({children}) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        {children}
    </Suspense>
  )
}

const Container = ({children}) => {
  return (
    <div className="container max-w-[1200px] mx-auto">
        {children}
    </div>
  )
}

export {SuspenseComponent, Container}