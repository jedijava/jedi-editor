const MARK_TAGS = {
  i: "italic",
  em: "italic",
  code: "code-inline",
  strong: "bold",
  u: "underline",
  s: "strikethrough",
  del: "strikethrough"
};

export default {
  deserialize(el, next) {
    const type = MARK_TAGS[el.tagName.toLowerCase()];
    if (type) {
      return {
        object: "mark",
        type: type,
        nodes: next(el.childNodes)
      };
    }
  },
  serialize(obj, children) {
    if (obj.object == "mark") {
      switch (obj.type) {
        case "bold":
          return <strong>{children}</strong>;
        case "italic":
          return <i>{children}</i>;
        case "underline":
          return <u>{children}</u>;
        case "code-inline":
          return <code>{children}</code>;
        case "strikethrough":
          return <del>{children}</del>;
        default:
          return { children };
      }
    }
  }
};
