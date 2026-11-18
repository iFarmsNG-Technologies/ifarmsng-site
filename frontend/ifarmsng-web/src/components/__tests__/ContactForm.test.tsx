import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm, { SUCCESS_MESSAGE } from "../ContactForm";

const json = (status: number, body: unknown = {}) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }));

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Ada Obi");
  await user.type(screen.getByLabelText(/email address/i), "ada@example.com");
  await user.selectOptions(screen.getByLabelText(/inquiry type/i), "commodity");
  await user.type(screen.getByLabelText(/subject/i), "Rice supply");
  await user.type(screen.getByLabelText(/^message/i), "We would like regular rice supply.");
  await user.click(screen.getByRole("checkbox"));
  await user.click(screen.getByRole("button", { name: /send inquiry/i }));
}

describe("ContactForm", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("posts JSON in the shape the Rust API expects, then shows the confirmation", async () => {
    fetchMock.mockReturnValueOnce(json(200));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSubmit(user);

    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/inquiries");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      full_name: "Ada Obi",
      email: "ada@example.com",
      inquiry_type: "commodity",
      subject: "Rice supply",
      consent: "on",
      website: "",
    });
    expect(body.submission_id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("shows server validation errors next to the fields and marks them invalid", async () => {
    fetchMock.mockReturnValueOnce(json(422, { errors: { email: "Please enter a valid email address." } }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSubmit(user);

    const msg = await screen.findByText("Please enter a valid email address.");
    expect(msg).toBeInTheDocument();
    const email = screen.getByLabelText(/email address/i);
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby", "email-error");
    await waitFor(() => expect(email).toHaveFocus());
    expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument();
  });

  it("reuses the same submission id when retrying after a failure (no duplicates)", async () => {
    fetchMock.mockReturnValueOnce(json(500)).mockReturnValueOnce(json(200));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSubmit(user);
    expect(await screen.findByRole("alert")).toHaveTextContent(/Nothing was sent/i);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));
    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    const ids = fetchMock.mock.calls.map((c) => JSON.parse(c[1].body).submission_id);
    expect(ids[0]).toBe(ids[1]);
  });

  it("explains rate limiting and network failures without claiming success", async () => {
    fetchMock.mockReturnValueOnce(json(429)).mockRejectedValueOnce(new TypeError("offline"));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSubmit(user);
    expect(await screen.findByRole("alert")).toHaveTextContent(/wait a few minutes/i);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(/could not reach the server/i));
    expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument();
  });

  it("disables the button while sending to prevent double submits", async () => {
    let resolve!: (r: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise<Response>((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSubmit(user);
    expect(await screen.findByRole("button", { name: /sending/i })).toBeDisabled();
    resolve(new Response("{}", { status: 200 }));
    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("keeps the honeypot hidden from assistive tech", () => {
    const { container } = render(<ContactForm />);
    const trap = container.querySelector('input[name="website"]')!;
    expect(trap.closest("label")).toHaveAttribute("aria-hidden", "true");
    expect(trap).toHaveAttribute("tabindex", "-1");
  });
});
