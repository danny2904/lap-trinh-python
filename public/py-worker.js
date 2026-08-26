const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';

let pyodide = null;
let loading = null;
let running = false;

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (loading) return loading;

  loading = (async () => {
    post('init-start');
    importScripts(PYODIDE_CDN);
    pyodide = await self.loadPyodide();
    post('init-ready');
    return pyodide;
  })();

  return loading;
}

self.onmessage = async event => {
  const msg = event.data || {};
  if (msg.type !== 'run') return;

  if (running) {
    post('run-error', { id: msg.id, message: 'Python đang chạy. Chờ lệnh hiện tại xong rồi bấm lại.' });
    return;
  }

  running = true;
  try {
    const py = await ensurePyodide();
    py.setStdout({ batched: text => post('stdout', { id: msg.id, text: text + '\n' }) });
    py.setStderr({ batched: text => post('stderr', { id: msg.id, text: text + '\n' }) });
    const stdinLines = Array.isArray(msg.stdinLines) ? msg.stdinLines : [msg.stdinSeed ?? '7'];
    let stdinIndex = 0;
    py.setStdin({ stdin: () => String(stdinLines[stdinIndex++] ?? stdinLines[stdinLines.length - 1] ?? '7') + '\n' });
    await py.runPythonAsync(String(msg.code || ''));
    post('run-done', { id: msg.id });
  } catch (error) {
    post('run-error', { id: msg.id, message: String(error && error.message ? error.message : error) });
  } finally {
    running = false;
  }
};
