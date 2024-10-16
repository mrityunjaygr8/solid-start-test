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

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <div class="flex flex-col">
            <NavigationMenu class="p-4">
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
            </NavigationMenu>
          </div>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
