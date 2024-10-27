import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { user as getPBUser } from "@/lib/pocketbase";

export const Route = createFileRoute("/_authenticated/")({
  component: HomeComponent,
});

function HomeComponent() {
  const user = getPBUser();
  return (
    <div className="p-2">
      <h3>Welcome Home! {user?.email}</h3>
    </div>
  );
}
