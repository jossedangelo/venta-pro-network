
import React from "react";

interface PostActionButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
  variant?: "ghost" | "outline";
}

const PostActionButton: React.FC<PostActionButtonProps> = ({
  icon,
  label,
  count = 0,
  selected = false,
  onClick,
  variant = "ghost",
}) => {
  // Elegimos el color del texto o del icono dependiendo del estado
  const baseClass =
    "inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors " +
    (variant === "outline"
      ? "border border-blue-400 text-blue-700 bg-transparent hover:bg-blue-50"
      : "bg-transparent hover:bg-accent hover:text-accent-foreground");

  const textClass = selected ? "text-blue-600" : "text-neutral-700";

  return (
    <button className={baseClass} onClick={onClick} type="button">
      <span className={textClass}>{icon}</span>
      <span className={textClass}>{label}</span>
      <span className={textClass}>{count}</span>
    </button>
  );
};

export default PostActionButton;
