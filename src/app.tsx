import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Show, Suspense } from "solid-js";
import {
  NavigationMenuTrigger,
  NavigationMenu,
  NavigationMenuItem,
} from "~/components/ui/navigation-menu";
import "./app.css";
import { useAuthContext } from "./libs/AuthProvider";

const AuthenticatedNavigation = () => (
  <>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Home
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/formitemtype"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Form Item Types
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/formitemquestion"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Form Item Questions
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/formtemplate"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Form Templates
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/campaigns"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Campaigns
      </NavigationMenuTrigger>
    </NavigationMenuItem>
  </>
);

const UnauthenticatedNavigation = () => (
  <>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/login"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Log In
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/signup"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Sign Up
      </NavigationMenuTrigger>
    </NavigationMenuItem>
  </>
);

export default function App() {
  const { user } = useAuthContext();
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <div class="flex flex-col h-screen">
            <nav class="h-14 px-4 py-2">
              <NavigationMenu>
                <Show
                  when={user() != null || user() != undefined}
                  fallback={<UnauthenticatedNavigation />}
                >
                  <AuthenticatedNavigation />
                </Show>
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
