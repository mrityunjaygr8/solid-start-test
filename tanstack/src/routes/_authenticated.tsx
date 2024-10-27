import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";

export const Route = createFileRoute("/_authenticated")({
  component: () => (
    <>
      <div className="flex justify-between p-4">
        <div>
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{" "}
          <Link
            to="/about"
            activeProps={{
              className: "font-bold",
            }}
          >
            About
          </Link>{" "}
        </div>
        <ModeToggle />
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
