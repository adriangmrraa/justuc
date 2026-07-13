import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to login — the demo experience starts here
  redirect("/login");

  return null;
}
