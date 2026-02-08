import { gql, type TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client/react";
import {
  CalendarState,
  ListCalendarsQuery,
  ListCalendarsQueryVariables,
} from "../../../types/__generated__/graphql";

const LIST_CALENDARS: TypedDocumentNode<
  ListCalendarsQuery,
  ListCalendarsQueryVariables
> = gql`
  query listCalendars {
    listCalendars(
      where: {
        customers: { some: { id: { equals: "cm0b8kilabkyu0783rc2uuzax" } } }
      }
      orderBy: [{ state: ASC }, { from: ASC }]
    ) {
      id
      state
      from
      shop {
        address {
          city
          street
        }
        phone
        name
      }
      subject {
        alias
        microsite {
          logo {
            id
            secret
          }
        }
      }
      carts {
        name
        item {
          duration
          price
          priceVat
          picture {
            id
            secret
          }
        }
      }
    }
  }
`;

type Calendar = NonNullable<ListCalendarsQuery["listCalendars"]>[number];

const emptyListCalendarsGroupedByState: Record<CalendarState, Calendar[]> = {
  Canceled: [],
  Open: [],
  Paid: [],
  Storno: [],
  Test: [],
};

export const useSuspenseListCalendarGroupedByState = () => {
  const { data, error } = useSuspenseQuery(LIST_CALENDARS);
  if (error) {
    throw error;
  }

  const listCalendarsGroupedByState =
    data.listCalendars?.reduce((calendarsGroupedByState, calendar) => {
      calendarsGroupedByState[calendar.state].push(calendar);

      return calendarsGroupedByState;
    }, structuredClone(emptyListCalendarsGroupedByState)) ??
    emptyListCalendarsGroupedByState;

  return listCalendarsGroupedByState;
};
