import { useThemeMode } from "@/hooks";

export function ExperienceSectionLoader() {
  const { isDarkMode } = useThemeMode();

  const cardBg = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  const skeletonBg = isDarkMode
    ? "bg-gray-700"
    : "bg-gray-200";

  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`${skeletonBg} rounded ${className}`} />
  );

  return (
    <div className="animate-pulse min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-64" />
        </div>

        {/* Form Card */}
        <div className={`${cardBg} border rounded-2xl p-6 shadow-sm mb-10`}>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-12 rounded-lg" />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-32 rounded-lg" />
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-40 rounded-lg" />
            </div>

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 mb-3"
              >
                <Skeleton className="flex-1 h-12 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Skeleton className="h-14 w-56 rounded-xl" />
          </div>
        </div>

        {/* Experience List */}
        <div>
          <Skeleton className="h-8 w-56 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`${cardBg} border rounded-2xl p-6`}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-28" />
                  </div>

                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-5" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}