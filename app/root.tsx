import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "./tailwind.css?url";
import { UserProvider } from "./context/UserContext";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

import { LiveReload } from "@remix-run/react";

export default function App() {
  return (
    <UserProvider>
      <div>
        <Outlet />
        <LiveReload />
      </div>
    </UserProvider>
  );
}
