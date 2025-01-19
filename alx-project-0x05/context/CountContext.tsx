import { createContext, useContext, useState, ReactNode } from "react"

interface CountContextProps {
  count: number
  increment: () => void
  decrement: () => void
}

const defaultContextValue: CountContextProps = {
  count: 0,
  increment: () => {},
  decrement: () => {},
};

export const CountContext = createContext<CountContextProps>(defaultContextValue);

export const CountProvider = ({ children }: { children: ReactNode}) => {

  const [count, setCount] = useState<number>(0)

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev > 0 ? prev - 1 : 0)

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  )
}



export const useCount = () => {
  const context = useContext(CountContext)

  if (!context) {
    throw new Error("useCount must be within a Count Provider")
  }

  return context
}