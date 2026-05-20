type Level = 0 | 1 | 2 | 3;

function getLevel(password: string): Level {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  return score as Level;
}

const CONFIG: Record<Exclude<Level, 0>, { label: string; barColor: string; textColor: string }> = {
  1: { label: 'Schwach', barColor: 'bg-danger', textColor: 'text-danger' },
  2: { label: 'Mittel', barColor: 'bg-warning', textColor: 'text-warning' },
  3: { label: 'Stark', barColor: 'bg-success', textColor: 'text-success' },
};

export function PasswordStrength({ password }: { password: string }) {
  const level = getLevel(password);
  if (!password) return null;

  const config = level > 0 ? CONFIG[level as Exclude<Level, 0>] : null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {([1, 2, 3] as const).map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              level >= i && config ? config.barColor : 'bg-border'
            }`}
          />
        ))}
      </div>
      {config && (
        <p className={`text-xs font-medium ${config.textColor}`}>{config.label}</p>
      )}
    </div>
  );
}
