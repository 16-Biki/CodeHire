import { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ submit }) {
  const [code, setCode] = useState("// Write your code here in JavaScript");

  const handleSubmit = () => {
    if (
      !code ||
      code.trim() === "" ||
      code === "// Write your code here in JavaScript"
    ) {
      alert("Please write some code first");
      return;
    }

    submit(code);
    alert("Code saved successfully");
  };

  return (
    <div className="card">
      <h3>Code Editor</h3>

      <Editor
        height="400px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      <button onClick={handleSubmit}>Submit Code</button>
    </div>
  );
}

export default CodeEditor;
