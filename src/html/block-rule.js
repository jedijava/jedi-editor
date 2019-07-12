const BLOCK_TAGS = {
  blockquote: "blockquote",
  p: "paragraph",
  pre: "code-block",
  li: "list-item",
  cli: "check-item",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h5: "h6"
};

function highlight(node) {
  const language = node.data.get("language");
  const texts = Array.from(node.texts());
  const string = texts.map(([n]) => n.text).join("\n");
  const grammar = Prism.languages[language];
  let html = Prism.highlight(string, grammar, "javascript");
  console.log(html);
}

export default {
  deserialize(el, next) {
    const type = BLOCK_TAGS[el.tagName.toLowerCase()];
    if (type) {
      return {
        object: "block",
        type: type,
        data: {
          className: el.getAttribute("class")
        },
        nodes: next(el.childNodes)
      };
    }
  },
  serialize(obj, children) {
    if (obj.object == "block") {
      switch (obj.type) {
        case "code-block":
          return (
            <pre>
              <code>{children}</code>
            </pre>
          );
        case "paragraph":
          return <p className={obj.data.get("className")}>{children}</p>;
        case "blockquote":
          return <blockquote>{children}</blockquote>;
        case "number-list":
          return <ol>{children}</ol>;
        case "bullet-list":
          return <ul>{children}</ul>;
        case "list-item":
          return <li>{children}</li>;
        case "h1":
          return <h1>{children}</h1>;
        case "h2":
          return <h2>{children}</h2>;
        case "h3":
          return <h3>{children}</h3>;
        case "h4":
          return <h4>{children}</h4>;
        case "h5":
          return <h5>{children}</h5>;
        default:
          return <p className={obj.data.get("className")}>{children}</p>;
      }
    }
  }
};
