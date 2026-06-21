import { useThemeMode } from "@/hooks";

export function EditSkillSectionLoader() {
  const { isDarkMode } = useThemeMode();

  const cardBg = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  const skeletonBg = isDarkMode
    ? "bg-gray-700"
    : "bg-gray-200";

  const Skeleton = ({
    className = "",
  }: {
    className?: string;
  }) => (
    <div
      className={`${skeletonBg} rounded ${className}`}
    />
  );

  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <Skeleton className="h-12 w-72 mb-3" />
        </div>

        <Skeleton className="h-14 w-56 rounded-xl" />
      </div>

      {/* Add Category */}
      <div
        className={`${cardBg} border rounded-3xl p-8 mb-8`}
      >
        <Skeleton className="h-10 w-80 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
        </div>
      </div>

      {/* Add Skill */}
      <div
        className={`${cardBg} border rounded-3xl p-8 mb-10`}
      >
        <Skeleton className="h-10 w-72 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
        </div>
      </div>

      {/* Categories Title */}
      <Skeleton className="h-8 w-48 mb-6" />

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={`${cardBg} border rounded-3xl p-6`}
          >
            {/* Top */}
            <div className="flex justify-between mb-6">
              <Skeleton className="w-16 h-16 rounded-full" />

              <div className="flex gap-2">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-10 h-10 rounded-lg" />
              </div>
            </div>

            {/* Category Title */}
            <Skeleton className="h-6 w-32 mx-auto mb-6" />

            {/* Skills */}
            {Array.from({ length: 4 }).map((_, skillIdx) => (
              <div
                key={skillIdx}
                className="mb-5"
              >
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-10" />
                </div>

                <Skeleton className="h-2.5 rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}