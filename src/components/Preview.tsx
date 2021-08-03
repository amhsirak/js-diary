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
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red; font-family: Arial, Helvetica, sans-serif;"><h4>Runtime Error</h4>' + err + '</div>'
          console.error(err);
        };

        // async error
        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
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
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
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
