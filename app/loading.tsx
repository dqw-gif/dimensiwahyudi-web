export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Animated Logo/Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                </div>
                <div className="space-y-2 text-center">
                    <div className="h-4 w-40 bg-slate-200 rounded-full animate-pulse mx-auto"></div>
                    <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse mx-auto"></div>
                </div>
            </div>
        </div>
    );
}
