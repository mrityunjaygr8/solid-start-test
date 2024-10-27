import PocketBase, { AuthModel } from "pocketbase";

const BASE_URL = "http://127.0.0.1:8090";

const pb = new PocketBase(BASE_URL);

export function client() {
  return pb;
}

export function logout() {
  pb.authStore.clear();
}

export function user(): AuthModel {
  return pb.authStore.model;
}

export function isLoggedIn(): boolean {
  return pb.authStore.isValid;
}
