import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-serif italic font-light mb-4">Tabacaria</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Produtos premium de tabacaria com tradição e qualidade desde 1985.
            </p>
          </div>

          {/* Links */}
          <div>
            <h5 className="text-sm uppercase tracking-wider font-medium mb-4">Navegação</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#inicio" className="hover:text-foreground transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-foreground transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-foreground transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm uppercase tracking-wider font-medium mb-4">Contato</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@tabacaria.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Rua dos Charutos, 123
                  <br />
                  São Paulo - SP
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="text-sm uppercase tracking-wider font-medium mb-4">Redes Sociais</h5>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tabacaria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
