import { useState } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import ApplicationWizard from './components/ApplicationWizard';
import type { ApplicationIntent } from './constants/ambassadorForm';

function App() {
  const [applicationIntent, setApplicationIntent] = useState<ApplicationIntent | null>(null);

  if (applicationIntent !== null) {
    return (
      <div className="min-h-screen">
        <Header onCloseApplication={() => setApplicationIntent(null)} />
        <ApplicationWizard
          applicationIntent={applicationIntent}
          onClose={() => setApplicationIntent(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <LandingPage onApply={(intent) => setApplicationIntent(intent)} />
    </div>
  );
}

export default App;
