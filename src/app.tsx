import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Show, Suspense } from "solid-js";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu.tsx";
import "~/app.css";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { Toaster } from "~/components/ui/sonner.tsx";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { ToggleButton } from "~/components/ui/toggle.tsx";
import { Button } from "~/components/ui/button.tsx";

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
        href="/itemtypes"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Item Types
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/questions"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Questions
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/templates"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Templates
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
    <NavigationMenuItem>
      <NavigationMenuTrigger
        as="a"
        href="/submissions"
        class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
      >
        Submissions
      </NavigationMenuTrigger>
    </NavigationMenuItem>
    <></>
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
          <Suspense>
            <ColorModeScript />
            <ColorModeProvider>
              <div class="flex flex-col h-screen">
                <nav class="h-14 p-4">
                  <NavigationMenu class="w-full justify-between">
                    <Show
                      when={user() != null || user() != undefined}
                      fallback={<UnauthenticatedNavigation />}
                    >
                      <div class="flex">
                        <AuthenticatedNavigation />
                      </div>
                      <Button>{user().email}</Button>
                    </Show>
                  </NavigationMenu>
                </nav>
                <main class="flex-grow overflow-hidden">
                  {props.children}
                  <Toaster closeButton richColors />
                </main>
              </div>
            </ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
