import React from "react";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  style,
  width,
  height,
}) => {
  return (
    <div
      className={`${styles.skeleton} ${styles.animatePulse} ${
        className ? className : ""
      }`}
      style={{
        width: width || "100%", // Default to full width if not provided
        height: height || "1rem", // Default height if not provided
        ...style,
      }}
    />
  );
};

export default Skeleton;
