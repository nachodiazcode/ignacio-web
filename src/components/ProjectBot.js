import { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import { email, services } from "../data/site"

const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "¡Hola! Soy el asistente interactivo de Ignacio Díaz. 👋",
  },
  {
    id: "welcome-2",
    sender: "bot",
    text: "¿Estás pensando en crear o renovar un sitio web? Te puedo orientar en 1 minuto sobre qué formato te conviene, plazos y cómo trabajamos.",
  },
]

const QUICK_QUESTIONS = [
  { id: "calc", label: "🧭 Calcular qué sitio me conviene", action: "start_quiz" },
  { id: "prices", label: "💰 ¿Cómo son los precios y pagos?", query: "precios" },
  { id: "domain", label: "🔑 ¿El dominio queda a mi nombre?", query: "dominio" },
  { id: "steps", label: "📋 ¿Cómo es el proceso de trabajo?", query: "proceso" },
  { id: "ecommerce", label: "🛒 ¿Haces tiendas online?", query: "tiendas" },
  { id: "contact_direct", label: "✉️ Hablar directo con Ignacio", action: "contact_direct" },
]

const QUIZ_QUESTIONS = [
  {
    step: 1,
    question: "¿Qué objetivo principal buscas para este proyecto?",
    options: [
      {
        label: "Lanzar una oferta, local o evento concreto",
        serviceId: "landing",
        hint: "Ideal para una sola página directa al grano",
      },
      {
        label: "Presentar mi negocio, colegio o estudio profesionalmente",
        serviceId: "presentacion",
        hint: "Sitio multi-página para explicar quién eres y captar consultas",
      },
      {
        label: "Un sitio donde yo pueda editar textos y fotos con frecuencia",
        serviceId: "editable",
        hint: "Con panel de administración simple e intuitivo",
      },
      {
        label: "Rediseñar o acelerar un sitio que ya tengo",
        serviceId: "presentacion",
        hint: "Mejorar cómo carga, cómo se ve en el celular y en Google",
      },
    ],
  },
  {
    step: 2,
    question: "¿En qué estado tienes el contenido (textos y fotos)?",
    options: [
      { label: "Tengo todo listo o casi listo", status: "ready" },
      { label: "Tengo un borrador, necesito ayuda para pulirlo", status: "draft" },
      { label: "Parto de cero, necesito apoyo completo con los textos", status: "none" },
    ],
  },
  {
    step: 3,
    question: "¿En qué plazo te gustaría tener el sitio publicado?",
    options: [
      { label: "Lo antes posible (2 a 3 semanas)", timePref: "fast" },
      { label: "En 1 o 2 meses", timePref: "normal" },
      { label: "Sin apuro, planificando con tiempo", timePref: "calm" },
    ],
  },
]

