import { Title } from "@solidjs/meta";
import { Navigate } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { useAuthContext } from "~/libs/AuthProvider";

export default function Home() {
	const { user, logout } = useAuthContext();
	if (user() == null || user() == undefined) {
		return <Navigate href={"/login"} />;
	}
	return (
		<main>
			<Title>Hello World</Title>
			<div class="flex flex-col p-4">
				<h1>woo {user().name}</h1>

				<Button onClick={logout}>Logout</Button>
			</div>
		</main>
	);
}
