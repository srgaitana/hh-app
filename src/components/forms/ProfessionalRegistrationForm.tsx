"use client"

import type React from "react"
import { useState } from "react"
import { Input, Select, TextArea } from "./FormComponents"
import TokenRequestModal from "./TokenRequestModal" // Import the missing component

interface FormData {
  FirstName: string
  LastName: string
  Email: string
  Password: string
  PhoneNumber: string
  DateOfBirth: string
  Gender: string
  GenderIdentity: string
  SpecialtyID: string
  Experience: string
  LicenseNumber: string
  Education: string
  ConsultationFee: string
  Role: string
  UserStatus: string
  Token: string
}

const ProfessionalRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Gender: "",
    GenderIdentity: "",
    SpecialtyID: "",
    Experience: "",
    LicenseNumber: "",
    Education: "",
    ConsultationFee: "",
    Role: "Healthcare Professional",
    UserStatus: "Active",
    Token: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [showTokenRequest, setShowTokenRequest] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.FirstName) newErrors.FirstName = "El nombre es requerido"
    if (!formData.LastName) newErrors.LastName = "El apellido es requerido"
    if (!formData.Email) newErrors.Email = "El correo electrónico es requerido"
    if (!formData.Password) newErrors.Password = "La contraseña es requerida"
    if (!formData.Gender) newErrors.Gender = "El género es requerido"
    if (!formData.SpecialtyID) newErrors.SpecialtyID = "La especialidad es requerida"
    if (!formData.LicenseNumber) newErrors.LicenseNumber = "El número de licencia es requerido"
    if (!formData.Education) newErrors.Education = "La educación es requerida"
    if (!formData.Token) newErrors.Token = "El token es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Formulario enviado:", formData)
      // Aquí iría la lógica para enviar los datos al servidor
    }
  }

  const handleTokenRequest = () => {
    setShowTokenRequest(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Registro de Profesional de la Salud</h2>
      {/* Token input */}
      <div className="mb-4">
        <Input
          label="Token de Registro"
          id="Token"
          name="Token"
          type="text"
          required
          value={formData.Token}
          onChange={handleChange}
          error={errors.Token}
        />
        <div className="mt-2">
          <button
            type="button"
            onClick={handleTokenRequest}
            className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
          >
            ¿No tienes un token? Solicítalo aquí
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          id="FirstName"
          name="FirstName"
          type="text"
          required
          value={formData.FirstName}
          onChange={handleChange}
          error={errors.FirstName}
        />
        <Input
          label="Apellido"
          id="LastName"
          name="LastName"
          type="text"
          required
          value={formData.LastName}
          onChange={handleChange}
          error={errors.LastName}
        />
      </div>
      <Input
        label="Correo electrónico"
        id="Email"
        name="Email"
        type="email"
        required
        value={formData.Email}
        onChange={handleChange}
        error={errors.Email}
      />
      <Input
        label="Contraseña"
        id="Password"
        name="Password"
        type="password"
        required
        value={formData.Password}
        onChange={handleChange}
        error={errors.Password}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Número de teléfono"
          id="PhoneNumber"
          name="PhoneNumber"
          type="tel"
          value={formData.PhoneNumber}
          onChange={handleChange}
        />
        <Input
          label="Fecha de nacimiento"
          id="DateOfBirth"
          name="DateOfBirth"
          type="date"
          value={formData.DateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Género"
          id="Gender"
          name="Gender"
          required
          options={["male", "female", "other"]}
          value={formData.Gender}
          onChange={handleChange}
          error={errors.Gender}
        />
        <Input
          label="Identidad de género"
          id="GenderIdentity"
          name="GenderIdentity"
          type="text"
          value={formData.GenderIdentity}
          onChange={handleChange}
        />
      </div>
      <Select
        label="Especialidad"
        id="SpecialtyID"
        name="SpecialtyID"
        required
        options={["Cardiología", "Pediatría", "Neurología"]}
        value={formData.SpecialtyID}
        onChange={handleChange}
        error={errors.SpecialtyID}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Años de experiencia"
          id="Experience"
          name="Experience"
          type="number"
          value={formData.Experience}
          onChange={handleChange}
        />
        <Input
          label="Número de licencia"
          id="LicenseNumber"
          name="LicenseNumber"
          type="text"
          required
          value={formData.LicenseNumber}
          onChange={handleChange}
          error={errors.LicenseNumber}
        />
      </div>
      <TextArea
        label="Educación"
        id="Education"
        name="Education"
        required
        value={formData.Education}
        onChange={handleChange}
        error={errors.Education}
      />
      <Input
        label="Honorario de consulta"
        id="ConsultationFee"
        name="ConsultationFee"
        type="number"
        value={formData.ConsultationFee}
        onChange={handleChange}
      />
      <div className="flex items-center justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
          type="submit"
        >
          Registrarse
        </button>
      </div>
      {showTokenRequest && <TokenRequestModal onClose={() => setShowTokenRequest(false)} />}
    </form>
  )
}

export default ProfessionalRegistrationForm