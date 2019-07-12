// import isHotkey from "is-hotkey";
// isHotkey("mob+s")(event)
export default function KeymapPlugin() {
  return {
    onKeyDown(event, editor, next) {
      const { value } = editor;
      const { startBlock } = value;
      if (event.key === "Enter") {
        if (startBlock.type === "code-block") {
          editor.insertText("\n");
          return;
        }
      }
      next();
    }
  };
}
