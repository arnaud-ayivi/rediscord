// src/app/(servers)/layout.tsx
import { Suspense } from "react";
import ServerLayoutSkeleton from "@/components/islets/server-layout/server-layout-skeleton";
import ServerLayout from "@/components/islets/server-layout";

export const revalidate = 0;

export default function SuspendedServerLayout({
                                                  children,
                                              }: React.PropsWithChildren) {
    return (
        <Suspense fallback={<ServerLayoutSkeleton>{children}</ServerLayoutSkeleton>}>
            <ServerLayout>{children}</ServerLayout>
        </Suspense>
    );
}