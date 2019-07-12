
export default function HighlightPlugin() {
    return {
        renderDecoration(props, editor, next) {
            const { children, decoration, attributes } = props;
            // console.log(decoration.type)
            switch (decoration.type) {
                case "comment":
                case "keyword":
                case "tag":
                case "punctuation":
                case "operator":
                case "number":
                    return (
                        <span {...attributes} className={`token ${decoration.type}`}>
                            {children}
                        </span>
                    );
                default:
                    console.log(decoration.type);
                    return next();
            }
        },
        decorateNode(node, editor, next) {
            const others = next() || []
            if (!node || node.type !== 'code-block') {
                return others
            }
            const language = node.data.get('language')
            const texts = Array.from(node.texts())
            const string = texts.map(([n]) => n.text).join('\n')
            const grammar = Prism.languages[language]
            // console.log(grammar)
            if (!grammar) {
                console.log("代码高亮不支持此语法", language)
                return [];
            }
            const tokens = Prism.tokenize(string, grammar)
            // console.log(string, tokens)
            const decorations = []
            let startEntry = texts.shift()
            let endEntry = startEntry
            let startOffset = 0
            let endOffset = 0
            let start = 0

            for (const token of tokens) {
                startEntry = endEntry
                startOffset = endOffset

                const [startText, startPath] = startEntry
                const content = getContent(token)
                const newlines = content.split('\n').length - 1
                const length = content.length - newlines
                const end = start + length

                let available = startText.text.length - startOffset
                let remaining = length

                endOffset = startOffset + remaining

                while (available < remaining && texts.length > 0) {
                    endEntry = texts.shift()
                    const [endText] = endEntry
                    remaining = length - available
                    available = endText.text.length
                    endOffset = remaining
                }

                const [endText, endPath] = endEntry

                if (typeof token !== 'string') {
                    const dec = {
                        type: token.type,
                        anchor: {
                            key: startText.key,
                            path: startPath,
                            offset: startOffset,
                        },
                        focus: {
                            key: endText.key,
                            path: endPath,
                            offset: endOffset,
                        },
                    }

                    decorations.push(dec)
                }

                start = end
            }
            return [...others, ...decorations]
        }
    };
}

function getContent(token) {
    if (typeof token === "string") {
        return token;
    } else if (typeof token.content === "string") {
        return token.content;
    } else {
        return token.content.map(getContent).join("");
    }
}