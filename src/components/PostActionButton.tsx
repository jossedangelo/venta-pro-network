
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
  const baseClass =
    // Siempre fondo transparente, solo borde si outline
    "inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors " +
    (variant === "outline"
      ? "border border-blue-400 text-blue-700 bg-transparent hover:bg-blue-50"
      : "bg-transparent");

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
