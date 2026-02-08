import styled, { css } from "styled-components";

export const Card = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;

  padding: 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 0px 17px 3px rgba(0, 0, 0, 0.1);
`;

export const LogoContainer = styled.div`
  width: 84px;
  height: 84px;
`;

export const InfoContainer = styled.div``;

export const SalonName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

export const AddressText = styled.p`
  font-size: 14px;
  color: #888;
  margin: 2px 0;
`;

export const AppointmentTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 12px 0 2px 0;
`;

export const AppointmentDateTime = styled.p`
  font-size: 16px;
  color: #333;
  margin: 2px 0;
`;

export const AppointmentDetails = styled.p`
  font-size: 14px;
  color: #888;
  margin: 2px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 13px;
  margin: 1rem 0 0 1rem;
`;
