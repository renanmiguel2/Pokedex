function Card({ pokemon }) {
    if (!pokemon) return null;
    return (
        <div>
            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
            )}
                
        </div>
    )
}
export default Card;