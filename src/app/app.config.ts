import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { provideRouter } from '@angular/router'; // <-- Garanta esta importação
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes'; // <-- Importe seu arquivo de rotas

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // <-- Adicione seu arquivo de rotas aqui

    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ]
};