import { useRef, useEffect } from "react";
import "../styles/Preview.css";

interface PreviewProps {
  code: string;
}

const html = `
<html>
    <head></head>
      <style> html {  background-color: #ffffff; } </style>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
                try {
                    eval(event.data);
                } catch (err) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
                    console.error(err);
                }
            }, false);
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  // everytime new code is found, reset the html and write the new code
  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview">
      <iframe
        title="code-preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
