import { UserReservations } from "@/components/user/UserReservations";
import { render, screen } from "@testing-library/react";

test("Display reservations and 'purchase more button when reservations exist", async () => {
  render(<UserReservations userId={1} />);

  const purchaseMoreButton = await screen.findByRole("button", { name: /purchase more tickets/i });
  expect(purchaseMoreButton).toBeInTheDocument();
});

test("Display no reservations and 'purchase' button when no reservation exist", async () => {
  render(<UserReservations userId={0} />);
  
  const purchaseButton = await screen.findByRole("button", { name: /purchase tickets/i });
  expect(purchaseButton).toBeInTheDocument();

  const ticketsHeading = screen.queryByRole("heading", { name: /your tickets/i });
  expect(ticketsHeading).not.toBeInTheDocument();
});