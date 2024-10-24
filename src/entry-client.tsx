// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { AuthProvider } from "./libs/AuthProvider";
import { PocketbaseProvider } from "./libs/PocketbaseProvider";

mount(
	() => (
		<PocketbaseProvider url="http://localhost:8090">
			<AuthProvider>
				<StartClient />
			</AuthProvider>
		</PocketbaseProvider>
	),
	document.getElementById("app")!,
);
