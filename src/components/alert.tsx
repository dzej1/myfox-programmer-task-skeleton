import styled from "styled-components";
import { InfoIcon } from "lucide-react";

const AlertContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background-color: #d4e9d1; /* Soft green background */
  border-radius: 12px;
  color: #1a1a1a;
  max-width: 500px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.5;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 400;
`;

export const InfoAlert = () => (
  <AlertContainer>
    <IconWrapper>
      <InfoIcon size={24} />
    </IconWrapper>
    <Message>
      Údaje se použijí v příštích rezervacích, které se tím zrychlí.
    </Message>
  </AlertContainer>
);
