import Tooltip, { TooltipProps } from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useRef, useState } from "react";

interface TextWithTooltipProps {
  text: React.ReactNode; // Supports strings or JSX content
  tooltip?: React.ReactNode; // Tooltip content (defaults to `text` if not provided)
  maxLength?: number; // Optional: If text is a string, truncates it
  tooltipPlacement?: "top" | "bottom" | "left" | "right"; // Tooltip position
  sx?: object; // Custom styles for the Typography
  tooltipProps?: TooltipProps; // Custom styles for the Tooltip
}

const TextWithTooltip: React.FC<TextWithTooltipProps> = ({
  text,
  tooltip,
  maxLength,
  tooltipPlacement = "top",
  sx,
  tooltipProps,
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Check if text overflows
  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [text]);

  let displayText = text;

  // Handle truncation only if `text` is a string and `maxLength` is defined
  if (typeof text === "string" && maxLength && text.length > maxLength) {
    displayText = `${text.slice(0, maxLength)}...`;
  }

  return (
    <Tooltip
      component="div"
      title={tooltip || text}
      placement={tooltipPlacement}
      open={isOverflowing && isHovered} // Show tooltip only if the text is overflowing and hovered
      arrow
      {...tooltipProps}
    >
      <Typography
        ref={textRef}
        sx={{
          lineHeight: "initial",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...sx, // Allow overriding text styles
        }}
        onMouseEnter={() => setIsHovered(true)} // Tooltip appears on hover
        onMouseLeave={() => setIsHovered(false)} // Tooltip hides when mouse leaves
      >
        {displayText}
      </Typography>
    </Tooltip>
  );
};

export default TextWithTooltip;
