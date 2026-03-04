import { useRef } from "react";

function Seacrh() {
    const inputRef = useRef();
    function busca() {
        const pokemon = inputRef.current.value;
        console.log(pokemon);
    }
    return (
        <div className="bg-gray-200 h-screen flex flex-col items-center py-15 px-4">
            <h1 className="font-['Orbitron'] text-3xl sm:text-4xl font-bold mb-8">Pokedex</h1>
            <div className="flex gap-4">
                <input type="text" placeholder="Procure um Pokémon..." ref={inputRef} className="bg-white md:w-135 px-2 py-2 rounded-xl outline-none" />
                <button onClick={busca} className="bg-black text-white px-3 rounded-xl hover:bg-gray-800 duration-100 ease-in-out cursor-pointer">Pesquisar</button>
            </div>
        </div>
    )
}
export default Seacrh;