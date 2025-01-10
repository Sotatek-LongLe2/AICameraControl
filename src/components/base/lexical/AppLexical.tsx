import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Box, BoxProps } from "@mui/joy";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $setSelection,
  CLEAR_HISTORY_COMMAND,
  LexicalEditor,
  TextNode,
} from "lexical";
import { memo, Ref, useCallback, useEffect, useRef } from "react";
import { combineSx } from "src/shared/utils";
import { colors } from "src/styles/colors";
import { ImageNode } from "./nodes/ImageNode";
import ImagesPlugin from "./plugins/ImagePlugin";

interface AppLexicalProps extends BoxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
}

const initialConfig = {
  onError: (error: Error) => console.error(error),
  namespace: "texteditor",
  nodes: [ImageNode, TextNode],
};

export const AppLexical = memo((props: AppLexicalProps) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <AppLexicalInner {...props} />
    </LexicalComposer>
  );
});

// Initial value is undefined, NOT empty string
// To fix selection (caret) issue
const AppLexicalInner = memo(
  ({ value, onValueChange, inputRef, ...props }: AppLexicalProps) => {
    const [editorInstance] = useLexicalComposerContext();
    const isFirstRenderRef = useRef<boolean>(true);

    useEffect(() => {
      if (editorInstance && value !== undefined) {
        editorInstance.update(() => {
          // Store current selection
          const selection = $getSelection();
          let anchorNode = null;
          let focusNode = null;
          let anchorOffset = 0;
          let focusOffset = 0;

          if ($isRangeSelection(selection)) {
            anchorNode = selection.anchor.getNode();
            focusNode = selection.focus.getNode();
            anchorOffset = selection.anchor.offset;
            focusOffset = selection.focus.offset;
          }

          const root = $getRoot();

          root.clear();
          const parser = new DOMParser();
          const dom = parser.parseFromString(value, "text/html");
          const nodes = $generateNodesFromDOM(editorInstance, dom);
          root.append(...nodes);

          if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            $setSelection(null);
            editorInstance.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
            return;
          }
          // // Restore selection
          if (
            selection &&
            $isRangeSelection(selection) &&
            anchorNode &&
            focusNode
          ) {
            // This method caused these errors:
            /**
             *  updateEditor: selection has been lost because the previously selected nodes have been removed and selection wasn't moved to another node. Ensure selection changes after removing/replacing a selected node.
             *  Warning: flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.
             *
             *  But there is no solution currently
             */
            selection.setTextNodeRange(
              anchorNode as TextNode,
              anchorOffset,
              focusNode as TextNode,
              focusOffset
            );
          }
        });
      }
    }, [editorInstance, value]);

    const handleChange = useCallback(
      (editor: LexicalEditor) => {
        editor.read(() => {
          const textContent = $getRoot().getTextContent();
          const html = $generateHtmlFromNodes(editor);
          if ((!value && !textContent) || value === html) return;

          onValueChange?.(textContent.trim() ? html : "");
        });
      },
      [onValueChange, value]
    );

    const onInsertImageSuccess = useCallback(() => {
      editorInstance.read(() => {
        const html = $generateHtmlFromNodes(editorInstance);
        onValueChange?.(html);
      });
    }, [editorInstance, onValueChange]);

    return (
      <Box
        {...props}
        sx={combineSx(
          (theme) => ({
            overflow: "hidden",

            "& p": {
              margin: 0,
              ...theme.typography["input-text"],
            },
          }),
          props.sx
        )}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-input"
              ref={inputRef}
              style={{
                padding: "9px 16px",
                border: `1px solid ${colors["input-border"]}`,
                outline: "none",
                height: "100%",

                overflow: "auto",
              }}
            />
          }
          ErrorBoundary={() => <></>}
        />
        <OnChangePlugin onChange={(_, editor) => handleChange(editor)} />
        <ImagesPlugin onInsertImageSuccess={onInsertImageSuccess} />
        <HistoryPlugin />
      </Box>
    );
  }
);
