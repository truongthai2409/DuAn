import 'i18next';
// import resources from './resources';
import { defaultNS, resources } from '../i18n/i18n';
import ns1 from '../../assets/locals/ns1.json';
import ns2 from '../../assets/locals/ns2.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['vi'];
  }
}
