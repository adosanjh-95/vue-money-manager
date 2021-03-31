import { render, screen } from "@testing-library/vue";
import Month from "@/views/Month.vue";

describe("monthPage", () => {
  it("should render the id passed by the router as a prop", () => {
    const id = "123-456-789";

    render(Month, { props: { id } });

    expect(screen.getByText(`I am month with id: ${id}`)).toBeTruthy();
  });
});
