import { css } from "@emotion/core";
import Tooltip from "./tooltip"
// : hover{ background: ${ disable ? "rgba(0,0,0,0)" : "rgba(0,0,0,.05)" }; }
export const Button = React.forwardRef(
    ({ icon, active, disable, ...props }, ref) => (

        <Tooltip
            icon={icon}
            disable={disable}
        >
            <span
                {...props}
                ref={ref}
                css={css`
                cursor:${disable ? "not-allowed" : "pointer"};
                padding:4px 8px;
                margin:0 2px;
                color: ${disable
                        ? "#eee"
                        : active ? "#f0656f" : "#A6A6A6"};
           `}
            >
                <i class={`iconfont icon-${icon}`} ></i>
            </span>
        </Tooltip>

    )
);
