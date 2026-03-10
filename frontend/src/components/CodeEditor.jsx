import { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ value, onChange }) {
  const [language, setLanguage] = useState("javascript");

  const handleEditorDidMount = (editor) => {
    editor.setPosition({ lineNumber: 2, column: 1 });
    editor.focus();
  };

  const getDefaultCode = () => {
    if (language === "python") {
      return "# Write your code here in Python\n";
    }
    if (language === "java") {
      return "// Write your code here in Java\n";
    }
    return "// Write your code here in JavaScript\n";
  };

  return (
    <div className="card">
      <h3>Code Editor</h3>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <Editor
        height="400px"
        language={language}
        theme="vs-dark"
        value={value || getDefaultCode()}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default CodeEditor;
