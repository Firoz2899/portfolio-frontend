import { useThemeMode } from "@/hooks";

export function AboutSectionLoader() {
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
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-10">
        <Skeleton className="h-10 w-72 mb-3" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Personal Information */}
      <div className={`${cardBg} border rounded-2xl overflow-hidden mb-6`}>
        <div className={`h-16 border-b flex items-center px-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <Skeleton className="w-10 h-10 mr-3" />
          <Skeleton className="h-6 w-56" />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className={`${cardBg} border rounded-2xl overflow-hidden mb-6`}>
        <div className={`h-16 border-b flex items-center px-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <Skeleton className="w-10 h-10 mr-3" />
          <Skeleton className="h-6 w-56" />
        </div>

        <div className="p-6 space-y-5">
          <Skeleton className="h-12 rounded-xl" />
          <Skeleton className="h-12 rounded-xl" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-12 rounded-xl" />
            ))}
          </div>

          <Skeleton className="h-12 rounded-xl" />
        </div>
      </div>

      {/* Interests + Languages */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {Array.from({ length: 2 }).map((_, card) => (
          <div
            key={card}
            className={`${cardBg} border rounded-2xl overflow-hidden`}
          >
            <div className={`h-16 border-b flex items-center px-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
              <Skeleton className="w-10 h-10 mr-3" />
              <Skeleton className="h-6 w-40" />
            </div>

            <div className="p-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-12 rounded-xl mb-3"
                />
              ))}

              <div className={`mt-6 pt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <Skeleton className="h-5 w-32 mb-4" />

                <Skeleton className="h-12 rounded-xl mb-3" />

                <div className="flex gap-3">
                  <Skeleton className="flex-1 h-12 rounded-xl" />
                  <Skeleton className="w-14 h-12 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Journey */}
      <div className={`${cardBg} border rounded-2xl overflow-hidden mb-8`}>
        <div className={`h-16 border-b flex items-center px-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <Skeleton className="w-10 h-10 mr-3" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="p-6">
          <Skeleton className="h-[320px] rounded-xl" />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Skeleton className="h-14 w-56 rounded-xl" />
      </div>
    </div>
  );
}