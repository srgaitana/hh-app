'use client'

import { useState, useEffect } from 'react'
import { Search, DollarSign, Calendar, User } from 'lucide-react'
import ProfessionalCataloguePopUp from './ProfessionalCataloguePopUp'
import { HealthcareProfessional, User as HealthcareUser, Specialty } from '@/lib/types'

interface ProfessionalCatalogProps {
  isProfessional: boolean
}

interface ProfessionalWithDetails {
  professional: HealthcareProfessional;
  user: HealthcareUser;
  specialty: Specialty;
}

export default function ProfessionalCatalog({ isProfessional }: ProfessionalCatalogProps) {
  const [professionals, setProfessionals] = useState<ProfessionalWithDetails[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch('/api/professionals')
        if (!response.ok) {
          throw new Error('Failed to fetch professionals')
        }
        const data = await response.json()
        if (data.success) {
          setProfessionals(data.data)
        } else {
          throw new Error(data.message || 'Unknown error occurred')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    // Mock data for testing
    const mockData = [
      {
        professional: { ProfessionalID: 1, ConsultationFee: 200000, ProfessionalStatus: 'Available' as 'Available', UserID: 1, SpecialtyID: 1, CreatedAtProfessional: new Date(), UpdatedAtProfessional: new Date() },
        user: { UserID: 1, Email: 'john.doe@example.com', PasswordHash: '', Gender: 'male' as 'male', DateOfBirth: new Date(), CreatedAtUser: new Date(), UpdatedAtUser: new Date(), FirstName: 'John', LastName: 'Doe', Role: 'Healthcare Professional' as 'Healthcare Professional', UserStatus: 'Active' as 'Active' },
        specialty: { SpecialtyID: 1, SpecialtyName: 'Cardiology' }
      },
      {
        professional: { ProfessionalID: 2, ConsultationFee: 150000, ProfessionalStatus: 'Unavailable' as 'Unavailable', UserID: 2, SpecialtyID: 2, CreatedAtProfessional: new Date(), UpdatedAtProfessional: new Date() },
        user: { UserID: 2, Email: 'jane.smith@example.com', PasswordHash: '', Gender: 'female' as 'female', DateOfBirth: new Date(), CreatedAtUser: new Date(), UpdatedAtUser: new Date(), FirstName: 'Jane', LastName: 'Smith', Role: 'Healthcare Professional' as 'Healthcare Professional', UserStatus: 'Active' as 'Active' },
        specialty: { SpecialtyID: 2, SpecialtyName: 'Dermatology' }
      }
    ]

    setProfessionals(mockData)
    setIsLoading(false)

    // Uncomment the line below to use the actual fetch
    // fetchProfessionals()
  }, [])

  const filteredProfessionals = professionals.filter(({ user, specialty }) => 
    `${user.FirstName} ${user.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (specialty?.SpecialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  )

  const themeColor = isProfessional ? 'green' : 'blue'

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${themeColor === 'green' ? 'border-green-500' : 'border-blue-500'} mx-auto`}></div>
        <p className="mt-2 text-sm text-gray-600">Cargando profesionales...</p>
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className={`text-xl font-bold mb-4 ${isProfessional ? 'text-green-600' : 'text-blue-600'}`}>
          {isProfessional ? 'Profesionales similares' : 'Profesionales disponibles'}
        </h2>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad"
            className={`w-full p-2 pr-8 text-sm text-gray-900 border rounded-md focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out ${
              themeColor === 'green' ? 'focus:ring-green-500' : 'focus:ring-blue-500'
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeColor === 'green' ? 'text-green-500' : 'text-blue-500'}`} />
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredProfessionals.map(({ professional, user, specialty }) => (
            <div key={professional.ProfessionalID} className={`p-3 rounded-md shadow-sm border-l-4 ${themeColor === 'green' ? 'border-green-500' : 'border-blue-500'}`}>
              <h3 className="font-semibold">{`${user.FirstName} ${user.LastName}`}</h3>
              {specialty && (
                <p className="text-sm text-gray-600">{specialty.SpecialtyName}</p>
              )}
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                  {professional.ConsultationFee?.toLocaleString() ?? "200.000"}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    professional.ProfessionalStatus === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {professional.ProfessionalStatus === 'Available' ? 'Disponible' : 'No disponible'}
                  </span>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    disabled={professional.ProfessionalStatus !== 'Available'}
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm border rounded-md transition-colors
                      ${professional.ProfessionalStatus !== 'Available' 
                        ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-500' 
                        : themeColor === 'green'
                          ? 'bg-green-50 border-green-500 text-green-600 hover:bg-green-100'
                          : 'bg-blue-50 border-blue-500 text-blue-600 hover:bg-blue-100'
                      }`}
                  >
                    {themeColor === 'green' ? (
                      <>
                        <User className="w-4 h-4" />
                        Ver perfil
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        Agendar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProfessionals.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No se encontraron profesionales que coincidan con tu búsqueda.</p>
          )}
        </div>
      </div>

      <ProfessionalCataloguePopUp
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        themeColor={themeColor}
      />
    </>
  )
}