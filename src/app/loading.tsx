export default function Loading() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-400" />
            <p className="text-sm text-gray-500">Loading ...</p>
        </div>
    )
}
