import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";


import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Belsystem",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: () => <div className="text-center w-full">- Data Not Found -</div>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={theme}>
        <Card className="m-2">
          <CardHeader>
            <CardTitle>
              {" "}
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={100}
                  className={theme === "dark" ? "invert" : ""}
                />
              </Link>
            </CardTitle>
            <CardAction>
              <div
                className="cursor-pointer rounded"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? "🌙" : "🌞"}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        <Scripts />
      </body>
    </html>
  );
}