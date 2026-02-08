import { useSuspenseListCalendarGroupedByState } from "../hooks/use-list-calendar-grouped-by-state";
import { Header } from "../../../components/header";
import {
  AddressText,
  AppointmentDateTime,
  AppointmentDetails,
  AppointmentTitle,
  ButtonContainer,
  Card,
  InfoContainer,
  LogoContainer,
  SalonName,
} from "./card";
import { styled } from "styled-components";
import { ResolvedImage } from "../../../components/resolved-img";
import { Button, LinkButton } from "../../../components/button";
import { MoreActionsButton } from "./more-actions-button";

export const ReservationList = () => {
  const { Open: openReservations, Paid: paidReservations } =
    useSuspenseListCalendarGroupedByState();

  return (
    <ReservationListWrapper>
      <Header>Moje rezervace</Header>
      <ReservationListItemsWrapper>
        {openReservations.map((calendar) => (
          <Card key={calendar.id}>
            <LogoContainer>
              <ResolvedImage
                secret={
                  calendar.carts[0].item?.picture?.secret ??
                  calendar.subject?.microsite?.logo?.secret
                }
                fallback={() => null}
              />
            </LogoContainer>

            <InfoContainer>
              <SalonName>{calendar.shop?.name}</SalonName>
              <AddressText>{calendar.shop?.address?.street}</AddressText>
              <AddressText>{calendar.shop?.phone}</AddressText>

              <AppointmentTitle>{calendar.carts[0]?.name}</AppointmentTitle>
              <AppointmentDateTime>
                {calendar.from !== null &&
                  Intl.DateTimeFormat("cs", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }).format(new Date(calendar.from))}
              </AppointmentDateTime>
              <AppointmentDetails>
                {calendar.carts[0]?.item?.duration} minut,{" "}
                {calendar.carts[0]?.item?.priceVat} Kč
              </AppointmentDetails>
              <ButtonContainer>
                <LinkButton
                  href={`https://mapy.cz/zakladni?q=${encodeURIComponent(calendar.shop?.address?.street + " " + calendar.shop?.address?.city)}`}
                  target="_blank"
                >
                  Trasa
                </LinkButton>
                <LinkButton href={`tel:${calendar.shop?.phone}`}>
                  Zavolat
                </LinkButton>
                <MoreActionsButton alias={calendar.subject?.alias} />
              </ButtonContainer>
            </InfoContainer>
          </Card>
        ))}
      </ReservationListItemsWrapper>

      <Header>Objednejte se znovu</Header>
      <ReservationListItemsWrapper>
        {paidReservations.map((calendar) => (
          <Card key={calendar.id}>
            <LogoContainer>
              <ResolvedImage
                secret={
                  calendar.carts[0]?.item?.picture?.secret ??
                  calendar.subject?.microsite?.logo?.secret
                }
                fallback={() => null}
              />
            </LogoContainer>

            <InfoContainer>
              <SalonName>{calendar.shop?.name}</SalonName>
              <AddressText>{calendar.shop?.address?.street}</AddressText>
              <AddressText>{calendar.shop?.phone}</AddressText>

              <AppointmentTitle>{calendar.carts[0]?.name}</AppointmentTitle>
              <AppointmentDateTime>
                {calendar.from !== null &&
                  Intl.DateTimeFormat("cs", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }).format(new Date(calendar.from))}
              </AppointmentDateTime>
              <AppointmentDetails>
                {calendar.carts[0]?.item?.duration} minut,{" "}
                {calendar.carts[0]?.item?.priceVat} Kč
              </AppointmentDetails>
              <ButtonContainer>
                <Button $variant="primary">Rezervovat</Button>
              </ButtonContainer>
            </InfoContainer>
          </Card>
        ))}
      </ReservationListItemsWrapper>
    </ReservationListWrapper>
  );
};

const ReservationListWrapper = styled.div`
  padding: 1rem;
  max-width: 100%;

  @media (min-width: 768px) {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const ReservationListItemsWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;
