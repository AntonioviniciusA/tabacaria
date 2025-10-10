"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

export function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDenied, setShowDenied] = useState(false)

  useEffect(() => {
    // Verifica se o usuário já aceitou os termos
    const hasVerified = localStorage.getItem("age-verified")
    if (!hasVerified) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("age-verified", "true")
    setIsOpen(false)
  }

  const handleDeny = () => {
    setShowDenied(true)
  }

  if (showDenied) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
        <div className="bg-background border-2 border-primary rounded-lg p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Acesso Negado</h2>
          <p className="text-muted-foreground mb-6">Você precisa ser maior de 18 anos para acessar este site.</p>
          <Button
            onClick={() => (window.location.href = "https://www.google.com")}
            variant="outline"
            className="w-full"
          >
            Sair do Site
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md border-2 border-primary"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Verificação de Idade</DialogTitle>
          <DialogDescription className="text-center pt-4">
            Este site contém produtos relacionados ao tabaco e é destinado apenas para maiores de 18 anos.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="text-sm text-center font-medium">
              Você confirma que tem 18 anos ou mais e aceita os termos de uso?
            </p>
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Ao continuar, você declara ser maior de idade conforme a legislação vigente e aceita nossa política de
              uso.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button onClick={handleAccept} className="w-full bg-primary hover:bg-primary/90" size="lg">
            Sim, tenho 18+ anos
          </Button>
          <Button onClick={handleDeny} variant="outline" className="w-full bg-transparent" size="lg">
            Não, sou menor de idade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
