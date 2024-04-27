import { createContext } from 'react'

type RegistrationContextType = {
  firstName: string,
  setFirstName: (firstName: string) => void,
  lastName: string,
  setLastName: (lastName: string) => void,
  date: Date,
  setDate: (date: Date) => void,
  location: string,
  setLocation: (location: string) => void,
  description: string,
  setDescription: (description: string) => void,
  selectedInterests: Array<string>,
  setSelectedInterests: (interests: Array<string>) => void
}

export const RegistrationContext = createContext<RegistrationContextType>({} as RegistrationContextType)