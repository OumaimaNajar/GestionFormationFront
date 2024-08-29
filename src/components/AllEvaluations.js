import React, { useEffect, useState } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { getEvaluationFormations, getFormationTitleByEvaluationId } from './Api'; // Assurez-vous que ce chemin est correct
import backgroundImage from '../images/fond.png';
import styled from 'styled-components';
import { FaRegStar, FaStar } from 'react-icons/fa'; 

// Styled-components pour le style des cartes
const EvaluationCard = styled(Card)`
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 35px 36px 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  position: relative; /* Nécessaire pour positionner les étoiles */
  
  &:hover {
    box-shadow: 0 16px 12px 0 rgba(0, 0, 0, 0.2);
  }
`;

const EvaluationPageContainer = styled(Box)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 50vh;
  padding: 100px;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.2rem;
  margin-left: auto;
  position: absolute; /* Positionner absolument par rapport à la carte */
  bottom: 10px; /* Ajuster la position verticale */
  right: 10px; /* Ajuster la position horizontale */
`;

const StarIcon = styled(FaStar)`
  color: ${(props) => (props.isFilled ? 'yellow' : 'gray')};
  cursor: pointer; /* Ajoute le curseur pointer pour l'interaction */
`;

const StarIconEmpty = styled(FaRegStar)`
  color: gray;
  cursor: pointer; /* Ajoute le curseur pointer pour l'interaction */
`;

const AllEvaluations = () => {
  const [evaluationFormations, setEvaluationFormations] = useState([]);
  const [favoritedItems, setFavoritedItems] = useState(new Set());
  const [hoverRating, setHoverRating] = useState(null); // Nouvel état pour le survol
  const [rating, setRating] = useState({}); // Nouvel état pour la note des évaluations
  const [formationTitles, setFormationTitles] = useState({}); // Nouvel état pour les titres de formation

  useEffect(() => {
    const fetchEvaluationFormations = async () => {
      try {
        const data = await getEvaluationFormations();
        console.log('Réponse de l\'API:', data); // Ajout d'un log pour vérifier les données reçues

        setEvaluationFormations(data);

        // Filtrer les évaluations avec un identifiant valide
        const validEvaluations = data.filter(evaluation => evaluation.idEvaluationFormation !== undefined && evaluation.idEvaluationFormation !== null);
        console.log('Évaluations valides:', validEvaluations); // Log des évaluations valides

        const titles = await Promise.all(validEvaluations.map(evaluation => 
          getFormationTitleByEvaluationId(evaluation.idEvaluationFormation)
        ));
        
        const titlesMap = validEvaluations.reduce((acc, evaluation, index) => {
          acc[evaluation.idEvaluationFormation] = titles[index];
          return acc;
        }, {});
        
        setFormationTitles(titlesMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des évaluations :', error);
      }
    };

    fetchEvaluationFormations();
  }, []);


  const handleFavorite = (index) => {
    setFavoritedItems((prevFavoritedItems) => {
      const newFavoritedItems = new Set(prevFavoritedItems);
      if (newFavoritedItems.has(index)) {
        newFavoritedItems.delete(index);
      } else {
        newFavoritedItems.add(index);
      }
      return newFavoritedItems;
    });
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleStarClick = (index, ratingValue) => {
    setRating((prevRating) => ({
      ...prevRating,
      [index]: ratingValue,
    }));
  };

  return (
    <EvaluationPageContainer>
      <Header />
      {evaluationFormations.length > 0 ? (
        evaluationFormations.map((evaluation, index) => {
          const currentRating = rating[index] || 0;
          const displayRating = hoverRating !== null ? hoverRating + 1 : currentRating;

          return (
            <EvaluationCard key={index}>
              <CardHeader
              title={formationTitles[evaluation.idEvaluationFormation] || 'Formation sans titre'}
              
            />
              <CardContent>
              <Typography variant="body2" color="textSecondary">
                {evaluation.note || 'Pas de commentaire'}
              </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="like"
                  onClick={() => handleFavorite(index)}
                  color={favoritedItems.has(index) ? 'error' : 'inherit'}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <StarRating
                  onMouseLeave={handleMouseLeave} /* Ajouter gestionnaire de sortie de survol */
                >
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      onMouseEnter={() => handleMouseEnter(i)} /* Ajouter gestionnaire de survol */
                      onClick={() => handleStarClick(index, i + 1)} /* Ajouter gestionnaire de clic */
                    >
                      {i < displayRating ? (
                        <StarIcon isFilled={true} />
                      ) : (
                        <StarIconEmpty />
                      )}
                    </span>
                  ))}
                </StarRating>
              </CardActions>
            </EvaluationCard>
          );
        })
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          Aucune évaluation trouvée
        </Typography>
      )}
    </EvaluationPageContainer>
  );
};

export default AllEvaluations;
