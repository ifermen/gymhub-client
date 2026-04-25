export function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center font-semibold text-lg">
      {initials}
    </div>
  );
}