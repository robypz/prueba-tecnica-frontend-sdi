import { Session } from "./session.model";

export class SessionMock {
  private key = 'sessions';

  constructor() {
    this.seedIfEmpty();
  }

  private seedIfEmpty(): void {
    const existing = localStorage.getItem(this.key);
    if (existing) return;

    const seed: Session[] = [
      {
        id: crypto.randomUUID(),
        title: 'Teatro "Inmaduros"',
        description: 'Obra cómica sobre la madurez emocional en tiempos modernos.',
        category: 'Teatro',
        city: 'Logroño',
        date: '2025-11-01T20:00:00',
        status: 'borrador'
      },
      {
        id: crypto.randomUUID(),
        title: 'Visita guiada al Teatro Bretón',
        description: 'Recorrido histórico por el emblemático teatro de la ciudad.',
        category: 'Cultural',
        city: 'Logroño',
        date: '2025-11-04T11:00:00',
        status: 'borrador'
      },
      {
        id: crypto.randomUUID(),
        title: 'Bailes regionales',
        description: 'Exhibición de danzas tradicionales de La Rioja.',
        category: 'Folclore',
        city: 'Calahorra',
        date: '2025-11-21T18:30:00',
        status: 'borrador'
      },
      {
        id: crypto.randomUUID(),
        title: 'Demo Angular 2025',
        description: 'Sesión técnica para presentar novedades de Angular.',
        category: 'Formación',
        city: 'Haro',
        date: '2025-11-10T10:00:00',
        status: 'oculto'
      },
      {
        id: crypto.randomUUID(),
        title: 'Reunión interna SDI',
        description: 'Encuentro mensual para revisión de objetivos y planificación.',
        category: 'Reunión',
        city: 'Logroño',
        date: '2025-11-15T09:00:00',
        status: 'bloqueado'
      },
      {
        id: crypto.randomUUID(),
        title: 'Taller de accesibilidad web',
        description: 'Aprende a crear interfaces inclusivas y accesibles.',
        category: 'Formación',
        city: 'Nájera',
        date: '2025-11-28T16:00:00',
        status: 'borrador'
      }
    ];

    localStorage.setItem(this.key, JSON.stringify(seed));
  }
}
