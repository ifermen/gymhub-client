interface AvatarProps {
  name: string;
  variant: "green" | "yellow" | "red" | "blue" | "cian"
}
export function Avatar({ name, variant }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const variants = {
    green: "text-success-100 bg-success-900",
    yellow: "text-warning-100 bg-warning-900",
    red: "text-danger-100 bg-danger-900",
    blue: "text-primary-100 bg-primary-900",
    cian: "text-accent-100 bg-accent-900"
  }
  return (
    <div className={`
      h-12
      aspect-square
      rounded-xl
      pt-1
      ${variants[variant]}
      flex
      items-center
      justify-center
      font-semibold
      text-lg`}>
      {initials}
    </div>
  );
}