export function ProjectBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [quizState, setQuizState] = useState(null) // null or { step, answers }
  const messagesEndRef = useRef(null)
  const chatInputRef = useRef(null)

  // Floating tooltip appears once after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping, isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const addBotMessage = (text, customPayload = null) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text,
          payload: customPayload,
        },
      ])
    }, 550)
  }

  const handleStartQuiz = () => {
    setQuizState({ step: 1, answers: {} })
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: "Quiero calcular qué sitio me conviene." },
    ])
    addBotMessage(
      "¡Excelente! Te haré 3 preguntas rápidas. Primera:",
      { type: "quiz_step", stepData: QUIZ_QUESTIONS[0] }
    )
  }

  const handleQuizAnswer = (option) => {
    if (!quizState) return
    const currentStep = quizState.step
    const nextAnswers = { ...quizState.answers, [`step${currentStep}`]: option }

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: option.label },
    ])

    if (currentStep < 3) {
      const nextStep = currentStep + 1
      setQuizState({ step: nextStep, answers: nextAnswers })
      addBotMessage(
        nextStep === 2
          ? "Segunda pregunta:"
          : "Última pregunta para afinar la estimación:",
        { type: "quiz_step", stepData: QUIZ_QUESTIONS[nextStep - 1] }
      )
    } else {
      // Calculate outcome
      setQuizState(null)
      const serviceId = nextAnswers.step1?.serviceId || "presentacion"
      const matchedService = services.find((s) => s.id === serviceId) || services[1]
      const textStatus = nextAnswers.step2?.status
      const timePref = nextAnswers.step3?.timePref

      let timeNote = matchedService.time
      if (textStatus === "none") {
        timeNote += " (+1 semana para armado de textos)."
      } else if (timePref === "fast") {
        timeNote += " (entrega prioritaria)."
      }

      addBotMessage(
        `¡Listo! Según tus respuestas, el formato ideal para tu caso es: **${matchedService.name}**.`,
        {
          type: "quiz_result",
          service: matchedService,
          answers: nextAnswers,
          estimatedTime: timeNote,
        }
      )
    }
  }

  const handleSmartQuery = (queryText) => {
    const q = queryText.toLowerCase()
    let reply = ""
    let payload = null

    if (q.includes("precio") || q.includes("cuanto") || q.includes("cuánto") || q.includes("pago") || q.includes("cobras") || q.includes("cotiz")) {
      reply =
        "El precio se define según el alcance exacto de páginas y funcionalidades. No tengo un precio genérico de vidriera: el número final, plazo y entregables quedan por escrito en una propuesta formal antes de empezar, sin costos ocultos. ¿Te gustaría armar una propuesta para tu caso?"
      payload = { type: "action_cta", ctaText: "Pedir propuesta por escrito", href: "/contacto" }
    } else if (q.includes("dominio") || q.includes("hosting") || q.includes("nombre") || q.includes("dueño") || q.includes("propiedad")) {
      reply =
        "Sí, 100%. El dominio, el hosting y todas las cuentas se crean a tu nombre. Ignacio no retiene contraseñas ni te amarra. Si más adelante quieres trabajar con otra persona, te llevas el sitio completo sin trabas."
    } else if (q.includes("proceso") || q.includes("paso") || q.includes("como trabaja") || q.includes("cómo trabaja")) {
      reply =
        "El proceso consta de 5 pasos claros:\n1. Me escribes con lo que necesitas.\n2. Te entrego propuesta por escrito (alcance, plazo y precio).\n3. Diseñamos la página principal primero para afinar la voz.\n4. Construcción y revisión técnica.\n5. Publicación oficial a tu nombre."
    } else if (q.includes("tienda") || q.includes("ecommerce") || q.includes("e-commerce") || q.includes("carrito") || q.includes("pagos")) {
      reply =
        "Una vitrina corta o catálogo de productos se puede implementar sin problema. Una tienda compleja con inventario dinámico masivo, pasarelas complejas y despachos automatizados es otro tipo de proyecto y se evalúa por separado. Ignacio siempre te dirá de frente si conviene o si es mejor otra alternativa."
    } else if (q.includes("existente") || q.includes("rediseño") || q.includes("arreglar") || q.includes("sitio actual")) {
      reply =
        "Sí, Ignacio trabaja sobre sitios existentes cuando conviene optimizarlos. Si está más sano, rápido y económico rehacerlo con tecnologías modernas (para que cargue al instante y rinda en Google), también te lo dirá con total honestidad."
    } else if (q.includes("tiempo") || q.includes("plazo") || q.includes("demora") || q.includes("cuanto tarda")) {
      reply =
        "Como referencia: una Landing toma ~2 semanas; un Sitio de Presentación institucional toma entre 3 y 5 semanas; y un Sitio Editable entre 5 y 8 semanas. El plazo exacto queda sellado en la propuesta."
    } else if (q.includes("hola") || q.includes("buenas") || q.includes("saludos")) {
      reply =
        "¡Hola! Qué gusto saludarte. ¿En qué te puedo ayudar hoy? Puedes calcular qué sitio te conviene o hacerme cualquier consulta."
    } else {
      reply =
        "Entiendo tu consulta. Como cada proyecto tiene particularidades únicas, lo mejor es que conversemos directamente con Ignacio para darte una respuesta certera y sin compromiso."
      payload = { type: "action_cta", ctaText: "Escribir directamente a Ignacio", href: "/contacto" }
    }

    addBotMessage(reply, payload)
  }

  const handleSendText = (e) => {
    e.preventDefault()
    const cleanText = inputValue.trim()
    if (!cleanText) return

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: cleanText },
    ])
    setInputValue("")
    handleSmartQuery(cleanText)
  }

  const handleQuickQuestion = (item) => {
    if (item.action === "start_quiz") {
      handleStartQuiz()
    } else if (item.action === "contact_direct") {
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, sender: "user", text: item.label },
      ])
      addBotMessage(
        "Puedes escribirle directamente a Ignacio a su correo o mediante el formulario de contacto. Responde siempre en menos de un día hábil.",
        {
          type: "action_cta",
          ctaText: `Escribir a ${email}`,
          href: `mailto:${email}?subject=Consulta%20desde%20sitio%20web`,
        }
      )
    } else if (item.query) {
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, sender: "user", text: item.label },
      ])
      handleSmartQuery(item.query)
    }
  }

  return (
    <aside className="project-bot-container" aria-label="Asistente interactivo del sitio">
      {/* Floating trigger button & preview tooltip */}
      <div className="bot-trigger-wrap">
        {showTooltip && !isOpen && (
          <div className="bot-tooltip animate-fade-in" role="status">
            <span>¿Pensando en un sitio web? <strong>Haz clic para orientarte</strong></span>
            <button
              type="button"
              className="bot-tooltip-close"
              aria-label="Cerrar sugerencia"
              onClick={() => setShowTooltip(false)}
            >
              ×
            </button>
          </div>
        )}

        <button
          type="button"
          className={`bot-trigger ${isOpen ? "is-open" : ""}`}
          onClick={() => {
            setIsOpen(!isOpen)
            setShowTooltip(false)
          }}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? "Cerrar asistente interactivo" : "Abrir asistente interactivo"}
        >
          <span className="bot-status-dot" aria-hidden="true" />
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
          <span className="bot-trigger-label">Pregúntame</span>
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className="bot-window animate-scale-up"
          role="dialog"
          aria-label="Ventana de conversación con el asistente"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bot-header">
            <div className="bot-avatar-badge">
              <span className="bot-avatar-mark">Id</span>
              <span className="bot-online-indicator" title="En línea" />
            </div>
            <div className="bot-header-info">
              <p className="bot-header-name">Ignacio Díaz · Asistente</p>
              <p className="bot-header-sub">Orientación de proyectos · Santiago, CL</p>
            </div>
            <button
              type="button"
              className="bot-header-close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div className="bot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`bot-msg-row is-${msg.sender}`}>
                {msg.sender === "bot" && (
                  <span className="bot-msg-avatar" aria-hidden="true">Id</span>
                )}
                <div className="bot-bubble">
                  <p className="bot-bubble-text">{msg.text}</p>

                  {/* Quiz Step interactive options */}
                  {msg.payload?.type === "quiz_step" && (
                    <div className="bot-quiz-options">
                      <p className="bot-quiz-prompt">{msg.payload.stepData.question}</p>
                      <div className="bot-options-grid">
                        {msg.payload.stepData.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            className="bot-option-btn"
                            onClick={() => handleQuizAnswer(opt)}
                          >
                            <span className="bot-opt-label">{opt.label}</span>
                            {opt.hint && <small className="bot-opt-hint">{opt.hint}</small>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiz Result summary card */}
                  {msg.payload?.type === "quiz_result" && (
                    <div className="bot-result-card">
                      <div className="bot-result-badge">Recomendación para ti</div>
                      <h4 className="bot-result-title">{msg.payload.service.name}</h4>
                      <p className="bot-result-desc">{msg.payload.service.summary}</p>
                      <div className="bot-result-details">
                        <div className="bot-detail-item">
                          <strong>Plazo estimado:</strong> {msg.payload.estimatedTime}
                        </div>
                        <div className="bot-detail-item">
                          <strong>Qué incluye:</strong>
                          <ul className="bot-result-list">
                            {msg.payload.service.includes.map((inc, idx) => (
                              <li key={idx}>✓ {inc}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bot-result-actions">
                        <Link
                          to={`/contacto?servicio=${msg.payload.service.id}`}
                          className="button bot-action-btn"
                          onClick={() => setIsOpen(false)}
                        >
                          Pedir propuesta con este plan →
                        </Link>
                        <a
                          href={`mailto:${email}?subject=Consulta%20por%20${encodeURIComponent(msg.payload.service.name)}&body=Hola%20Ignacio,%0A%0AEstuve%20calculando%20en%20tu%20sitio%20y%20me%20interesa%20el%20plan%20de%20${encodeURIComponent(msg.payload.service.name)}.%0A%0AAtentamente,`}
                          className="button ghost bot-action-btn"
                        >
                          Enviar por correo
                        </a>
                        <button
                          type="button"
                          className="bot-restart-btn"
                          onClick={handleStartQuiz}
                        >
                          ↺ Volver a calcular
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CTA Action button */}
                  {msg.payload?.type === "action_cta" && (
                    <div className="bot-cta-wrap">
                      {msg.payload.href.startsWith("http") || msg.payload.href.startsWith("mailto") ? (
                        <a href={msg.payload.href} className="button bot-action-btn">
                          {msg.payload.ctaText} →
                        </a>
                      ) : (
                        <Link
                          to={msg.payload.href}
                          className="button bot-action-btn"
                          onClick={() => setIsOpen(false)}
                        >
                          {msg.payload.ctaText} →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="bot-msg-row is-bot">
                <span className="bot-msg-avatar" aria-hidden="true">Id</span>
                <div className="bot-bubble is-typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="bot-quick-pills" aria-label="Preguntas rápidas">
            {QUICK_QUESTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="bot-pill"
                onClick={() => handleQuickQuestion(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form className="bot-input-form" onSubmit={handleSendText}>
            <input
              ref={chatInputRef}
              type="text"
              className="bot-input"
              placeholder="Escribe tu consulta o duda..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Mensaje para el asistente"
            />
            <button
              type="submit"
              className="bot-submit-btn"
              disabled={!inputValue.trim()}
              aria-label="Enviar mensaje"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </aside>
  )
}
