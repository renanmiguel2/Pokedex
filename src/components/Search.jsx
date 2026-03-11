import { useRef, useState } from "react"
import axios from "axios"
import Card from "./Card"
import Primary from "./Primary"

function Search() {
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState(null)
    const inputRef = useRef()
    async function busca() {
        const nome = inputRef.current.value.toLowerCase()
        if (!nome) {
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
            <form className="flex gap-1 md:gap-4 justify-center " onSubmit={(e) => {
                e.preventDefault()
                busca()
            }}>
                <input type="text" placeholder="Procure um Pokémon..." ref={inputRef} className="bg-white md:w-135 px-2 py-2 rounded-xl outline-none" />
                <button type="submit" className="bg-black text-white px-3 rounded-xl hover:bg-gray-800 duration-100 ease-in-out cursor-pointer">Pesquisar</button>
            </form>
            <div className="mt-20">
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {pokemon ? <Card pokemon={pokemon} /> : <Primary />}
            </div>

            <div className="fixed bottom-5 right-5">
                <button onClick={() => {
                    if(inputRef.current) {
                        inputRef.current.value = ""
                    }
                    setPokemon(null)
                    setError(null)
                }} className="cursor-pointer">
                    <svg width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="icomoon-ignore">
                        </g>
                        <path d="M14.389 7.956v4.374l1.056 0.010c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zM15.456 5.893l-12.795 9.063 12.795 9.063v-5.332c5.121 0.002 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z" fill="#000000">

                        </path>
                    </svg>
                </button>
            </div>
        </div>
    )
}
export default Search;