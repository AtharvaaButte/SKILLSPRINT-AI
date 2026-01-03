import { Lock } from 'lucide-react';

interface LockedOverlayProps {
  message?: string;
}

export function LockedOverlay({ message = 'Please login to access this feature' }: LockedOverlayProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Lock className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="mt-3 text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
