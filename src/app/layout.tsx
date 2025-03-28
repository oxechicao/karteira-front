import { DevtoolsProvider } from "@common/providers/devtools";
import {
  ThemedLayoutContextProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@common/contexts/color-mode";
import { authProviderClient } from "@common/providers/auth-provider/auth-provider.client";
import { dataProvider } from "@common/providers/data-provider";
import "@refinedev/antd/dist/reset.css";
import "@common/styles/global.css";

export const metadata: Metadata = {
  title: "Refine",
  description: "Generated by create refine app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body>
        <Suspense>
          <GitHubBanner />
          <RefineKbarProvider>
            <AntdRegistry>
              <ColorModeContextProvider defaultMode={defaultMode}>
                <DevtoolsProvider>
                  <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    notificationProvider={useNotificationProvider}
                    authProvider={authProviderClient}
                    resources={[
                      {
                        name: "dashboard",
                        list: "/",
                      },
                      {
                        name: "despesas",
                        list: "/despesas",
                        create: "/despesas/create",
                        show: "/despesas/:id",
                        edit: "/despesas/:id/edit",
                      },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "VjxSuJ-TJOjlk-Djbugf",
                    }}
                  >
                    <ThemedLayoutContextProvider>
                      <ThemedLayoutV2>{children}</ThemedLayoutV2>
                    </ThemedLayoutContextProvider>
                    <RefineKbar />
                  </Refine>
                </DevtoolsProvider>
              </ColorModeContextProvider>
            </AntdRegistry>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
