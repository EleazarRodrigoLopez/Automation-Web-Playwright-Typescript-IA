const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Ruta base del prompt general
const BASE_PROMPT_PATH = path.resolve(__dirname, '../prompt-base-inteligente.txt');

// Argumento: subruta del prompt dentro de mcp/prompts/
const CUSTOM_PROMPT_ARG = process.argv[2];
const TEMP_PROMPT_PATH = path.resolve(__dirname, '../prompt-final.txt');

// ⚠️ Validación del argumento
if (!CUSTOM_PROMPT_ARG) {
  console.error('❌ Debes indicar el nombre del prompt. Ejemplo:\n   npm run prompt login-flow.txt');
  process.exit(1);
}

// 👉 Ruta completa del prompt dentro de mcp/prompts
const CUSTOM_PROMPT_PATH = path.resolve(__dirname, '../mcp/prompts/', CUSTOM_PROMPT_ARG);

if (!fs.existsSync(BASE_PROMPT_PATH)) {
  console.error('❌ No se encontró el archivo prompt-base-inteligente.txt en la raíz.');
  process.exit(1);
}

if (!fs.existsSync(CUSTOM_PROMPT_PATH)) {
  console.error(`❌ No se encontró el archivo dentro de mcp/prompts: ${CUSTOM_PROMPT_ARG}`);
  process.exit(1);
}

// 💥 Unir prompts
const basePrompt = fs.readFileSync(BASE_PROMPT_PATH, 'utf-8');
const customPrompt = fs.readFileSync(CUSTOM_PROMPT_PATH, 'utf-8');
const finalPrompt = `${basePrompt}\n\n${customPrompt}`;

fs.writeFileSync(TEMP_PROMPT_PATH, finalPrompt);

// 🚀 Ejecutar prompt final
const comando = `type "${TEMP_PROMPT_PATH}" | npx @executeautomation/playwright-mcp-server`;
console.log(`🚀 Ejecutando: ${CUSTOM_PROMPT_ARG}`);
const proceso = exec(comando);

proceso.stdout.on('data', (data) => process.stdout.write(data));
proceso.stderr.on('data', (data) => process.stderr.write(data));
proceso.on('close', (code) => {
  console.log(`✅ Finalizado con código: ${code}`);
});
