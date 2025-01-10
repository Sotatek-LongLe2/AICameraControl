import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { handleUploadFile } from "src/shared/helpers/file";
import { useAppStore } from "src/store/appStore";
import { $createImageNode, ImageNode, ImagePayload } from "../nodes/ImageNode";

// eslint-disable-next-line react-refresh/only-export-components
export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand(
  "INSERT_IMAGE_COMMAND"
);

interface ImagePluginProps {
  onInsertImageSuccess?: (imageNode: ImageNode) => void;
}

export default function ImagesPlugin({
  onInsertImageSuccess,
}: ImagePluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const { setLoading } = useAppStore();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith("image")) {
            const file = item.getAsFile();
            if (!file) continue;

            try {
              setLoading(true);

              const url = await handleUploadFile(file, true);

              if (url) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  src: url,
                  altText: "Pasted image",
                  maxWidth: "100%",
                });
              }
            } catch (e) {
              toast.error(String(e));
            } finally {
              setLoading(false);
            }
            event.preventDefault();
            break;
          }
        }
      }
    };

    const handleDrop = async (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files) {
        for (const file of files) {
          if (file.type.startsWith("image")) {
            if (!file) continue;

            try {
              setLoading(true);

              const url = await handleUploadFile(file, true);

              if (url) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  src: url,
                  altText: "Dropped image",
                  maxWidth: "100%",
                });
              }
            } catch (e) {
              toast.error(String(e));
            } finally {
              setLoading(false);
            }
          }
        }
      }
    };

    const rootElement = editor.getRootElement();
    if (rootElement) {
      rootElement.addEventListener("paste", handlePaste);
      rootElement.addEventListener("drop", handleDrop);
      rootElement.addEventListener("dragover", (event) =>
        event.preventDefault()
      );
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener("paste", handlePaste);
        rootElement.removeEventListener("drop", handleDrop);
        rootElement.removeEventListener("dragover", (event) =>
          event.preventDefault()
        );
      }
    };
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          onInsertImageSuccess?.(imageNode);
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor, onInsertImageSuccess]);

  return null;
}
