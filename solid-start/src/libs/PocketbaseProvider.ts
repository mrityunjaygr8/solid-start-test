import Client from "pocketbase";
import { createContext, JSX, useContext } from "solid-js";
import { TypedPocketBase } from "../../pocketbase-types";

interface PocketbaseProviderProps {
	url: string;
	children: JSX.Element;
}

export const PocketbaseContext = createContext<TypedPocketBase>();

export const PocketbaseProvider = (props: PocketbaseProviderProps) => {
	if (!props.url) {
		throw new Error("PocketbaseProvider requires a url");
	}

	const client = new Client(props.url) as TypedPocketBase;
	return (
		<PocketbaseContext.Provider value={client}>
			{props.children}
		</PocketbaseContext.Provider>
	);
};

export const usePocketbaseContext = () => {
	const context = useContext(PocketbaseContext);
	if (!context) {
		throw new Error(
			"usePocketbaseContext: cannot find a PocketbaseContext",
		);
	}

	return context;
};
