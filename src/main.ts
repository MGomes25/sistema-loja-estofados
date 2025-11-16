import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // Seu componente raiz, que chamei de 'App' no exemplo anterior
import { registerLocaleData } from '@angular/common'; // <-- IMPORTE registerLocaleData
import localePt from '@angular/common/locales/pt'; // <-- IMPORTE OS DADOS DE LOCALIZAÇÃO PARA PORTUGUÊS

// 1. REGISTRE os dados de localização ANTES de iniciar a aplicação
registerLocaleData(localePt, 'pt');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));