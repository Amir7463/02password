import { useState, useCallback , useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [pass1, setPass1] = useState("")

  // use ref hook

  const passref = useRef()

  const passgen = useCallback(() => {
    let pass = ""
    let str =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (char) str += "@#$&"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPass1(pass)

  }, [length, number, char,pass1])

  const copy = useCallback(() => {
    passref.current?.select()
    window.navigator.clipboard.writeText(pass1)
  },[pass1])

  useEffect(() => {
    passgen()
  },[length,number,char,setPass1])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3  text-xl'>Password Generator</h1>
        
        <div className='flex shadow  overfow-hidden mb-4'>
          <input type="text"
            value={pass1}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button
          
          onClick={copy}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-sky-600'>Copy</button>
        </div>
  
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={number}
              className='cursor-pointer'
              onChange={() => {
                setNumber((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={char}
              className='cursor-pointer'
              onChange={() => {
                setChar((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
