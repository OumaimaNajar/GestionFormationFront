import axios from 'axios';

// Créer une instance d'Axios avec une configuration de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080', // Utiliser une variable d'environnement pour l'URL
});



const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/login', credentials);
    if (response.data.status === 'SUCCESS') {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userName', `${response.data.nom} ${response.data.prenom}`);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userId', response.data.idEnseignant); // Stocker l'ID de l'utilisateur
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};




// Fonction pour ajouter une évaluation
export const addEvaluationFormation = async (idFormation, idEnseignant, evaluationData) => {
  if (!idFormation || !idEnseignant) {
    throw new Error('Formation ID or Enseignant ID is missing');
  }

  const response = await api.post(
    `/addEvaluationFormationAndAssignToFormationAndEnseignant/${idFormation}/${idEnseignant}`,
    evaluationData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


// Fonction pour récupérer les formations
export const getFormations = async () => {
  try {
    const reponse = await api.get('/allFormation');
    return reponse.data;
  } catch (erreur) {
    console.error('Erreur lors de la récupération des formations:', erreur);
    throw erreur;
  }
};


export const getEvaluationFormations = async () => {
  try {
    const reponse = await api.get('/getAllEvaluationFormation');
    return reponse.data;
  } catch (erreur) {
    console.error('Erreur lors de la récupération des evaluations des formations:', erreur);
    throw erreur;
  }
};




// Fonction pour récupérer le titre de la formation par ID de l'évaluation
export const getFormationTitleByEvaluationId = async (idEvaluationFormation) => {
  try {
    const reponse = await api.get(`/getTitleFormationByEvaluation/${idEvaluationFormation}`);
    return reponse.data;
  } catch (erreur) {
    console.error('Erreur lors de la récupération du titre de la formation:', erreur);
    throw erreur;
  }
};



// Fonction pour récupérer toutes les évaluations des participants
export const getAllEvaluationParticipantDetails = async () => {
  try {
    const response = await api.get('/allEvaluationParticipant');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des évaluations des participants:", error);
    throw error;
  }
};

// Fonction pour récupérer les détails d'une évaluation spécifique
export const getEvaluationDetails = async (idEvaluationParticipant) => {
  try {
    const response = await api.get(`/evaluationDetails/${idEvaluationParticipant}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails de l'évaluation ${idEvaluationParticipant}:`, error);
    throw error;
  }
};




// Générer des attestations pour une formation
export const genererAttestationsPourFormation = async (idFormation) => {
  try {
      const response = await axios.post(`/generer/${idFormation}`);
      return response.status;
  } catch (error) {
      console.error("Erreur lors de la génération des attestations", error);
      throw error;
  }
};

// Télécharger l'attestation
export const telechargerAttestation = async (idAttestation) => {
  try {
      const response = await axios.get(`/telecharger/${idAttestation}`, {
          responseType: 'blob', // important pour télécharger un fichier binaire
      });
      return response.data;
  } catch (error) {
      console.error("Erreur lors du téléchargement de l'attestation", error);
      throw error;
  }
};


// Fonction pour récupérer les participants par formation
export const fetchParticipantsByFormation = async (idFormation) => {
  try {
      const response = await axios.get(`/getEnseignantsByFormation/${idFormation}`);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la récupération des participants", error);
      throw error;
  }
};


// Fonction pour récupérer tous les enseignants
export const fetchAllEnseignants = async () => {
  try {
    const response = await api.get('/allEnseignant'); // Utiliser axios pour maintenir la cohérence
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des enseignants", error);
    throw error;
  }
};


// Fonction pour récupérer les enseignants ayant le rôle de participant
export const fetchEnseignantsByRole = async () => {
  try {
    const response = await api.get('/getEnseignantsByRole');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des enseignants participants', error);
    throw error;
  }
};


export const fetchEnseignantById = async (idEnseignant) => {
  const response = await api.get(`/getEnseignant/${idEnseignant}`);
  return response.data;
};


// Exemple de méthode pour récupérer le titre de la formation par ID de l'enseignant
export const getFormationTitleByEnseignantId = async (idEnseignant) => {
  try {
    const response = await api.get(`/getFormationTitleByEnseignantId/${idEnseignant}`);
    console.log('Response:', response);  // Inspectez la réponse
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du titre de la formation:', error);
    throw error;
  }
};


// Fonction pour récupérer les enseignants avec des évaluations élevées
export const fetchEnseignantsWithHighEvaluations = async () => {
  try {
    const response = await api.get('/enseignants-low-scores');
    console.log('Response:', response.data);  // Inspecter la réponse pour vérifier la structure
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des enseignants avec des évaluations élevées:', error);
    throw error;
  }
};

// Fonction pour télécharger un certificat
export const telechargerCertificat = async (idCertificat) => {
  try {
    const response = await api.get(`/telechargerCertificat/${idCertificat}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certificat_${idCertificat}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Erreur lors du téléchargement du certificat", error);
    throw error;
  }
};


// Fonction pour générer des certificats pour une formation
export const genererCertificatsPourFormation = async (idFormation) => {
  try {
    const response = await api.post(`/genererCertificats/${idFormation}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la génération des certificats", error);
    throw error;
  }
};


// Ajouter un certificat et l'attribuer à une formation et un enseignant
export const addCertificatAndAssignToFormationAndEnseignant = async (certificatRequest, idFormation, idEnseignant) => {
  try {
    const response = await api.post(
      `/addCertificatAndAssignToFormationAndEnseignant/${idFormation}/${idEnseignant}`,
      certificatRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du certificat et de l\'attribution:', error);
    throw error;
  }
};




export default api;
