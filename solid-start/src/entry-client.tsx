// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { AuthProvider } from "~/libs/AuthProvider.ts";
import { PocketbaseProvider } from "~/libs/PocketbaseProvider.ts";
import { PB_SERVER } from "~/libs/pb.ts";

mount(
  () => (
    <PocketbaseProvider url={PB_SERVER}>
      <AuthProvider>
        <StartClient />
      </AuthProvider>
    </PocketbaseProvider>
  ),
  document.getElementById("app")!,
);
