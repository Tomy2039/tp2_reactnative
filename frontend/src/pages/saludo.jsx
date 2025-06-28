import { useState } from "react";

export default function Saludo() {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleClick = async () => {
        setError('');
        setMensaje('');

        if (nombre.trim() === '') {
            setError('Ingrese un nombre, por favor.');
            return;
        }

        try {
            const validarRespuesta = await fetch(`http://localhost:3000/validar/${nombre}`);
            const validarDato = await validarRespuesta.json();

            if (!validarDato.valido) {
                setError('Este nombre no es válido.');
                return;
            }

            const saludoRespuesta = await fetch(`http://localhost:3000/saludo/${nombre}`);
            const saludoDato = await saludoRespuesta.json();
            setMensaje(saludoDato.mensaje);
        } catch (e) {
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Validación de Usuario</h1>
                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleClick}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Validar
                </button>

                {mensaje && (
                    <p className="mt-4 text-green-600 text-center font-medium">{mensaje}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
                )}
            </div>
        </div>
    );
}
