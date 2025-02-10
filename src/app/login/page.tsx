"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { FaEnvelope, FaLock } from "react-icons/fa"
import Header from "@/components/ui/Header"
import Logo from "@/components/ui/Logo"
import Footer from "@/components/ui/Footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isProfessional, setIsProfessional] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    let isValid = true
    setEmailError("")
    setPasswordError("")

    if (!email) {
      setEmailError("El correo electrónico es requerido")
      isValid = false
    }

    if (!password) {
      setPasswordError("La contraseña es requerida")
      isValid = false
    }

    return isValid
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error desconocido.")
      }

      const result = await response.json()
      console.log("Inicio de sesión exitoso:", result)

      // Redirigir según el rol recibido del servidor
      const roleFromServer = result.role
      if (roleFromServer === (isProfessional ? "Healthcare Professional" : "Patient")) {
        router.push(roleFromServer === "Healthcare Professional" ? "/professional/dashboard" : "/patient/dashboard")
      } else {
        setErrorMessage(`Uy! Parece que tu rol no es como ${isProfessional ? "profesional" : "paciente"}.`)
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message === "Failed to fetch"
            ? "No se pudo conectar al servidor. Inténtalo de nuevo más tarde."
            : error.message,
        )
      }
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${isProfessional ? "bg-green-50" : "bg-blue-50"}`}
    >
      <div className="hidden lg:block">
        <Header isProfessional={isProfessional} onToggleProfessional={() => setIsProfessional((prev) => !prev)} />
      </div>
      <div className="flex-grow flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <header className="text-center mb-8 flex flex-col items-center">
            <Logo size={80} color={isProfessional ? "green" : "blue"} />
            <h1 className={`text-3xl font-bold ${isProfessional ? "text-green-600" : "text-blue-600"} mt-4`}>
              Healthy
            </h1>
            <p className="text-gray-600 mt-2">Tu salud, en tus manos</p>
          </header>

          <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-1">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Introduce tu correo"
                />
              </div>
              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Introduce tu contraseña"
                />
              </div>
              {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            </div>
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Regresar
              </button>
              <button
                type="submit"
                className={`font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
                  isProfessional ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => router.push("/register")}
                className={`text-sm ${
                  isProfessional ? "text-green-600 hover:text-green-800" : "text-blue-600 hover:text-blue-800"
                }`}
              >
                ¿No tienes una cuenta? ¡Regístrate!
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/recover-password")}
                className={`text-sm ${
                  isProfessional ? "text-green-600 hover:text-green-800" : "text-blue-600 hover:text-blue-800"
                }`}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>

          {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

          <div className="text-center mt-2 lg:hidden">
            <button
              onClick={() => setIsProfessional((prev) => !prev)}
              className={`w-full mb-4 px-6 py-2 rounded-full font-semibold text-white ${
                isProfessional ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProfessional ? "¿Eres un paciente?" : "¿Eres un profesional de la salud?"}
            </button>
          </div>
          <footer className="text-xs text-gray-500 text-center mt-6">
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidad
            </a>
            .
          </footer>
        </div>
      </div>
      <div className="hidden lg:block">
        <Footer isProfessional={isProfessional} />
      </div>
    </div>
  )
}