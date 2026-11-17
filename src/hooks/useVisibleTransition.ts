import { RefObject, useEffect, useState } from 'react';

function getTransitionName(transition: string): string[] {
  const [anim, dir] = transition.split(' ');
  return [`${anim}-in-${dir}`, `${anim}-out-${dir}`];
}

export function useVisibleTransition(
  open = false,
  transition = 'slide bottom',
  containerRef: RefObject<HTMLElement | null>,
  onClose?: () => void,
  defaultVisible: boolean = false,
) {
  const [visible, setVisible] = useState(defaultVisible);

  const transAnimsClassName = getTransitionName(transition);
  const className = transAnimsClassName[open ? 0 : 1];

  useEffect(() => {
    if (open) {
      // Visibility must remain mounted while the external open state animates in.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    } else if (!defaultVisible) {
      if (!containerRef.current) return;
      const { animationDuration } = getComputedStyle(containerRef.current);
      const delay = parseFloat(animationDuration) * 1000;
      const timeoutId = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [containerRef, defaultVisible, onClose, open]);

  return {
    visible,
    className,
  };
}
