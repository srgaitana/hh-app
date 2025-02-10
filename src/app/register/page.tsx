'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ProfessionalRegistrationForm from '@/components/forms/ProfessionalRegistrationForm';
import PatientRegistrationForm from '@/components/forms/PatientRegistrationForm';

interface RegistrationWrapperProps {
  isProfessional: boolean;
}

export default function RegistrationWrapper({ isProfessional: initialIsProfessional }: RegistrationWrapperProps) {
  const [isProfessional, setIsProfessional] = useState(initialIsProfessional);

  const toggleRole = () => {
    setIsProfessional(prevState => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden lg:block">
        <Header isProfessional={isProfessional} onToggleProfessional={toggleRole} />
      </div>
      <div className="flex flex-col min-h-screen">
        {isProfessional ? (
          <ProfessionalRegistrationForm/>
        ) : ( 
          <PatientRegistrationForm/> 
        )}
      </div>
      <div className="hidden lg:block">
        <Footer isProfessional={isProfessional} />
      </div>
    </div>
  );
}
