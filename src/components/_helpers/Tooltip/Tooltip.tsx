import type { TooltipProps } from "primereact/tooltip";
import { Tooltip as PRTooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import type { FC, JSX } from "react";
import styles from "./Tooltip.module.scss";

const Tooltip: FC<TooltipProps> = ({
  className,
  pt,
  ...props
}): JSX.Element => (
  <PRTooltip
    {...props}
    pt={{
      root: {
        className: classNames(styles.tooltip, className),
      },
      ...pt,
    }}
  >
    {props.children}
  </PRTooltip>
);

export default Tooltip;
