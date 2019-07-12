import { css } from "@emotion/core";

export const Inline = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        css={css`
         margin-bottom: 4px;
         & > * {
          display: inline-block;
          vertical-align:middle;
        
         }
    `}
    />
));