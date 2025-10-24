import { Instagram, Facebook, MessageCircle, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-serif italic font-light mb-4">Cerrado Smoke Shop</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Produtos premium de tabacaria com atendimento presencial e online. Visite nossa loja ou peça pelo
              WhatsApp.
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
                  Como Funciona
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm uppercase tracking-wider font-medium mb-4">Contato</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Endereço da loja
                  <br />
                  Cidade - Estado
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="text-xs mt-2">
                <strong>Horário de Funcionamento:</strong>
                <br />
                Segunda a Sábado: 9h às 22h
                <br />
                Domingo: 10h às 20h
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h5 className="text-sm uppercase tracking-wider font-medium mb-4">Pagamento</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Dinheiro</li>
              <li>PIX</li>
              <li>Cartão de Crédito/Débito</li>
              <li className="text-xs mt-2 text-accent">Pagamento na loja ou na entrega</li>
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
          <p>&copy; {new Date().getFullYear()} Cerrado Smoke Shop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
