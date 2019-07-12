import Html from "slate-html-serializer";
import MarkRule from "./mark-rule";
import BlockRule from "./block-rule";

const html = new Html({ rules: [MarkRule, BlockRule] });
export default {
  deserialize: v => html.deserialize(v),
  serialize: v => html.serialize(v)
};
