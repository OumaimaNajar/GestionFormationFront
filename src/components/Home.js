import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import HeaderParticipant from './HeaderParticipant';
import backgroundImage from '../images/fond.png';
import { useNavigate } from 'react-router-dom';
import api from './Api'; // Assurez-vous que le nom du fichier est correct

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // État pour stocker les formations
  const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/allFormation');
        console.log('Réponse de l\'API:', response.data); // Vérifiez la structure des données ici

        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error('Les données reçues ne sont pas un tableau:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddEvaluation = (courseId) => {
    if (userId) {
      navigate(`/add-evaluation/${courseId}/${userId}`); // Passez l'ID de l'utilisateur à la page d'évaluation
    } else {
      console.error('ID de l\'utilisateur non disponible');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: 20,
      }}
    >
      <Container>
        <HeaderParticipant />
        <Grid container spacing={4}>
          {courses.length === 0 ? (
            <Typography variant="h5" component="div" gutterBottom>
              Aucune formation disponible.
            </Typography>
          ) : (
            courses.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.idFormation}>
                <Card
                  sx={{
                    backgroundColor: '#3337', 
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 1,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {course.titre}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#fff', color: 'red', '&:hover': { backgroundColor: '#f0f0f0' } }}
                      onClick={() => handleAddEvaluation(course.idFormation)}
                    >
                      Ajouter une évaluation
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
