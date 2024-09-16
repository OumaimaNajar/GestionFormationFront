import React from 'react';
import styled from 'styled-components';
import { FaTasks, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 90px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 36px;
  color: #007bff;
  margin-bottom: 12px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #343a40;
`;

const CardContent = styled.div`
  font-size: 16px;
  color: #495057;
`;

const Header = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

const MyDashboard = () => {
  return (
    <PageContainer>
      <Header>My Dashboard</Header>
      <CardContainer>
        <Card>
          <CardIcon><FaTasks /></CardIcon>
          <CardTitle>Completed Tasks</CardTitle>
          <CardContent>Last Campaign Performance</CardContent>
        </Card>
        <Card>
          <CardIcon><FaCalendarAlt /></CardIcon>
          <CardTitle>Upcoming Events</CardTitle>
          <CardContent>Check out our upcoming events</CardContent>
        </Card>
        <Card>
          <CardIcon><FaTrophy /></CardIcon>
          <CardTitle>Team Achievements</CardTitle>
          <CardContent>See what our team has accomplished</CardContent>
        </Card>
        {/* Add more cards here */}
      </CardContainer>
    </PageContainer>
  );
};

export default MyDashboard;
