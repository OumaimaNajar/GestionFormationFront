// TrainingSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingSelection = ({ onTrainingSelect }) => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios.get('/api/trainings') // Endpoint pour récupérer les formations
      .then(response => setTrainings(response.data))
      .catch(error => console.error('Error fetching trainings', error));
  }, []);

  return (
    <div>
      <h2>Sélectionner une Formation</h2>
      <select onChange={e => onTrainingSelect(e.target.value)}>
        <option value="">Choisissez une formation</option>
        {trainings.map(training => (
          <option key={training.id} value={training.id}>
            {training.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrainingSelection;
