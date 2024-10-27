import { Title } from "@solidjs/meta";
import { Navigate, useNavigate } from "@solidjs/router";
import { Button } from "~/components/ui/button.tsx";
import { useAuthContext } from "~/libs/AuthProvider.ts";

export default function Home() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  if (user() === null || user() === undefined) {
    return <Navigate href={"/login"} />;
  }

  const logoutUser = () => {
    logout();
    navigate("/login");
  };
  return (
    <main>
      <Title>Hello World</Title>
      <div class="flex flex-col p-4">
        <h1>woo {user()?.name}</h1>

        <Button onClick={logoutUser}>Logout</Button>
      </div>
    </main>
  );
}
