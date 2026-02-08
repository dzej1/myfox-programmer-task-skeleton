import { Suspense } from "react";
import { LoadingSpinner } from "../../components/loading-spinner";
import { PersonalDataForm } from "./components/personal-data-form";

export default function PersonalDataRoute() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PersonalDataForm />
    </Suspense>
  );
}
