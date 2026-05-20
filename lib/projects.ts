export interface Project {
  id: string;
  category: "personal" | "professional";
  title: string;
  tagline: string;
  description: string;
  problem: string;
  process: string;
  solution: string;
  results: string;
  year: number;
  role: string;
  duration: string;
  stack: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  image: string;
  color: string;
  wip?: boolean;
  gallery?: string[];
  // Professional-only
  clientBio?: string;
  clientType?: string;
}

export const projects = [
  // ── Personal ──────────────────────────────────────────────────────────────
  {
    id: "ca-iaia",
    category: "personal" as const,
    title: "Ca' Iaia",
    tagline: "App de pedidos para llevar con backend sobre Google Sheets",
    description:
      "Web app fullstack para gestión de pedidos en restaurante de comida para llevar. Sin servidor propio — backend 100% sobre Google Sheets vía Apps Script.",
    problem:
      "Un restaurante familiar de comida para llevar necesitaba digitalizar sus pedidos sin inversión en servidores ni mantenimiento técnico. El sistema anterior era papel y WhatsApp — funcional para el volumen de entonces, pero imposible de escalar y sin visibilidad del estado de los pedidos en tiempo real.\n\nEl problema específico: en los picos de demanda (mediodía, fines de semana) los pedidos se solapaban, el stock no se actualizaba en tiempo real entre dispositivos y coordinar cocina y caja requería llamadas constantes.\n\nLa restricción principal era económica y técnica: cero infraestructura propia. Sin presupuesto para servidores, sin perfil técnico interno para mantenerlos.",
    process:
      "La restricción marcó toda la arquitectura: si el cliente ya usaba Google Sheets como sistema de registro, la decisión correcta era construir encima, no contra eso.\n\nApps Script como API REST fue la pieza central. No es la solución más elegante técnicamente — es la solución correcta para el contexto: gratuita, respaldada por Drive automáticamente y sin dependencias externas que el cliente no controla.\n\nEl mayor reto de diseño fue la sincronización multi-dispositivo sin WebSockets ni base de datos real. La solución fue polling cada 7 segundos: suficientemente rápido para parecer tiempo real, suficientemente lento para no saturar la cuota gratuita de Apps Script.\n\nLa arquitectura offline-first fue una decisión deliberada: el estado local nunca bloquea la UI. Si el servidor tarda, el usuario sigue interactuando. La sincronización llega cuando puede.",
    solution:
      "SPA en React + Vite sin router — el flujo es lineal y contextual, no multipágina. CSS Modules con design system propio: tokens, tipografía Fraunces (display) + Plus Jakarta Sans (cuerpo), sin librerías UI externas.\n\nCarta con categorías, gestión de stock en tiempo real y carrito persistente con validación server-side antes de confirmar — evita que dos usuarios confirmen el mismo último plato. Selector de franja horaria con ocupación sincronizada entre dispositivos. Confirmación con resumen y botón directo a WhatsApp.\n\nPanel de administración con acceso protegido y bloqueo tras 4 intentos fallidos. Vista de pedidos agrupados por franja en acordeones animados, cambio de estado (pendiente → listo → entregado), gestión de stock editable y control de aforo por franja. Reset de día limpia el Sheet y reinicia estado.\n\nEl bug más interesante resuelto: Google Sheets convierte internamente strings de fecha/hora a objetos Date aplicando la timezone del spreadsheet. Sin normalización custom con Utilities.formatDate, los pedidos de las 14:00 aparecían como 12:00 en servidores con UTC.",
    results:
      "Ca' Iaia es el tipo de proyecto que no aparece en los portfolios técnicos habituales porque la solución «correcta» habría sido sobreingenierizar: un backend en Node, una base de datos, un sistema de autenticación propio. Nada de eso era necesario aquí.\n\nLa restricción de cero infraestructura forzó decisiones más interesantes que las que habría tomado con libertad total. Aprendí más sobre sincronización de estado y resolución de race conditions con polling que con cualquier proyecto con WebSockets.\n\nEl cliente tiene ahora un sistema que opera sin soporte técnico: los pedidos llegan a Google Sheets, el equipo los gestiona desde el panel en cocina, y si algo falla siempre hay un fallback en los datos del propio Sheet.\n\nQué haría diferente: migraría el backend a Supabase para tener consultas reales en lugar de cargar el Sheet completo en cada poll. Y añadiría notificaciones push para los cambios de estado de pedido — el paso de «listo» a «entregado» todavía requiere que el equipo consulte el panel activamente.",
    year: 2026,
    role: "Diseño UI/UX + Desarrollo Fullstack",
    duration: "6 semanas",
    stack: ["React", "Vite", "CSS Modules", "Google Sheets", "Apps Script"],
    demoUrl: "https://casa-chelo.vercel.app/",
    githubUrl: null,
    featured: true,
    image: "/projects/ca-iaia.PNG",
    color: "#e07854",
    gallery: [
      "/projects/ca-iaia1.PNG",
      "/projects/ca-iaia2.PNG",
      "/projects/ca-iaia3.PNG",
      "/projects/ca-iaia4.PNG",
      "/projects/ca-iaia5.PNG",
    ],
  },
  {
    id: "gastrofit",
    category: "personal" as const,
    title: "GastroFit",
    tagline: "Planificación nutricional semanal sin fricción",
    description:
      "App PWA que resuelve el caos de planificar comidas semanales — drag & drop, resúmenes nutricionales y sincronización en la nube.",
    problem:
      "Llevaba meses entrenando con un objetivo claro: ganar músculo controlando la alimentación. El problema no era la motivación ni el conocimiento — era la logística diaria de organizarme las comidas.\n\nProbé hojas de cálculo. Las abandoné a los tres días. Probé apps existentes: demasiado complejas, llenas de funciones que no necesitaba, o con UX tan mala que añadían fricción en lugar de quitarla. Ninguna respondía a una pregunta simple: ¿qué voy a comer hoy y cómo cuadran mis macros?\n\nAsí que decidí construirla yo mismo. No como ejercicio técnico — como herramienta real que iba a usar cada día.",
    process:
      "Antes de abrir Figma me pregunté cómo usaría la app en el día a día. La respuesta fue reveladora: no la abriría con tiempo y tranquilidad — la abriría en la cocina, con las manos ocupadas, en 30 segundos, para decidir qué comer. Eso cambió todo. El diseño tenía que ser rápido de usar, no solo bonito de ver.\n\nDrag & drop como mecanismo central. La primera versión tenía botones para añadir comidas a cada slot del día. Funcionaba, pero se sentía mecánico y lento. Al cambiar a drag & drop el flujo se volvió mucho más natural — arrastrar una comida al hueco del mediodía se parece más a cómo uno piensa realmente en su semana. La interacción física refuerza la sensación de control.\n\nCalorías y macros visibles siempre, no escondidos detrás de un menú. Otras apps entierran los macros en una pantalla secundaria. En GastroFit los totales del día están siempre visibles mientras organizas las comidas. El feedback es inmediato: ves cómo cambian los números en tiempo real al mover platos.\n\nPWA para eliminar la barrera de instalación. Cualquier persona puede añadirla a la pantalla de inicio desde el navegador. Paleta orientada a salud, no a fitness agresivo — colores que transmiten energía limpia sin intimidar.\n\nLo que rechacé: añadir un módulo de recetas completas con ingredientes y pasos. Lo descarté porque añadía complejidad sin resolver el problema central — planificar, no cocinar.",
    solution:
      "Angular como base. La arquitectura de componentes encajaba bien con la naturaleza modular de la app: cada slot de comida, cada tarjeta de plato, cada barra de macros es un componente independiente.\n\nFirebase Realtime Database para sincronización sin fricción — sin botón de guardar explícito. Los cambios se reflejan instantáneamente y la app funciona igual en móvil y escritorio con la misma cuenta.\n\nEl reto técnico más interesante: el cálculo de macros en tiempo real. Implementar que los totales se actualicen mientras arrastras platos requirió una gestión de estado cuidadosa. Cualquier operación de drag & drop tenía que disparar el recálculo sin causar renders innecesarios. Lo resolví con un servicio de estado centralizado al que los componentes se suscriben — patrón que luego apliqué en proyectos más complejos.",
    results:
      "Publiqué GastroFit en LinkedIn sin expectativas — lo había construido para mí. La respuesta me sorprendió: varios usuarios lo descargaron y me escribieron contando que por fin tenían una herramienta que encajaba en su rutina sin añadir más caos.\n\nEse feedback confirmó algo que ya intuía: el problema que yo tenía no era mío — era de cualquier persona que intenta comer bien sin convertirlo en un trabajo a tiempo completo.\n\nLo que aprendí: el mejor indicador de que una app tiene buena UX es que el usuario no la «usa» — la vive. GastroFit funciona cuando alguien la abre, arrastra dos cosas, cierra y ya tiene su día organizado. Si alguien tiene que pensar cómo usarla, he fallado.\n\nQué haría diferente: añadiría una base de datos de alimentos con búsqueda rápida para no introducir macros manualmente. También exploraría integración con APIs como Open Food Facts. Y construiría la versión React/Next.js con un design system más elaborado — el foundation de Angular + Material me limitó estéticamente más de lo esperado.",
    year: 2025,
    role: "Diseño UI/UX + Desarrollo Frontend completo",
    duration: "3 meses",
    stack: ["Angular", "Firebase", "Material", "PWA", "Vercel"],
    demoUrl: "https://gastro-fit-lyx2.vercel.app",
    githubUrl: null,
    featured: false,
    image: "/projects/gastrofit.png",
    color: "#c8f542",
    gallery: [
      "/projects/gastrofit1.PNG",
      "/projects/gastrofit2.PNG",
      "/projects/gastrofit3.PNG",
      "/projects/gastrofit4.PNG",
      "/projects/gastrofit5.PNG",
      "/projects/gastrofit6.PNG",
      "/projects/gastrofit7.PNG",
    ],
  },
  {
    id: "vitalia-pro",
    category: "personal" as const,
    title: "Vitalia Pro",
    tagline: "SaaS de gestión clínica para fisioterapeutas y centros de salud",
    description:
      "Plataforma SaaS completa que permite a fisioterapeutas y clínicas gestionar pacientes, agenda, facturación y métricas de rendimiento desde una sola interfaz.",
    problem:
      "Los fisioterapeutas y centros de salud gestionan su negocio entre herramientas inconexas: una app para citas, otra para facturación, hojas de cálculo para métricas. El resultado es fricción operativa, datos desconectados y tiempo perdido en gestión que debería ir a los pacientes.\n\nEl mercado tiene soluciones clínicas, pero o son demasiado genéricas, o tienen UX de software médico de los 2000. Ninguna combina potencia funcional con una interfaz que el profesional quiera usar cada día.\n\nVitalia Pro nace de esa brecha: una herramienta construida con la misma atención al detalle que un producto de consumo, pero con la profundidad funcional que una clínica real necesita.",
    process:
      "La arquitectura parte de un principio: el dashboard es el núcleo. Todo lo demás — pacientes, citas, analíticas, facturación — tiene que alimentar esa vista central sin fricciones.\n\nDecisión de diseño clave: design tokens completos en CSS con soporte dark mode nativo via oklch. No variables hard-coded en componentes — todo consume el sistema. Eso hace que el tema claro/oscuro y los cambios de marca sean triviales.\n\nPara los gráficos, rechacé librerías pesadas de dataviz. Recharts sobre React 19 permite componentes reutilizables con formateo dinámico — la misma lógica sirve para la curva de ingresos, el crecimiento de pacientes y el desglose por servicio.\n\nEl sistema i18n lo construí con un hook propio useT en lugar de una librería externa. El overhead de i18n-next para un producto con dos idiomas no se justifica. El hook propio es más rápido, más predecible y no añade bundle.",
    solution:
      "Next.js 16 con App Router y layouts anidados que separan la landing pública del dashboard autenticado — arquitecturas completamente distintas bajo el mismo proyecto.\n\nDashboard con KPIs en tiempo real: ingresos mensuales, pacientes activos, citas del día y tasa de adherencia. Gestión de pacientes con ficha individual, historial clínico, puntuación de recuperación y progreso del plan visualizado con barras de color.\n\nMódulo de analíticas con cuatro gráficos interactivos (área, línea, barras, donut), filtro por rango de fechas y exportación de datos. Facturación integrada con tres tiers de suscripción: Starter (€79/mes), Professional (€189/mes) y Enterprise (€449/mes) con toggle mensual/anual.\n\nAnimaciones escalonadas con Framer Motion usando whileInView — los elementos aparecen progresivamente al hacer scroll sin impacto en rendimiento. Estado global con Zustand: sin prop-drilling, sin Redux overhead.",
    results:
      "Vitalia Pro demuestra que el software clínico no tiene que parecer software clínico. La misma atención al detalle que se aplica a un producto de consumo puede — y debe — aplicarse a herramientas profesionales.\n\nEl pricing interactivo con toggle mensual/anual, las animaciones de aparición y el hero de la landing generan una primera impresión que ningún competidor del sector tiene. El producto vende antes de que el usuario abra el dashboard.\n\nTécnicamente, el sistema de design tokens y la arquitectura de componentes permiten escalar sin deuda técnica. Añadir un nuevo módulo (equipos, telemedicina, historial compartido) no requiere tocar el sistema de diseño — solo consumirlo.\n\nQué haría diferente: implementaría tests de integración desde el día uno. El crecimiento del módulo de analíticas sin cobertura de tests ha creado zonas que requieren más cuidado del que deberían.",
    year: 2026,
    role: "Diseño UI/UX + Desarrollo Frontend completo",
    duration: "En progreso",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Recharts", "Zustand", "Framer Motion"],
    demoUrl: "https://vitalia-pro.vercel.app",
    githubUrl: null,
    featured: false,
    image: "/projects/vitalia-pro.PNG",
    color: "#00c9a7",
    gallery: [
      "/projects/vitalia-pro1.PNG",
      "/projects/vitalia-pro2.PNG",
      "/projects/vitalia-pro3.PNG",
      "/projects/vitalia-pro4.PNG",
      "/projects/vitalia-pro5.PNG",
    ],
  },
  {
    id: "psicoapp",
    category: "personal" as const,
    title: "PsicoApp",
    tagline: "Plataforma de bienestar mental validada con profesionales",
    description:
      "Herramienta web de salud mental y emocional diseñada desde cero con proceso UX validado con psicólogos — donde la interfaz es parte de la terapia.",
    problem:
      "Cuando llegó el momento de elegir proyecto para el TFC sabía una cosa: no quería hacer algo que existiera solo en un servidor de evaluación y muriera ahí. Quería construir algo que pudiera tener impacto real.\n\nLa salud mental había estado muy presente en mi entorno cercano. Al investigar las herramientas digitales disponibles encontré una brecha evidente: las apps de salud mental existentes o son demasiado clínicas — frías, intimidantes, diseñadas para profesionales — o son demasiado superficiales, llenas de meditaciones genéricas que no acompañan de verdad.\n\nLa pregunta que me hice fue: ¿cómo debería sentirse una app de salud mental si la diseñara alguien que de verdad piensa en el usuario?",
    process:
      "Antes de diseñar ninguna pantalla contacté con un psicólogo de Valencia con el que trabajé mano a mano para entender cómo funciona realmente el acompañamiento psicológico. Sus aportaciones cambiaron decisiones que yo creía correctas: el lenguaje importa más que el diseño, la progresión tiene que ser gradual, y el color tiene un impacto directo en el estado emocional.\n\nEl momento que más marcó el proyecto fue la conversación con Marian Rojas Estapé, psiquiatra y una de las voces más respetadas en divulgación de salud mental en España. Le presenté la app, le expliqué el enfoque y no solo me dio su visto bueno — me autorizó a incorporar sus vídeos de divulgación en la plataforma. Que una profesional con criterio decidiera que el proyecto merecía su respaldo fue la validación más importante que podría haber recibido.\n\nLa dirección estética fue clara: la app tiene que sentirse como hablar con alguien de confianza, no como entrar en una consulta. Tipografía humanista, paleta basada en tierra y calma, espaciado generoso como señal de que hay tiempo y no hay prisa.\n\nOnboarding gradual sin formularios: el primer contacto del usuario no puede ser un formulario de datos. Diseñé un onboarding conversacional de tres pasos donde el usuario elige su situación entre opciones visuales — sin texto libre, sin esfuerzo cognitivo.\n\nEl módulo de registro emocional fue el más revisado con el psicólogo. La versión final usa una escala visual — no palabras como «mal» o «muy mal» — y siempre ofrece una acción concreta después del registro, nunca deja al usuario solo con su dato.",
    solution:
      "La decisión técnica más ambiciosa: construir mi propio framework CSS. En lugar de usar Bootstrap o cualquier librería externa, construí un sistema completo en SASS con variables globales para la paleta entera, escala tipográfica generada programáticamente y sistema de espaciado basado en una unidad base multiplicada por escala.\n\nEl resultado fue un sistema donde cambiar el color principal de la app requería modificar una sola variable. Ese nivel de consistencia y mantenibilidad en un TFC era algo que muy pocos entregaban. Cuando más tarde trabajé con design tokens en Figma, la conexión mental fue inmediata porque ya había construido el concepto desde cero.\n\nAngular + Firebase gestionó tanto la autenticación como el almacenamiento de los registros emocionales, con reglas de seguridad que garantizan que nadie puede acceder a los datos de otra persona.\n\nEl reto técnico más interesante: conseguir que los bucles SASS generaran variantes de color para todos los estados de los componentes sin duplicar código. La solución fue un mixin paramétrico que recibía el color base y generaba todos los estados derivados automáticamente.",
    results:
      "PsicoApp demostró que un TFC puede ser un proyecto real, no solo un ejercicio académico.\n\nEl hecho de que Marian Rojas Estapé lo validara y autorizara el uso de su contenido no fue solo un logro personal — fue una señal de que el enfoque era correcto. Una profesional con criterio, que recibe propuestas constantemente, decidió que este proyecto merecía su respaldo.\n\nLo que aprendí: los mejores proyectos de diseño nacen de escuchar a los expertos del dominio antes de diseñar. El psicólogo con el que trabajé cambió decisiones que yo creía correctas — y tenía razón. El diseño sin conocimiento del dominio es decoración.\n\nQué haría diferente: hoy construiría PsicoApp con React/Next.js y un design system documentado en Storybook. El sistema SASS era potente pero no estaba documentado — solo yo sabía cómo usarlo. También añadiría tests de usabilidad formales con usuarios reales — el experto sabe qué es correcto clínicamente; el usuario sabe qué es usable en su día a día. Necesitas los dos.",
    year: 2024,
    role: "Diseño UI/UX + Desarrollo Frontend completo + Arquitectura CSS propia",
    duration: "4 meses",
    stack: ["Angular", "Firebase", "SASS", "Figma"],
    demoUrl: "https://mental-ht.web.app",
    githubUrl: null,
    featured: false,
    image: "/projects/psicoapp.png",
    color: "#f0a500",
  },
  // ── Professional ──────────────────────────────────────────────────────────
  {
    id: "phyos",
    category: "professional" as const,
    title: "Phyos",
    tagline: "De clínica genérica a marca premium de fisioterapia",
    description:
      "Rediseño web completo para clínica de fisioterapia premium. De plantilla WordPress cargada a identidad oscura y cinematográfica que comunica exclusividad desde el primer scroll.",
    clientBio:
      "Centro multidisciplinar en Burjassot (Valencia) que combina fisioterapia, osteopatía, nutrición, podología y psicología bajo un mismo enfoque integral.",
    clientType: "Salud · Fisioterapia",
    problem:
      "Web anticuada y densa: hero plano sin emoción, jerarquía visual inexistente y exceso de texto comprimido. La identidad de marca quedaba diluida en una plantilla genérica que no transmitía ni exclusividad ni confianza.",
    process: "",
    solution:
      "Rediseño con estética oscura y cinematográfica que rompe con el azul médico genérico. Hero de gran presencia visual, jerarquía clara, aire entre secciones y CTAs que guían la conversión. La percepción de marca subió varios escalones.",
    results: "",
    year: 2026,
    role: "Diseño UI/UX + Desarrollo Frontend",
    duration: "3 semanas",
    stack: ["Next.js", "Tailwind", "Vercel"],
    demoUrl: "https://phyos-center.vercel.app/",
    githubUrl: null,
    featured: false,
    image: "/projects/phyos.png",
    color: "#48c9b0",
  },
  {
    id: "vetefriendly",
    category: "professional" as const,
    title: "Vete Friendly",
    tagline: "Landing editorial para veterinaria integrativa",
    description:
      "Web de presentación premium para Antonella, veterinaria especializada en medicina integrativa. Diseño editorial con paleta tierra, animaciones cinematográficas y componentes interactivos a medida.",
    clientBio:
      "Veterinaria especializada en medicina integrativa para perros y gatos — nutrición fisiológica, micoterapia, ozonoterapia y fisiatría.",
    clientType: "Salud Animal · Veterinaria",
    problem:
      "Sin presencia web profesional que comunicara la especialización y el enfoque diferencial de la consulta. La medicina integrativa veterinaria necesita transmitir confianza y criterio científico — muy distinto al tono genérico de las webs de clínicas convencionales.",
    process: "",
    solution:
      "Landing editorial con paleta tierra/oliva y tipografía Cormorant + Manrope. Parallax en hero, animaciones con whileInView, galería paginada con carousel direccional, modales de servicio animados y carrusel de testimonios adaptativo. Decoraciones botánicas SVG custom en cada sección para reforzar la identidad visual.",
    results: "",
    year: 2026,
    role: "Diseño UI/UX + Desarrollo Frontend",
    duration: "4 semanas",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    demoUrl: "https://vetefriendly.vercel.app/",
    githubUrl: null,
    featured: false,
    image: "/projects/vetefriendly.PNG",
    color: "#8a9e6b",
    gallery: [
      "/projects/vetefriendly1.PNG",
      "/projects/vetefriendly2.PNG",
      "/projects/vetefriendly3.PNG",
    ],
  },
  {
    id: "pro-placeholder",
    category: "professional" as const,
    title: "Próximamente",
    tagline: "Más proyectos de locales y autónomos — en camino",
    description: "",
    clientBio: "",
    clientType: "",
    problem: "",
    process: "",
    solution: "",
    results: "",
    year: 2025,
    role: "Diseño + Desarrollo",
    duration: "",
    stack: ["Next.js", "Tailwind", "Vercel"],
    demoUrl: null,
    githubUrl: null,
    featured: false,
    image: "",
    color: "#888884",
    wip: true,
  },
] satisfies Project[];
