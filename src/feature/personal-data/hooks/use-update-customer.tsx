import { gql, TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from "../../../types/__generated__/graphql";

const UPDATE_CUSTOMER: TypedDocumentNode<
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables
> = gql`
  mutation UpdateCustomer(
    $updateCustomerData: CustomerUpdateInput!
    $updateCustomerWhere: CustomerExtendedWhereUniqueInput!
  ) {
    updateCustomer(data: $updateCustomerData, where: $updateCustomerWhere) {
      email
      id
      name
      phone
      surname
    }
  }
`;

export const useUpdateCustomer = (
  options: useMutation.Options<
    UpdateCustomerMutation,
    UpdateCustomerMutationVariables
  >,
) => {
  const [mutate, { data, loading, error }] = useMutation(
    UPDATE_CUSTOMER,
    options,
  );
  return { mutate, data, loading, error };
};
