import React from "react";
import "./App.css";
import { ContentBlock, Editor, EditorState, RichUtils } from "draft-js";

function App() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (editorState: EditorState) => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = block.getKey();
    console.log(block.toObject());
    if (text.startsWith("# ")) {
      const blockSelection = selectionState.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: text.indexOf(" ") + 1,
      });
      const updatedContentState = contentState.merge({
        //@ts-ignore
        blockMap: contentState.getBlockMap().merge({
          [blockKey]: block.merge({
            type: "header-one",
            text: text.slice(2),
          }),
        }),
      });
      const newEditorState = EditorState.push(
        editorState,
        //@ts-ignore
        updatedContentState,
        "change-block-data"
      );
      setEditorState(
        EditorState.forceSelection(newEditorState, blockSelection)
      );
      return true;
    } else if (text.startsWith("*** ")) {
      const blockSelection = selectionState.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: text.indexOf(" ") + 1,
      });
      const updatedContentState = contentState.merge({
        //@ts-ignore
        blockMap: contentState.getBlockMap().merge({
          [blockKey]: block.merge({
            type: "block-underline",
            text: text.slice(4),
          }),
        }),
      });
      const newEditorState = EditorState.push(
        editorState,
        //@ts-ignore
        updatedContentState,
        "change-block-data"
      );
      // setEditorState(boldEditorState);
      setEditorState(
        EditorState.forceSelection(newEditorState, blockSelection)
      );
      return true;
    } else if (text.startsWith("** ")) {
      const blockSelection = selectionState.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: text.indexOf(" ") + 1,
      });
      const updatedContentState = contentState.merge({
        //@ts-ignore
        blockMap: contentState.getBlockMap().merge({
          [blockKey]: block.merge({
            type: "block-red",
            text: text.slice(3),
          }),
        }),
      });
      const newEditorState = EditorState.push(
        editorState,
        //@ts-ignore
        updatedContentState,
        "change-block-data"
      );
      // setEditorState(boldEditorState);
      setEditorState(
        EditorState.forceSelection(newEditorState, blockSelection)
      );
      return true;
    } else if (text.startsWith("* ")) {
      const blockSelection = selectionState.merge({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: text.indexOf(" ") + 1,
      });
      const updatedContentState = contentState.merge({
        //@ts-ignore
        blockMap: contentState.getBlockMap().merge({
          [blockKey]: block.merge({
            type: "block-bold",
            text: text.slice(2),
          }),
        }),
      });
      const newEditorState = EditorState.push(
        editorState,
        //@ts-ignore
        updatedContentState,
        "change-block-data"
      );
      // setEditorState(boldEditorState);
      setEditorState(
        EditorState.forceSelection(newEditorState, blockSelection)
      );
      return true;
    }
    setEditorState(editorState);
    return false;
  };

  function myBlockStyleFn(contentBlock: ContentBlock) {
    const type = contentBlock.getType();
    if (type === "block-bold") {
      return "BoldBlock";
    }
    if (type === "block-red") {
      return "RedBlock";
    }
    if (type === "block-underline") {
      return "UnderlineBlock";
    }
  }
  return (
    <>
      <div className="titleBar">
        <span></span>
        <p>Demo editor by Ishan Jaiswal</p>
        <button>Save</button>
      </div>
      <div>
        <Editor
          editorState={editorState}
          onChange={handleChange}
          //@ts-ignore
          blockStyleFn={myBlockStyleFn}
        />
      </div>
    </>
  );
}

export default App;
