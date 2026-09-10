import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <PreviewHostBridge />
      <Shell>
        <Outlet />
      </Shell>
    </AuthProvider>
  ),
});
