"use client";

/**
 * Renders the template exactly the way the platform does: content defaults,
 * theme defaults, preview mode, assets served from ../assets. Keep this file
 * free of Tailwind classes — the package build scans src/ only, so a class used
 * only here would work in dev and vanish in production.
 */
import template from "../../src/index";

const { Template, config } = template;

const content: Record<string, unknown> = {};
for (const [id, field] of Object.entries(config.fields ?? {})) {
  if (field.default !== undefined) content[id] = field.default;
  else if (field.type === "boolean") content[id] = false;
  else content[id] = "";
}

/**
 * The theme MUST be seeded from the declared defaults, not left empty.
 *
 * <Surface> writes a --cp-* custom property for each token PRESENT in design
 * state. With an empty theme it writes none, so every var(--cp-accent) in your
 * CSS resolves to nothing and the preview renders with invisible text on
 * invisible cards — while the build stays green, because none of that is
 * structural. Seeding the defaults makes dev match what a customer sees before
 * they change anything.
 */
const theme: Record<string, string> = {};
for (const [id, token] of Object.entries(config.theme ?? {})) {
  if (token.default !== undefined) theme[id] = token.default;
}

export default function PreviewPage() {
  return (
    <div data-cp-tpl={config.slug}>
      <Template
        content={content}
        design={{ theme, overrides: {}, canvas: {} }}
        mode="preview"
        assets={(path) => "/" + String(path).replace(/^\/+/, "")}
      />
    </div>
  );
}
