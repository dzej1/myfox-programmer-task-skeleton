import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client/react";
import {
  GetCustomerQuery,
  GetCustomerQueryVariables,
} from "../types/__generated__/graphql";

const GET_CUSTOMER: TypedDocumentNode<
  GetCustomerQuery,
  GetCustomerQueryVariables
> = gql`
  query GetCustomer {
    getCustomer(where: { id: "cm0b8kilabkyu0783rc2uuzax" }) {
      name
      surname
      email
      phone
    }
  }
`;

export const useGetCustomerSuspense = () => {
  return useSuspenseQuery(GET_CUSTOMER);
};
