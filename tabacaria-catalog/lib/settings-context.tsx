"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface WhatsAppNumber {
  id: string
  number: string
  location: string
  isDefault: boolean
}

interface SettingsContextType {
  whatsappNumbers: WhatsAppNumber[]
  addWhatsAppNumber: (number: Omit<WhatsAppNumber, "id">) => void
  updateWhatsAppNumber: (id: string, data: Partial<WhatsAppNumber>) => void
  deleteWhatsAppNumber: (id: string) => void
  getDefaultNumber: () => WhatsAppNumber | undefined
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const DEFAULT_NUMBERS: WhatsAppNumber[] = [
  {
    id: "1",
    number: "5511999999999",
    location: "Principal",
    isDefault: true,
  },
]

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [whatsappNumbers, setWhatsappNumbers] = useState<WhatsAppNumber[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("pnm_whatsapp_numbers")
    if (stored) {
      setWhatsappNumbers(JSON.parse(stored))
    } else {
      setWhatsappNumbers(DEFAULT_NUMBERS)
      localStorage.setItem("pnm_whatsapp_numbers", JSON.stringify(DEFAULT_NUMBERS))
    }
  }, [])

  useEffect(() => {
    if (whatsappNumbers.length > 0) {
      localStorage.setItem("pnm_whatsapp_numbers", JSON.stringify(whatsappNumbers))
    }
  }, [whatsappNumbers])

  const addWhatsAppNumber = (data: Omit<WhatsAppNumber, "id">) => {
    const newNumber: WhatsAppNumber = {
      ...data,
      id: Date.now().toString(),
    }

    setWhatsappNumbers((current) => {
      if (newNumber.isDefault) {
        return [...current.map((n) => ({ ...n, isDefault: false })), newNumber]
      }
      return [...current, newNumber]
    })
  }

  const updateWhatsAppNumber = (id: string, data: Partial<WhatsAppNumber>) => {
    setWhatsappNumbers((current) =>
      current.map((number) => {
        if (number.id === id) {
          if (data.isDefault) {
            current.forEach((n) => {
              if (n.id !== id) n.isDefault = false
            })
          }
          return { ...number, ...data }
        }
        return number
      }),
    )
  }

  const deleteWhatsAppNumber = (id: string) => {
    setWhatsappNumbers((current) => {
      const filtered = current.filter((n) => n.id !== id)
      if (filtered.length > 0 && !filtered.some((n) => n.isDefault)) {
        filtered[0].isDefault = true
      }
      return filtered
    })
  }

  const getDefaultNumber = () => {
    return whatsappNumbers.find((n) => n.isDefault) || whatsappNumbers[0]
  }

  return (
    <SettingsContext.Provider
      value={{
        whatsappNumbers,
        addWhatsAppNumber,
        updateWhatsAppNumber,
        deleteWhatsAppNumber,
        getDefaultNumber,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return context
}
