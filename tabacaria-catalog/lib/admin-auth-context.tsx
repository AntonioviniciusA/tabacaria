"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

function setCookie(name: string, value: string, hours: number) {
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict;Secure`
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// Hash simples usando Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Credenciais padrão: admin / admin123
  const DEFAULT_USERNAME = "admin"
  const DEFAULT_PASSWORD_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9" // hash de "admin123"

  useEffect(() => {
    const authToken = getCookie("admin_auth_token")
    const authExpiry = getCookie("admin_auth_expiry")

    if (authToken && authExpiry) {
      const expiryTime = Number.parseInt(authExpiry, 10)
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true)
      } else {
        deleteCookie("admin_auth_token")
        deleteCookie("admin_auth_expiry")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const passwordHash = await hashPassword(password)
      const storedPasswordHash = localStorage.getItem("admin_password_hash") || DEFAULT_PASSWORD_HASH
      const storedUsername = localStorage.getItem("admin_username") || DEFAULT_USERNAME

      if (username === storedUsername && passwordHash === storedPasswordHash) {
        const token = await hashPassword(`${username}-${Date.now()}`)
        const expiry = Date.now() + 8 * 60 * 60 * 1000 // 8 horas

        setCookie("admin_auth_token", token, 8)
        setCookie("admin_auth_expiry", expiry.toString(), 8)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return false
    }
  }

  const logout = () => {
    deleteCookie("admin_auth_token")
    deleteCookie("admin_auth_expiry")
    setIsAuthenticated(false)
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const currentHash = await hashPassword(currentPassword)
      const storedHash = localStorage.getItem("admin_password_hash") || DEFAULT_PASSWORD_HASH

      if (currentHash === storedHash) {
        const newHash = await hashPassword(newPassword)
        localStorage.setItem("admin_password_hash", newHash)
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao alterar senha:", error)
      return false
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
