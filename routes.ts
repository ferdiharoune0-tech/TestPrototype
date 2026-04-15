import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { Virement } from './pages/Virement';
import { ChequesImpayes } from './pages/ChequesImpayes';
import { FraudeIA } from './pages/FraudeIA';
import { Mourabaha } from './pages/Mourabaha';
import { Oppositions } from './pages/Oppositions';
import { Contrats } from './pages/Contrats';
import { Factures } from './pages/Factures';
import { Echeancier } from './pages/Echeancier';
import { Alertes } from './pages/Alertes';
import { Beneficiaires } from './pages/Beneficiaires';
import { Historique } from './pages/Historique';
import { Litiges } from './pages/Litiges';
import { Audit } from './pages/Audit';
import { Droits } from './pages/Droits';
import { GenericPage } from './pages/GenericPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'dashboard', Component: Dashboard },
      { path: 'virement', Component: Virement },
      { path: 'cheques-impayes', Component: ChequesImpayes },
      { path: 'fraude-ia', Component: FraudeIA },
      { path: 'mourabaha', Component: Mourabaha },
      { path: 'releves', Component: GenericPage },
      { path: 'oppositions', Component: Oppositions },
      { path: 'atd', Component: GenericPage },
      { path: 'contrats', Component: Contrats },
      { path: 'factures', Component: Factures },
      { path: 'echeancier', Component: Echeancier },
      { path: 'alertes', Component: Alertes },
      { path: 'beneficiaires', Component: Beneficiaires },
      { path: 'historique', Component: Historique },
      { path: 'litiges', Component: Litiges },
      { path: 'audit', Component: Audit },
      { path: 'droits', Component: Droits },
      { path: 'tresorerie', Component: GenericPage },
      { path: 'correspondants', Component: GenericPage },
      { path: 'taux-change', Component: GenericPage },
      { path: 'documents', Component: GenericPage },
      { path: 'statistiques', Component: GenericPage },
      { path: 'parametres', Component: GenericPage },
      { path: 'garanties', Component: GenericPage },
      { path: 'lettres-credit', Component: GenericPage },
      { path: 'effets-commerce', Component: GenericPage },
      { path: 'conciliation', Component: GenericPage },
      { path: 'cartes', Component: GenericPage },
      { path: 'remises', Component: GenericPage },
      { path: 'international', Component: GenericPage },
    ],
  },
]);
