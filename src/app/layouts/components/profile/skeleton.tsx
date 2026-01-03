export default function ProfileSkeleton() {
  return (
    <div data-testid="profile-skeleton">
      <div className="flex items-center gap-2">
        <div className="w-10 aspect-square rounded-full bg-multi-neutral-100 animate-pulse" />
        <div className="w-28 h-5 rounded bg-multi-neutral-100 animate-pulse" />
      </div>
    </div>
  );
}
