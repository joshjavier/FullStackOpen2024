import { useState, useEffect } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setCounter(c => c + 1)
    }, 1000);

    return () => clearTimeout(id)
  }, [counter])

  return <div>{counter}</div>
}

export default App
