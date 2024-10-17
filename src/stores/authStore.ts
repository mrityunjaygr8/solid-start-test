import { createStore } from "solid-js/store";

interface AuthState {
  token: string | null;
  userId: string | null;
}

const [authState, setAuthState] = createStore<AuthState>({
  token: null,
  userId: null,
});

export { authState, setAuthState };