import { Suspense } from "react";
import { LoadingSpinner } from "../../components/loading-spinner";
import { ReservationList } from "./components/reservation-list";

export default function MyReservationsRoute() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReservationList />
    </Suspense>
  );
}
