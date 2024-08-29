import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faLightbulb, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AlertBox = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  text-align: center;
`;

const AlertTitle = styled.h2`
  margin-bottom: 20px;
  color: ${(props) => (props.satisfactory ? '#3c763d' : '#a94442')};
  font-size: 24px;
`;

const AlertMessage = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  color: #555;
`;

const AlertButton = styled.button`
  background-color: ${(props) => (props.satisfactory ? '#5cb85c' : '#d9534f')};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.satisfactory ? '#4cae4c' : '#c9302c')};
  }
`;

const Container = styled.div`
  padding: 100px;
  max-width: 700px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  color: #343a40;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const QuestionContainer = styled.div`
  margin-bottom: 40px;
  border-radius: 15px;
  background-color: white;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h3`
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    color: #0077b6;
  }
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  color: #555;
  font-size: 16px;

  input[type="radio"] {
    margin-right: 12px;
    accent-color: #0077b6;
  }
`;

const Button = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  margin-top: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E61F1F;
  }

  svg {
    margin-right: 8px;
  }
`;

const QuizPage = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: 'What is React?',
      options: [
        'A JavaScript library for building user interfaces',
        'A programming language',
        'A database',
        'A CSS framework',
      ],
    },
    {
      id: 2,
      question: 'What is a component?',
      options: [
        'A reusable piece of UI',
        'A function',
        'A variable',
        'A library',
      ],
    },
    {
      id: 3,
      question: 'What is state in React?',
      options: [
        'A global object',
        'A local object that determines how the component renders and behaves',
        'A CSS property',
        'A JavaScript function',
      ],
    },
  ];

  const correctAnswers = {
    1: 'A JavaScript library for building user interfaces',
    2: 'A reusable piece of UI',
    3: 'A local object that determines how the component renders and behaves',
  };

  const handleChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleSubmit = () => {
    const isSatisfactory = questions.every(
      (q) => answers[q.id] && answers[q.id] === correctAnswers[q.id]
    );

    setResult(isSatisfactory);
  };

  const handleCloseAlert = () => {
    if (result) {
      navigate('/certificate');
    } else {
      setResult(null);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Title><FontAwesomeIcon icon={faUserGraduate} /> Training Quiz</Title>
        {questions.map((q) => (
          <QuestionContainer key={q.id}>
            <QuestionTitle>
              <FontAwesomeIcon icon={faLightbulb} />
              {q.question}
            </QuestionTitle>
            {q.options.map((option, index) => (
              <Option key={index}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={(e) => handleChange(e, q.id)}
                />
                {option}
              </Option>
            ))}
          </QuestionContainer>
        ))}
        <Button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faBookOpen} /> Submit
        </Button>
      </Container>
      {result !== null && (
        <AlertContainer>
          <AlertBox>
            <AlertTitle satisfactory={result}>
              {result ? 'Satisfactory' : 'Not Satisfactory'}
            </AlertTitle>
            <AlertMessage>
              {result
                ? 'Congratulations, you have answered all the questions correctly!'
                : 'Unfortunately, your answers were not satisfactory. Please try again.'}
            </AlertMessage>
            <AlertButton satisfactory={result} onClick={handleCloseAlert}>
              Okey
            </AlertButton>
          </AlertBox>
        </AlertContainer>
      )}
    </>
  );
};

export default QuizPage;
