import { useForm } from "react-hook-form";
import { InfoAlert } from "../../../components/alert";
import { Header } from "../../../components/header";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import {
  Container,
  CountrySelectWrapper,
  ErrorText,
  FormContainer,
  FormGroup,
  Input,
  Label,
  LinkText,
  PhoneRow,
  SelectArrow,
  StyledSelect,
} from "../../../components/form";
import { useUpdateCustomer } from "../hooks/use-update-customer";
import { useGetCustomerSuspense } from "../../../hooks/use-get-customer";
import { Button } from "../../../components/button";
import { useCallback } from "react";
import { UpdateCustomerMutation } from "../../../types/__generated__/graphql";

const countryCodePhoneMatchRegexp = /^(\+(?:420|421|44))(\d+)$/;

const profileSchema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  surname: z.string().min(1, "Příjmení je povinné"),
  email: z.email("Neplatný e-mail"),
  countryCode: z.string(),
  phone: z.string().min(9, "Telefon musí mít alespoň 9 čísel"),
});

type ProfileSchema = z.infer<typeof profileSchema>;

export const PersonalDataForm = () => {
  const { data } = useGetCustomerSuspense();
  const [, countryCode, phone] =
    data.getCustomer?.phone?.match(countryCodePhoneMatchRegexp) ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileSchema>({
    resolver: standardSchemaResolver(profileSchema),
    defaultValues: {
      name: data.getCustomer?.name ?? "",
      surname: data.getCustomer?.surname ?? "",
      email: data.getCustomer?.email ?? "",
      countryCode,
      phone,
    },
  });

  const resetForm = useCallback(
    (data: UpdateCustomerMutation) => {
      const [, countryCode, phone] =
        data.updateCustomer?.phone?.match(countryCodePhoneMatchRegexp) ?? [];
      reset(
        {
          email: data.updateCustomer.email ?? "",
          name: data.updateCustomer.name ?? "",
          surname: data.updateCustomer.surname ?? "",
          countryCode,
          phone,
        },
        { keepValues: true, keepDirty: false },
      );
    },
    [reset],
  );

  const { mutate, loading, error } = useUpdateCustomer({
    onCompleted: resetForm,
  });

  const onSubmit = (data: ProfileSchema) => {
    const combinedPhone = `${data.countryCode}${data.phone.replace(/\s+/g, "")}`;

    const updateCustomerData = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: combinedPhone,
    };

    mutate({
      variables: {
        updateCustomerData,
        updateCustomerWhere: {
          id: "cm0b8kilabkyu0783rc2uuzax",
        },
      },
    });
  };

  return (
    <Container>
      <Header>Osobní údaje</Header>
      <InfoAlert />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Jméno</Label>
          <Input {...register("name")} $hasError={!!errors.name} />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Příjmení</Label>
          <Input {...register("surname")} $hasError={!!errors.surname} />
          {errors.surname && <ErrorText>{errors.surname.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>E-mail</Label>
          <Input
            type="email"
            {...register("email")}
            $hasError={!!errors.email}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Telefon</Label>
          <PhoneRow>
            <CountrySelectWrapper>
              <StyledSelect {...register("countryCode")}>
                <option value="+420">🇨🇿 +420</option>
                <option value="+421">🇸🇰 +421</option>
                <option value="+44">🇬🇧 +44</option>
              </StyledSelect>
              <SelectArrow>▼</SelectArrow>
            </CountrySelectWrapper>
            <Input
              style={{ flex: 1 }}
              {...register("phone")}
              $hasError={!!errors.phone}
            />
          </PhoneRow>
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
        </FormGroup>

        <Button
          $variant="primary"
          type="submit"
          disabled={loading || error !== undefined || !isDirty}
          $fullWidth
        >
          ULOŽIT
        </Button>
        <LinkText>Změnit heslo</LinkText>
      </FormContainer>
    </Container>
  );
}
