import { useRef, useState } from "react"
import axios from "axios"

function Search() {
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState(null)
    const inputRef = useRef()
    async function busca() {
        const nome = inputRef.current.value.toLowerCase()
        if(!nome) {
            setError("Por favor, insira o nome de um Pokémon.")
            setPokemon(null)
            return
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${nome}`
        try {    
            const response = await axios.get(url)
            const data = response.data
            setPokemon(data)
            setError(null)
        } catch (error) {
            setPokemon(null)
            setError("Pokémon não encontrado. Tente novamente.")
        }
    }
    return (
        <div className="flex flex-col items-center py-15 gap-3">
            <h1 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold mb-8">Pokedex</h1>
            <div className="flex gap-1 md:gap-4 justify-center ">
                <input type="text" placeholder="Procure um Pokémon..." ref={inputRef} className="bg-white md:w-135 px-2 py-2 rounded-xl outline-none" />
                <button onClick={busca} className="bg-black text-white px-3 rounded-xl hover:bg-gray-800 duration-100 ease-in-out cursor-pointer">Pesquisar</button>
            </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    )
}
export default Search;
