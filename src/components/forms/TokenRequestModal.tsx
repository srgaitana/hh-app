"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "./FormComponents"

interface TokenRequestModalProps {
  onClose: () => void
}

const TokenRequestModal: React.FC<TokenRequestModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar la solicitud de token
    console.log("Solicitud de token para:", email)
    setMessage("Solicitud enviada. Revisa tu correo electrónico para obtener el token.")
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Solicitar Token de Registro</h3>
        <div>
          <Input
            label="Correo Electrónico"
            id="requestEmail"
            name="requestEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Solicitar Token
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cerrar
            </button>
          </div>
        </div>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  )
}

export default TokenRequestModal

