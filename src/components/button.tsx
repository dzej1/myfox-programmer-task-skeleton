import styled, { css } from "styled-components";

const variants = {
  default: {
    bg: "#ccc",
    hover: "#bbb",
    active: "#aaa",
    color: "black",
  },
  primary: {
    bg: "#00A800",
    hover: "#008700",
    active: "#006600",
    color: "white",
  },
} as const;

type Variant = keyof typeof variants;

type ButtonStyleProps = {
  $variant?: Variant;
  $fullWidth?: boolean;
};

const buttonStyles = css<ButtonStyleProps>`
  ${(props) =>
    props.$fullWidth &&
    css`
      width: 250px;
      @media (max-width: 768px) {
        width: 100%;
      }
    `}
  background: ${(props) => variants[props.$variant || "default"].bg};
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 16px;
  color: ${(props) => variants[props.$variant || "default"].color};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => variants[props.$variant || "default"].hover};
  }

  &:active {
    background: ${(props) => variants[props.$variant || "default"].active};
  }

  &:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;

export const Button = styled.button<ButtonStyleProps>`
  ${buttonStyles}
`;

export const LinkButton = styled.a<ButtonStyleProps>`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  ${buttonStyles}
`;
