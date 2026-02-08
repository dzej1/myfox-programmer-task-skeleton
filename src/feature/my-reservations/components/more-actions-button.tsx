import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Link } from "react-router";
import { styled } from "styled-components";
import { Button } from "../../../components/button";
export const MoreActionsButton = ({ alias }: { alias?: string }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button>...</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <Content sideOffset={10} align="end">
          {alias !== undefined && (
            <Item
              as={Link}
              to={`https://${alias}.snippet-test.myfox.cz/form/show`}
              onSelect={() => console.log("create")}
            >
              Vytvořit další rezervaci
            </Item>
          )}
          <Item onSelect={() => console.log("calendar")}>
            Přidat do kalendáře
          </Item>
          <Item onSelect={() => console.log("contacts")}>
            Přidat do kontaktů
          </Item>
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const Content = styled(DropdownMenu.Content)`
  background: #ffffff;
  border-radius: 12px;

  box-shadow:
    0 0 16px 0 rgba(107, 114, 128, 0.45),
    0 0 0 rgba(0, 0, 0, 0.14);
`;

const Item = styled(DropdownMenu.Item)`
  all: unset;
  box-sizing: border-box;

  width: 100%;
  display: flex;
  align-items: center;

  padding: 16px 20px;

  color: #3a3a3a;

  cursor: pointer;
  user-select: none;

  &[data-highlighted] {
    color: #111;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
