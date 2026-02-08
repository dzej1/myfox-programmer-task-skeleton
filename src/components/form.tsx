import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-inline: auto;
  padding: 1rem;
  max-width: 100%;

  @media (min-width: 768px) {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
    max-width: 600px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #4a4a4a;
`;

export const Input = styled.input<{
  $hasError?: boolean;
}>`
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.$hasError ? "#d32f2f" : "#ccc")};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: ${(props) => (props.$hasError ? "#d32f2f" : "#58a639")};
  }
`;

export const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 2px;
`;

export const PhoneRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const CountrySelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledSelect = styled.select`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 30px 0 10px; /* Extra right padding for the arrow */
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  min-width: 95px;
  height: 40px; /* Match your input height */
  appearance: none; /* Removes default OS arrow */
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #58a639;
  }
`;

export const SelectArrow = styled.span`
  position: absolute;
  right: 10px;
  pointer-events: none;
  font-size: 12px;
  color: #666;
`;

export const LinkText = styled.a`
  color: #58a639;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
`;
