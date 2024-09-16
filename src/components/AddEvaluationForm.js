import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderParticipant from './HeaderParticipant';
import backgroundImage from '../images/fond.png';
import formBackgroundImage from '../images/addEva.png';
import { FaCommentAlt, FaPhoneAlt, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { addEvaluationFormation } from './Api'; // Importez la fonction API

const categories = [
  'Aspect organisationnel',
  'Aspect pédagogique',
  'Aspect technique'
];

const satisfactionLevels = [
  'NON_SATISFAIT',
  'PEU_SATISFAIT',
  'SATISFAIT',
  'TRES_SATISFAIT'
];

const AddEvaluationForm = () => {
  const { idFormation, idEnseignant } = useParams(); // Récupérez l'identifiant de la formation et de l'enseignant depuis les paramètres de l'URL
  const [formData, setFormData] = useState({
    comment: '',
    phone: ''
  });

  const [evaluation, setEvaluation] = useState(
    categories.reduce((acc, category) => {
      acc[category] = null;
      return acc;
    }, {})
  );

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Ajoutez un log pour vérifier la valeur de idFormation et idEnseignant
  console.log('ID Formation:', idFormation);
  console.log('ID Enseignant:', idEnseignant);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (category, level) => {
    setEvaluation(prevState => ({
      ...prevState,
      [category]: prevState[category] === level ? null : level
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparer les données d'évaluation pour l'API
    const evaluationData = {
      date: new Date().toISOString(),
      aspectOrganisationnel: evaluation['Aspect organisationnel'],
      aspectPedagogique: evaluation['Aspect pédagogique'],
      aspectTechnique: evaluation['Aspect technique'],
      note: formData.comment
    };

    try {
      await addEvaluationFormation(idFormation, idEnseignant, evaluationData);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      alert('Une erreur est survenue lors de l\'envoi de l\'évaluation. Veuillez réessayer plus tard.');
    }
  };

  return (
    <PageContainer>
      <HeaderParticipant />
      <LargeSpacer />
      <FormContainer>
        <LeftColumn>
          <HeaderTitle>
            <FaCommentAlt /> Évaluez nos formations
          </HeaderTitle>
          <Spacer />
          <ContactInfo>
            <ContactItem>
              <FaPhoneAlt /> +33 1 23 45 67 89
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt /> 1, 2 rue André Ampère - 33555 - Pôle Technologique - 33 Gradignan
            </ContactItem>
          </ContactInfo>
        </LeftColumn>
        <RightColumn>
          {showSuccessAlert && (
            <SuccessAlert>
              <FaPaperPlane /> Évaluation envoyée avec succès!
            </SuccessAlert>
          )}
          <Form onSubmit={handleSubmit}>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Catégories</TableHeader>
                    {satisfactionLevels.map(level => (
                      <TableHeader key={level}>{level}</TableHeader>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <TableRow key={category}>
                      <TableCell category>{category}</TableCell>
                      {satisfactionLevels.map(level => (
                        <TableCell key={level}>
                          <CheckboxContainer>
                            <Checkbox
                              type="checkbox"
                              checked={evaluation[category] === level}
                              onChange={() => handleCheckboxChange(category, level)}
                            />
                            <Checkmark checked={evaluation[category] === level} />
                          </CheckboxContainer>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
            <InputContainer>
              <InputLabel>
                <FaCommentAlt /> Votre Évaluation
              </InputLabel>
              <TextareaField
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
              />
            </InputContainer>
            <SubmitButtonContainer>
              <SubmitButton type="submit">
                <FaPaperPlane /> Envoyer
              </SubmitButton>
            </SubmitButtonContainer>
          </Form>
        </RightColumn>
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  padding: 100px;
`;

const LargeSpacer = styled.div`
  height: 0;
`;

const Spacer = styled.div`
  height: 10px;
`;

const FormContainer = styled.div`
  background-color: #fff;
  background-image: url(${formBackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 100px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 70%;
  display: flex;
  align-items: flex-start;
`;

const LeftColumn = styled.div`
  flex: 1;
  text-align: left;
  margin-right: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h2`
  background-color: #3339;
  color: #fff;
  padding: 15px;
  border-radius: 13px;
  margin-bottom: 10px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ContactInfo = styled.div`
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const InputLabel = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextareaField = styled.textarea`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 90%;
  height: 70px;
  resize: vertical;
  background-color: #f9f9f9;
`;

const TableContainer = styled.div`
  margin: 0px 0;
  overflow-x: auto;
  margin-bottom: 45px;
`;

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 15px;
  background-color: #3335;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  ${props => props.category && `
    font-weight: bold;
    background-color: #f0f0f0;
    color: #333;
  `}
`;

const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 5px;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
  ${Checkbox}:checked + & {
    background-color: red;
  }
  ${Checkbox}:checked + &:after {
    display: block;
  }
  &:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  width: 120px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;


const SuccessAlert = styled.div`
  background-color: #cc0000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default AddEvaluationForm;
