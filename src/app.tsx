import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import {
  NavigationMenuTrigger,
  NavigationMenu,
  NavigationMenuItem,
} from "~/components/ui/navigation-menu";
import "./app.css";
import { authState } from "~/stores/authStore";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <div class="flex flex-col h-screen">
            <nav class="h-14 px-4 py-2">
              <NavigationMenu>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    as="a"
                    href="/"
                    class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
                  >
                    Index
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    as="a"
                    href="/about"
                    class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
                  >
                    About
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  {authState.token ? (
                    <NavigationMenuTrigger
                      as="a"
                      href="/dashboard"
                      class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
                    >
                      Dashboard
                    </NavigationMenuTrigger>
                  ) : (
                    <NavigationMenuTrigger
                      as="a"
                      href="/login"
                      class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
                    >
                      Login
                    </NavigationMenuTrigger>
                  )}
                </NavigationMenuItem>
              </NavigationMenu>
            </nav>
            <main class="flex-grow overflow-hidden">
              <Suspense>{props.children}</Suspense>
            </main>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
