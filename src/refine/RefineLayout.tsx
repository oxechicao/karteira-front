import { GitHubBanner } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@common/contexts/color-mode";
import { DevtoolsProvider } from "@refine/devtools";
import { RefineComponent } from "@refine/RefineComponent";
import React, { Suspense } from "react";

type RefineLayoutProps = {
  children: React.ReactNode;
  defaultMode?: "light" | "dark";
};
export const RefineLayout: React.FC<RefineLayoutProps> = ({
  defaultMode,
  children,
}) => {
  return (
    <Suspense>
      {/*<GitHubBanner />*/}
      <RefineKbarProvider>
        <AntdRegistry>
          <ColorModeContextProvider defaultMode={defaultMode}>
            <DevtoolsProvider>
              <RefineComponent>{children}</RefineComponent>
            </DevtoolsProvider>
          </ColorModeContextProvider>
        </AntdRegistry>
      </RefineKbarProvider>
    </Suspense>
  );
};
