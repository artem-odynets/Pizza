'use client'
import { useState } from "react";

export default function Counter() {
    const [counter, setCounter] = useState<number>(1);
    
  return (
    <div>
    <p>count {counter}</p>
    <button onClick={() => setCounter(counter + 1)}>bbbbb+</button>
    <button onClick={() => setCounter(counter - 1)}>-------</button>
    </div>
  )
}
