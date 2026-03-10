import Editor from "@monaco-editor/react";

function CodeEditor({ value, onChange }) {
  const handleEditorDidMount = (editor) => {
    editor.setPosition({ lineNumber: 2, column: 1 });
    editor.focus();
  };

  return (
    <div className="card">
      <h3>Code Editor</h3>

      <Editor
        height="400px"
        language="javascript"
        theme="vs-dark"
        value={value || "// Write your code here in JavaScript\n"}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default CodeEditor;
