import { css } from "@emotion/core";

export const ToolbarWrapper = React.forwardRef(({ className, ...props }, ref) => (

  <div
    {...props}
    ref={ref}
    css={css`
      position: relative;
      margin: 0 20px;
      border-bottom: 2px solid #eee;
      margin-bottom: 20px;
    `}
  />
));