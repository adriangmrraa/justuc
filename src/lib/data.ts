export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  institution: string;
  officer?: string;
  location?: string;
  status: "completed" | "in_progress" | "pending";
  category: "hearing" | "document" | "resolution" | "notification";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: "hearing" | "status_change" | "reminder";
  read: boolean;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "hearing" | "deadline";
}

export interface VideoRecord {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: "submitted" | "pending";
}

export interface CaseInfo {
  caseNumber: string;
  victimName: string;
  status: "active" | "in_process" | "resolved";
  lastUpdate: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "evt-1",
    date: "2026-04-03",
    title: "Contaste lo que pasaste",
    description:
      "Le contaste al juez lo que pasó. Tu declaración quedó registrada en el sistema.",
    institution: "Poder Judicial de Tucumán",
    status: "completed",
    category: "document",
  },
  {
    id: "evt-2",
    date: "2026-04-10",
    title: "Un juez está revisando",
    description:
      "Tu caso fue derivado a la Fiscalía para que un fiscal evalúe los pasos a seguir.",
    institution: "Ministerio Público Fiscal",
    officer: "Dr. Carlos Martínez",
    status: "completed",
    category: "notification",
  },
  {
    id: "evt-3",
    date: "2026-05-02",
    title: "Te citaron a declarar",
    description:
      "Te convocaron a ampliar tu declaración ante el fiscal para aportar más detalles.",
    institution: "Fiscalía de Instrucción",
    location: "Fiscalía de Instrucción N°3 — Tribunales de Tucumán",
    officer: "Dr. Carlos Martínez",
    status: "completed",
    category: "hearing",
  },
  {
    id: "evt-4",
    date: "2026-05-15",
    title: "Están analizando las pruebas",
    description:
      "Los peritos están estudiando las pruebas presentadas. Este análisis es clave para el avance de tu causa.",
    institution: "Cuerpo de Investigaciones Fiscales",
    status: "in_progress",
    category: "resolution",
  },
  {
    id: "evt-5",
    date: "2026-06-10",
    title: "Audiencia con el fiscal",
    description:
      "Te convocaron a una audiencia para definir los próximos pasos del proceso.",
    institution: "Fiscalía de Instrucción",
    location: "Fiscalía N°3 — 2° Piso, Tribunales de Tucumán",
    officer: "Dr. Carlos Martínez",
    status: "pending",
    category: "hearing",
  },
  {
    id: "evt-6",
    date: "2026-07-01",
    title: "El juez va a resolver",
    description:
      "El juez evaluará los informes y pruebas para tomar una resolución sobre tu caso.",
    institution: "Poder Judicial de Tucumán",
    status: "pending",
    category: "resolution",
  },
  {
    id: "evt-7",
    date: "2026-08-15",
    title: "Caso cerrado",
    description:
      "Una vez que el juez dicte resolución, tu caso quedará formalmente cerrado.",
    institution: "Poder Judicial de Tucumán",
    status: "pending",
    category: "notification",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    title: "Nueva audiencia programada",
    message:
      "Se programó una audiencia para el 10 de junio de 2026 a las 10:00 hs en Fiscalía N°3. Presentate 15 minutos antes.",
    date: "2026-05-20",
    type: "hearing",
    read: false,
  },
  {
    id: "notif-2",
    title: "Cambio de estado",
    message:
      "Tu caso pasó a la etapa de análisis de pruebas. Los peritos están trabajando.",
    date: "2026-05-15",
    type: "status_change",
    read: false,
  },
  {
    id: "notif-3",
    title: "Recordatorio de declaración",
    message:
      "Tu declaración en video fue recibida correctamente. Ya está asociada a tu expediente.",
    date: "2026-05-03",
    type: "reminder",
    read: true,
  },
  {
    id: "notif-4",
    title: "Caso asignado a fiscal",
    message:
      "El Dr. Carlos Martínez fue asignado como fiscal de tu causa. Podés contactarlo a través del tribunal.",
    date: "2026-04-10",
    type: "status_change",
    read: true,
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "ue-1",
    title: "Audiencia con el fiscal",
    date: "2026-06-10",
    time: "10:00 hs",
    location: "Fiscalía N°3 — 2° Piso, Tribunales de Tucumán",
    type: "hearing",
  },
];

export const videoHistory: VideoRecord[] = [
  {
    id: "vid-1",
    title: "Declaración inicial",
    date: "2026-04-03",
    duration: "02:35",
    status: "submitted",
  },
  {
    id: "vid-2",
    title: "Ampliación de declaración",
    date: "2026-05-02",
    duration: "01:48",
    status: "pending",
  },
];

export interface User {
  dni: string;
  name: string;
  caseNumber: string;
  password: string; // provisional = caseNumber, changed after first login
  mustChangePassword: boolean;
}

export const mockUsers: User[] = [
  {
    dni: "30123456",
    name: "María Elena",
    caseNumber: "MPF-TUC-2026-00421",
    password: "MPF-TUC-2026-00421", // provisional = case number
    mustChangePassword: true,
  },
];

export function findUserByDni(dni: string): User | undefined {
  return mockUsers.find((u) => u.dni === dni);
}

export function validatePassword(user: User, password: string): boolean {
  return user.password === password;
}

export const caseInfo: CaseInfo = {
  caseNumber: "MPF-TUC-2026-00421",
  victimName: "María Elena",
  status: "in_process",
  lastUpdate: "2026-05-15",
};
