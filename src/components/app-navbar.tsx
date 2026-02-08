import { styled } from "styled-components";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router";
import { useGetCustomerSuspense } from "../hooks/use-get-customer";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LoadingSpinner } from "./loading-spinner";
import { Suspense } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 4px solid #17a619;
  color: black;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuContent = styled.div`
  @media (max-width: 768px) {
    background: white;
    min-width: 250px;
    box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
`;

const UserSection = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const UserEmail = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: block;
  &:hover {
    background: #f5f5f5;
    outline: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 6px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
`;

const DesktopNav = styled.div`
  display: none;
  gap: 2rem;
  align-items: center;
  @media (min-width: 769px) {
    display: flex;
  }
`;

const DesktopNavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    opacity: 0.7;
  }
`;

export const AppNavbar = () => {
  return (
    <Nav>
      <LogoContainer>
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzkuOTk5IiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMTM5Ljk5OSAzNiI+PGcgaWQ9Ikdyb3VwXzMiIGRhdGEtbmFtZT0iR3JvdXAgMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ3OSAtMjIyKSI+PHBhdGggaWQ9IlBhdGhfMSIgZGF0YS1uYW1lPSJQYXRoIDEiIGQ9Ik0zNzAuMjEyLDM4Mi4xNDZoLjE0NnYyMC40NDZoLTUuNnYtOS4zbC00LjU3OSwzLjczNC00LjYwOC0zLjczNHY5LjNIMzUwVjM4Mi4xNDZoLjExN2wxMC4wNjIsOC4yODNabTExLjU3OSw3LjIzMywzLjY0Ni02Ljk3MWg2LjY1bC03LjM1LDEyLjU0MnY3LjY0MWgtNS44OTJ2LTcuNjQxbC03LjM1LTEyLjU0Mmg2LjY1Wm0yNC4zLTYuOTcxdjQuOTI5aC02Ljk0MnYzaDUuODYydjQuNzgzaC01Ljg2MnY3LjQ2N2gtNS44MzNWMzgyLjQwOFpNNDE4LjY1OCwzODJhMTEuNjcxLDExLjY3MSwwLDAsMSw1LjYyOSwxLjQyOSwxMC40MjQsMTAuNDI0LDAsMCwxLDMuNzkyLDMuNzkyLDEwLjksMTAuOSwwLDAsMSwwLDEwLjU4Nyw5LjkyNSw5LjkyNSwwLDAsMS0zLjc5MiwzLjc2MywxMS43NDMsMTEuNzQzLDAsMCwxLTExLjIyOSwwLDkuOTg3LDkuOTg3LDAsMCwxLTMuNzYyLTMuNzYzLDEwLjkwNiwxMC45MDYsMCwwLDEsMC0xMC41ODcsMTAuNSwxMC41LDAsMCwxLDMuNzYyLTMuNzkyQTExLjYxNCwxMS42MTQsMCwwLDEsNDE4LjY1OCwzODJabTAsNS4zMzdhNC44LDQuOCwwLDAsMC0yLjU2Ny43MjksNS4wNjIsNS4wNjIsMCwwLDAtMS42OTIsMS45MjUsNS4zMjIsNS4zMjIsMCwwLDAtLjYxMiwyLjUwOCw1LjM4MSw1LjM4MSwwLDAsMCwuNjEyLDIuNTM3LDUuMTMsNS4xMywwLDAsMCwxLjY5MiwxLjksNC40NzcsNC40NzcsMCwwLDAsMi41NjcuNzI5LDQuNjE1LDQuNjE1LDAsMCwwLDIuNi0uNzI5LDUuMTM2LDUuMTM2LDAsMCwwLDEuNjkyLTEuOSw1LjU5LDUuNTksMCwwLDAsLjU4My0yLjUzNyw1LjUyOCw1LjUyOCwwLDAsMC0uNTgzLTIuNTA4LDUuMDY3LDUuMDY3LDAsMCwwLTEuNjkyLTEuOTI1QTQuOTQ4LDQuOTQ4LDAsMCwwLDQxOC42NTgsMzg3LjMzN1ptMjAuMjcxLjYxMiwzLjY3NC01LjU0Mmg2LjUzM2wtNy4xMTcsMTAuMDMzLDcuMTQ2LDEwLjE1aC02LjUzM2wtMy43LTUuNTctMy42NzYsNS41N0g0MjguNzJsNy4xNDYtMTAuMTUtNy4xMTctMTAuMDMzaDYuNTM0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTY5LjgzMyAtMTUzKSIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+PGcgaWQ9Ikdyb3VwXzEiIGRhdGEtbmFtZT0iR3JvdXAgMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDc5IDIyMikiPjxwYXRoIGlkPSJQYXRoXzIiIGRhdGEtbmFtZT0iUGF0aCAyIiBkPSJNMjk1LDM4Mi42NzYsMjgwLDM3MHYxNC45MzRxLjA3NSw1LjYyOSwyLjY1NSw4LjMyOUwyOTUsNDA2bDEyLjM0NS0xMi43MzdxMi41OC0yLjcsMi42NTUtOC4zMjlWMzcwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4MCAtMzcwKSIgZmlsbD0iI2Y3NDYxNCIgZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+PHBhdGggaWQ9IlBhdGhfMyIgZGF0YS1uYW1lPSJQYXRoIDMiIGQ9Ik0zMDEuMzc4LDM5MS4xMjdxNy43NCw2LjgzNCw0LjQ1NSwxMy44MzVsLTQuNDU1LDkuNDg4LTQuNDU1LTkuNDg4UTI5My42MzgsMzk3Ljk2MSwzMDEuMzc4LDM5MS4xMjdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjg2LjM3OCAtMzc4LjQ1MSkiIGZpbGw9IiNmNzQ2MTQiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjxwYXRoIGlkPSJQYXRoXzQiIGRhdGEtbmFtZT0iUGF0aCA0IiBkPSJNMjk1LDM4Mi42NzZxLTcuNzQsNi44MzQtNC40NTUsMTMuODM1TDI5NSw0MDZsLTEyLjM0NS0xMi43MzdxLTIuNTgtMi43LTIuNjU1LTguMzI5VjM3MFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yODAgLTM3MCkiIGZpbGw9IiNmYzY2MWIiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjxwYXRoIGlkPSJQYXRoXzUiIGRhdGEtbmFtZT0iUGF0aCA1IiBkPSJNMzA1LDQwNmw0LjQ1NS05LjQ4OHEzLjI4NS03LTQuNDU1LTEzLjgzNUwzMjAsMzcwdjE0LjkzNHEtLjA3Niw1LjYyOS0yLjY1NSw4LjMyOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yOTAgLTM3MCkiIGZpbGw9IiNlNzM2MDQiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
          alt="logo"
        />
        <LogoText>REZERVAČNÍ SYSTÉM</LogoText>
      </LogoContainer>
      <Suspense fallback={<LoadingSpinner />}>
        <NavItems />
      </Suspense>
    </Nav>
  );
};

const NavItems = () => {
  const { data } = useGetCustomerSuspense();

  const items = [
    { title: "Moje rezervace", href: "/my-reservations" },
    { title: "Osobní údaje", href: "/personal-data" },
    { title: "Odhlásit", href: "#" },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MenuButton>
          <MenuIcon />
        </MenuButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content asChild>
          <MenuContent>
            <UserSection>
              <Avatar>
                {data.getCustomer?.name?.[0]}
                {data.getCustomer?.surname?.[0]}
              </Avatar>
              <UserInfo>
                <UserName>
                  {data.getCustomer?.name} {data.getCustomer?.surname}
                </UserName>
                <UserEmail>{data.getCustomer?.email}</UserEmail>
              </UserInfo>
            </UserSection>
            {items.map((item) => (
              <DropdownMenu.Item key={item.title} asChild>
                <MenuItem to={item.href}>{item.title}</MenuItem>
              </DropdownMenu.Item>
            ))}
          </MenuContent>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
      <DesktopNav>
        {items.map((item) => (
          <DesktopNavLink key={item.title} to={item.href}>
            {item.title}
          </DesktopNavLink>
        ))}
      </DesktopNav>
    </DropdownMenu.Root>
  );
};
