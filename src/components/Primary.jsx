import { useEffect, useState } from "react"
import axios from "axios"

function Primary() {
    const typeColors = {
        grass: "bg-green-500",
        fire: "bg-red-500",
        water: "bg-blue-500",
        electric: "bg-yellow-400",
        bug: "bg-lime-500",
        normal: "bg-gray-400",
        poison: "bg-purple-500",
        ground: "bg-yellow-700",
        fairy: "bg-pink-400",
        fighting: "bg-orange-700",
        psychic: "bg-pink-600",
        rock: "bg-stone-500",
        ghost: "bg-indigo-500",
        ice: "bg-cyan-300",
        dragon: "bg-indigo-700",
        dark: "bg-gray-800",
        steel: "bg-gray-500",
        flying: "bg-sky-400",
    };


    const [pokemons, setPokemons] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)
    const [loading, setLoading] = useState(false)

    const urlBase = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    async function fetchPokemons(url) {
        setLoading(true)
        const response = await axios.get(url)

        setNextPage(response.data.next)
        setPrevPage(response.data.previous)

        const pokemonDetails = await Promise.all(
            response.data.results.map(async (pokemon) => {
                const res = await axios.get(pokemon.url)
                return res.data
            })
        )

        setPokemons(pokemonDetails)
        setLoading(false)
    }

    useEffect(() => {
        fetchPokemons(urlBase)
    }, [])

    return (
        <div className="flex flex-col gap-8">
                {loading && (
                    <p className="text-center text-gray-500">Carregando pokémons...</p>
                )}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 max-w-4xl mx-auto justify-center">
                {pokemons.map((pokemon) => {
                    const type = pokemon.types[0].type.name

                    return (

                        <div key={pokemon.id} className="flex flex-col items-center gap-2 w-40 bg-gray-200 rounded-lg p-4 hover:scale-105 transition-transform duration-300">


                            <h2 className={`font-bold text-lg text-gray-500`}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>

                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

                            <h2 className={`text-md font-semibold text-gray-400 px-2 rounded`}>#
                                {pokemon.id.toString().padStart(3, "0")}
                            </h2>

                            <h2 className={`text-sm md:text-md font-semibold text-white py-1 px-3 text-center rounded ${typeColors[type]} min-w-25`}>
                                {pokemon.types.map((t) => t.type.name).join(", ")}
                            </h2>
                        </div>
                    )
                })}
            </div>

            <div className="flex gap-4 justify-center py-3">
                {prevPage && (
                    <button
                        onClick={() => fetchPokemons(prevPage)}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 duration-100 ease-in-out cursor-pointer"
                    >
                        Voltar
                    </button>
                )}

                {nextPage && (
                    <button
                        onClick={() => fetchPokemons(nextPage)}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 duration-100 ease-in-out cursor-pointer"
                    >
                        Próxima
                    </button>
                )}
            </div>
        </div>
    );
}

export default Primary;