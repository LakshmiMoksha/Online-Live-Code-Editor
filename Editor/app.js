var htmlEditor = ace.edit("html");
htmlEditor.setTheme("ace/theme/cobalt");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setValue(`<!-- Pre defined HTML -->
<div class="clock-container">
  <h1 id="clock">00:00:00</h1>
</div>`, 1);
htmlEditor.setOptions({ showPrintMargin: false });
htmlEditor.resize();
htmlEditor.setHighlightActiveLine(false);

var cssEditor = ace.edit("css");
cssEditor.setTheme("ace/theme/cobalt");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setOptions({ showPrintMargin: false });
cssEditor.setValue(`/* Pre defined CSS */
body {
  margin: 0;
  background: #0f2027;
  color: #00f7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: monospace;
}
.clock-container {
  background: #001c2e;
  padding: 40px 60px;
  border-radius: 15px;
  box-shadow: 0 0 25px #00f7ff;
}
#clock {
  font-size: 4rem;
  text-shadow: 0 0 10px #00f7ff;
}`, 1);
cssEditor.resize();
cssEditor.setHighlightActiveLine(false);

var jsEditor = ace.edit("js");
jsEditor.setTheme("ace/theme/cobalt");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setValue(`// Pre defined JavaScript
function updateClock() {
  const now = new Date();
  let hrs = now.getHours().toString().padStart(2, '0');
  let mins = now.getMinutes().toString().padStart(2, '0');
  let secs = now.getSeconds().toString().padStart(2, '0');
  document.getElementById("clock").textContent = \`\${hrs}:\${mins}:\${secs}\`;
}
setInterval(updateClock, 1000);
updateClock();`, 1);
jsEditor.setOptions({ showPrintMargin: false });
jsEditor.resize();
jsEditor.setHighlightActiveLine(false);

function compiler() {
  const htmlValue = htmlEditor.getValue();
  const cssValue = cssEditor.getValue();
  const jsValue = jsEditor.getValue();
  const result = document.getElementById("result").contentWindow.document;

  result.open();
  result.writeln(
    "<style>" + cssValue + "</style>" +
    htmlValue +
    "<script>" + jsValue + "<\/script>"
  );
  result.close();
}

const allButtons = document.querySelectorAll("#button-wrapper button");
const allPanels = document.querySelectorAll("#ide-container .panel-wrapper");

function switchPanel(panelIndex) {
  switcher(panelIndex);
}

switchPanel(0);

function runEdit(panelIndex) {
  switcher(panelIndex);
  compiler();
}

function switcher(panelIndex) {
  allButtons.forEach((btn) => (btn.style.background = ""));
  allButtons[panelIndex].style.background = "#2a0a5e";
  allPanels.forEach((panel) => (panel.style.display = "none"));
  allPanels[panelIndex].style.display = "block";
}

function downloadCode() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();
  const code = `--- HTML ---\n${html}\n\n--- CSS ---\n${css}\n\n--- JavaScript ---\n${js}`;
  const blob = new Blob([code], { type: "text/plain" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "code.txt";
  a.click();
  URL.revokeObjectURL(a.href);
}
