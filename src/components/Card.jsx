import  typeColors  from "../utils/colors"
function Card ({ pokemon}) {
    if (!pokemon) return null
    console.log(pokemon)

    return (
        <div className="flex flex-col items-center gap-2 w-40 bg-gray-200 rounded-lg p-4">
            <h2 className={`font-bold text-lg text-gray-500`}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2 className={`text-md font-semibold text-gray-600 px-2 rounded`}>#
                {pokemon.id.toString().padStart(3, "0")}
            </h2>
            <h2 className={`text-sm md:text-md font-semibold text-white py-1 px-3 text-center rounded ${typeColors[pokemon.types[0].type.name]} min-w-25`}>
                {pokemon.types.map((t) => t.type.name).join(", ")}
            </h2>
            </div>
    )
}
export default Card;