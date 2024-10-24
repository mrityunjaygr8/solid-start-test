import {
	Accessor,
	createContext,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";

import { AdminModel, RecordModel } from "pocketbase";
import { JSX } from "solid-js/h/jsx-runtime";
import { usePocketbaseContext } from "./PocketbaseProvider";

interface AuthContextInterface {
	user: Accessor<RecordModel | AdminModel>;
	loginWithPassword: (email: string, password: string) => void;
	logout: () => void;
	error: Accessor<string>;
}

interface AuthProviderProps {
	children: JSX.Element;
}

export const AuthContext = createContext<AuthContextInterface>();

export const AuthProvider = (props: AuthProviderProps) => {
	const client = usePocketbaseContext();

	if (!client) {
		throw new Error(
			"useAuthContext must be used within a <PocketBaseProvider>",
		);
	}

	const [user, setUser] = createSignal(client.authStore.model);
	const [error, setError] = createSignal<string>();

	onMount(() => {
		const authData = sessionStorage.getItem("auth");
		if (authData != null) {
			client.authStore.loadFromCookie(authData);
		}
	});
	createEffect(() => {
		const unsubscribe = client.authStore.onChange((token) => {
			if (token) {
				setUser(client.authStore.model);
				sessionStorage.setItem(
					"auth",
					client.authStore.exportToCookie(),
				);
			} else {
				setUser(null);
				sessionStorage.removeItem("auth");
			}
		});
		onCleanup(() => unsubscribe());
	});

	function loginWithPassword(email: string, password: string) {
		client
			.collection("users")
			.authWithPassword(email, password)
			.catch((err) => {
				console.error("login error: ", err.message);
				setError(err.message);
			});
	}

	function logout() {
		client.authStore.clear();
	}

	return (
		<AuthContext.Provider
			value={{ user, error, loginWithPassword, logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context == undefined) {
		throw new Error("useAuthContext: cannot find a AuthContext");
	}
	return context;
};
