import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createCptfPackage() {
  console.log('📦 [CutiePage CLI] Packaging commercial template into .cptf artifact...');

  const templateJsonPath = path.join(rootDir, 'template.json');
  const distDirPath = path.join(rootDir, 'dist');
  const outputDirPath = path.join(rootDir, 'dist-cptf');

  if (!fs.existsSync(templateJsonPath)) {
    console.error('❌ Error: template.json missing at root!');
    process.exit(1);
  }

  if (!fs.existsSync(distDirPath)) {
    console.error('❌ Error: dist/ output missing. Please run `npm run build` first.');
    process.exit(1);
  }

  const templateMeta = JSON.parse(fs.readFileSync(templateJsonPath, 'utf8'));
  const packageName = `${templateMeta.id || 'cutiepage-template'}-v${templateMeta.version || '1.0.0'}.cptf`;

  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }

  const manifest = {
    template: templateMeta,
    buildTime: new Date().toISOString(),
    engineVersion: '1.0.0',
    type: 'commercial-blank-template',
    supportedSections: templateMeta.supportedSections,
    files: ['dist', 'template.json', 'package.json'],
  };

  const artifactPath = path.join(outputDirPath, packageName);

  const bundlePayload = {
    manifest,
    templateMeta,
    timestamp: Date.now(),
  };

  fs.writeFileSync(artifactPath, JSON.stringify(bundlePayload, null, 2), 'utf8');

  console.log(`\n✅ [CutiePage CLI] Packaging successful!`);
  console.log(`✨ Template Artifact Generated: ${artifactPath}`);
  console.log(`📋 Template ID: ${templateMeta.id}`);
  console.log(`🚀 Ready for CutiePage.in upload!`);
}

createCptfPackage().catch((err) => {
  console.error('❌ Packaging failed:', err);
  process.exit(1);
});
