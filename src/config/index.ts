import type { CutiePageConfig } from '../types/config';
import { validateCutiePageConfig } from '../utils/validation';
import { defaultTemplateConfig } from './template';

export { defaultTemplateConfig };

/**
 * Returns the production CutiePage template configuration.
 */
export function getCutiePageConfig(overrideConfig?: Partial<CutiePageConfig>): CutiePageConfig {
  if (overrideConfig) {
    return validateCutiePageConfig({
      ...defaultTemplateConfig,
      ...overrideConfig,
    });
  }
  return validateCutiePageConfig(defaultTemplateConfig);
}
