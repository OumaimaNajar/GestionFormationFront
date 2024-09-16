import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Footer from './components/Footer';
import AddEvaluationForm from './components/AddEvaluationForm';
import Dashboard from './components/Dashboard';
import QuizPage from './components/QuizPage';
import AttestationPage from './components/AttestationPage';
import EvaluationPage from './components/EvaluationPage';
import ParticipantEvaluation from './components/ParticipantEvaluation';
import AllEvaluations from './components/AllEvaluations';


import SignIn from './components/SignIn';
import DashboardFormateur from './components/DashboardFormateur';
import DashboardParticipant from './components/DashboardParticipant';
import AttestationParticipation from './components/AttestationParticipation';
import CertificatSuccess from './components/CertificatSuccess';
import MyAttest from './components/MyAttest';
import MyAnimationParticipation from './components/MyAnimationParticipation';
import MyAnimation from './components/MyAnimation';



function App() {
  return (
    
    <div className="App">
    <Router>
      
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home/:idEnseignant" element={<Home />} />
        <Route path="/dashboard-participant" element={<DashboardParticipant />} />
        <Route path="/dashboard-formateur" element={<DashboardFormateur />} />
        <Route path="/attestation-participation" element={<AttestationParticipation />} />
        <Route path="/myAnimation/:idEnseignant" element={<MyAnimation />} />
        
        
        <Route path="/attestation/:idEnseignant" element={<AttestationPage />} />
        <Route path="/myattest/:idEnseignant" element={<MyAttest />} />
        <Route path="/allEvaluations" element={<AllEvaluations/>} />
        

        <Route path="/certificat/:idEnseignant" element={<CertificatSuccess />} />

        <Route path="/add-evaluation/:idFormation/:idEnseignant" element={<AddEvaluationForm />} />

        {/* <Route path="/QuizPage" element={<QuizPage />} />
        

        <Route path="/EvaluationPage" element={<EvaluationPage />} />
        

        <Route path="/participant-evaluation" element={<ParticipantEvaluation />} /> */}

      </Routes>
      <Footer/>
    </Router>
  </div>
  );
}

export default App;
