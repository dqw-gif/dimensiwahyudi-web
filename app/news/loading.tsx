export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="text-center mb-20 space-y-4 animate-pulse">
                <div className="h-6 w-48 bg-slate-200 rounded-full mx-auto"></div>
                <div className="h-16 w-96 bg-slate-200 rounded-2xl mx-auto"></div>
                <div className="h-5 w-72 bg-slate-100 rounded-full mx-auto"></div>
            </div>

            {/* Filter Tabs Skeleton */}
            <div className="flex gap-2 mb-16 justify-center">
                {[80, 60, 80, 100].map((w, i) => (
                    <div key={i} className={`h-10 w-${w === 60 ? '16' : w === 80 ? '20' : '24'} bg-slate-200 rounded-full animate-pulse`}
                        style={{ width: `${w}px` }}
                    ></div>
                ))}
            </div>

            {/* Posts Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Featured Post Skeleton */}
                <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden animate-pulse flex flex-col md:flex-row min-h-[480px]">
                    <div className="w-full md:w-1/2 bg-slate-200"></div>
                    <div className="w-full md:w-1/2 p-10 space-y-5 flex flex-col justify-center">
                        <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
                        <div className="h-10 w-full bg-slate-200 rounded-xl"></div>
                        <div className="h-10 w-3/4 bg-slate-200 rounded-xl"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-100 rounded-full"></div>
                            <div className="h-4 bg-slate-100 rounded-full"></div>
                            <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="h-12 w-40 bg-slate-200 rounded-full mt-4"></div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {[1, 2].map(i => (
                        <div key={i} className="flex-1 bg-white rounded-[2rem] p-6 border border-slate-100 animate-pulse space-y-4">
                            <div className="h-3 w-20 bg-slate-200 rounded-full"></div>
                            <div className="h-6 w-full bg-slate-200 rounded-lg"></div>
                            <div className="h-6 w-4/5 bg-slate-200 rounded-lg"></div>
                            <div className="h-4 w-full bg-slate-100 rounded-full"></div>
                            <div className="h-4 w-16 bg-slate-200 rounded-full mt-auto"></div>
                        </div>
                    ))}
                </div>

                {/* Grid Cards Skeleton */}
                {[1, 2, 3].map(i => (
                    <div key={i} className="col-span-1 md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] overflow-hidden border border-slate-100 animate-pulse">
                        <div className="h-56 bg-slate-200"></div>
                        <div className="p-8 space-y-4">
                            <div className="h-3 w-24 bg-slate-200 rounded-full"></div>
                            <div className="h-6 w-full bg-slate-200 rounded-lg"></div>
                            <div className="h-4 bg-slate-100 rounded-full"></div>
                            <div className="h-4 w-2/3 bg-slate-100 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
