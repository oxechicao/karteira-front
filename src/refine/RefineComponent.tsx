import routerProvider from "@refinedev/nextjs-router";
import { dataProvider } from "@refine/data-provider";
import {
  ThemedLayoutContextProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { authProviderClient } from "@refine/auth-provider/auth-provider.client";
import { Sider } from "@refine/layout/Sider";
import { RefineKbar } from "@refinedev/kbar";
import { Refine } from "@refinedev/core";
import React from "react";
import { resourcesRefine } from "@refine/resources.refine";

type RefineLayoutProps = {
  children: React.ReactNode;
};

export const RefineComponent: React.FC<RefineLayoutProps> = ({ children }) => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProviderClient}
      resources={resourcesRefine}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: "VjxSuJ-TJOjlk-Djbugf",
      }}
    >
      <ThemedLayoutContextProvider>
        <ThemedLayoutV2 Sider={Sider}>{children}</ThemedLayoutV2>
      </ThemedLayoutContextProvider>
      <RefineKbar />
    </Refine>
  );
};
