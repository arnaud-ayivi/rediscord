import {
    Page,
    PageContent,
    PageHeaderSkeleton,
} from "@/components/layout/page";
import TextSkeleton from "@/components/ui/text/text-skeleton";

export default function ServerChannelSkeleton() {
    return (
        <Page>
            <PageHeaderSkeleton gap="4" boxSkeletonType="icon" />
            <PageContent>
                <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-700/50 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <TextSkeleton length={12} />
                                <TextSkeleton length={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </PageContent>
        </Page>
    );
}