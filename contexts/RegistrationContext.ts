import { User } from 'firebase/auth'
import { createContext } from 'react'

export type RegistrationContextType = {
  user: User | null,
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
  fromGoogle: boolean,
  setFromGoogle: (value: boolean) => void
}

export const RegistrationContext = createContext<RegistrationContextType>({} as RegistrationContextType)