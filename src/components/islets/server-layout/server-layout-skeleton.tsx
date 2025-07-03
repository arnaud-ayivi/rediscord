import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import TextSkeleton from "@/components/ui/text/text-skeleton";

export default function ServerLayoutSkeleton({
                                                 children,
                                             }: React.PropsWithChildren) {
    return (
        <>
            <Sidebar className="bottom-0 flex flex-col">
                <Header verticalPadding="2" className="bg-midground border-b border-gray-800">
                    <div className="flex items-center gap-3 animate-pulse">
                        <div className="h-8 w-8 rounded-full bg-gray-700/50" />
                        <TextSkeleton length={12} />
                    </div>
                </Header>

                <div className="hover-scrollbar flex-1 overflow-y-auto py-2">
                    <div className="space-y-1 px-2">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2 px-2 py-1.5 animate-pulse">
                                <div className="h-4 w-4 rounded bg-gray-700/50" />
                                <TextSkeleton length={i % 2 ? 12 : 8} />
                            </div>
                        ))}
                    </div>
                </div>
            </Sidebar>
            {children}
        </>
    );
}