import SUPPORT from "../data/support-type";
import CheckItem from "../components/check-item";
import CodeBlock from "../components/code-block";

export default function RenderPlugin() {
  return {
    renderBlock(props, editor, next) {
      const { node, attributes, children } = props;

      // console.log("renderBlock", node.type);
      switch (node.type) {
        case SUPPORT.BLOCKQUOTE:
          return <blockquote {...attributes}> {children}</blockquote>;

        case SUPPORT.CHECK_LIST:
          return <CheckItem {...props} />;
        case SUPPORT.BULLET_LIST:
          return <ul {...attributes}>{children}</ul>;

        case SUPPORT.NUMBER_LIST:
          return <ol {...attributes}>{children}</ol>;

        case SUPPORT.LIST_ITEM:
          return <li {...attributes}>{children}</li>;

        case SUPPORT.P:
          return <p {...attributes}>{children}</p>;

        case SUPPORT.H1:
          return <h1 {...attributes}>{children}</h1>;

        case SUPPORT.H2:
          return <h2 {...attributes}>{children}</h2>;

        case SUPPORT.H3:
          return <h3 {...attributes}>{children}</h3>;

        case SUPPORT.H4:
          return <h4 {...attributes}>{children}</h4>;

        case SUPPORT.H5:
          return <h5 {...attributes}>{children}</h5>;
        case SUPPORT.CODE_BLOCK:
          return <CodeBlock {...props} />;
        // case SUPPORT.CODE_PIECE:
        //   console.log("测试", children);
        //   return <div {...attributes}> {children}</div>;
        default:
          return next();
      }
    },

    renderMark(props, editor, next) {
      const { mark, attributes, children } = props;
      switch (mark.type) {
        case SUPPORT.BOLD:
          return <strong {...attributes}>{children}</strong>;
        case SUPPORT.ITALIC:
          return <i {...attributes}>{children}</i>;
        case SUPPORT.UNDERLINE:
          return <u {...attributes}>{children}</u>;
        case SUPPORT.STRIKETHROUGH:
          return <del {...attributes}>{children}</del>;
        case SUPPORT.CODE_INLINE:
          return <code {...attributes}>{children}</code>;
        default:
          return next();
      }
    },

  };
}
