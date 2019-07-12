import { css } from "@emotion/core";

export const Seperator = React.forwardRef(
    ({ ...props }, ref) => (
        <span
            {...props}
            ref={ref}
            css={css`
                    display: inline-block;
                    background: #eee;
                    width: 2px;
                    height: 24px;
                    margin: 4px 10px 4px;
                    vertical-align: middle;
            `}
        />
    )
);
