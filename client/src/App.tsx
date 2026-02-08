import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-[#242424] flex flex-col items-center justify-center text-white font-sans">
            <div className="flex gap-10 mb-10">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="h-32 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="h-32 animate-[spin_20s_linear_infinite] hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all" alt="React logo" />
                </a>
            </div>

            <h1 className="text-5xl font-bold mb-8">Vite + React</h1>

            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl border border-gray-800 text-center">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="bg-[#646cff] hover:bg-[#747bff] px-6 py-3 rounded-lg font-medium transition-colors mb-4"
                >
                    count is {count}
                </button>
                <p className="text-gray-400 mt-4">
                    Edit <code className="bg-gray-800 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
                </p>
            </div>

            <p className="mt-8 text-gray-500">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default App