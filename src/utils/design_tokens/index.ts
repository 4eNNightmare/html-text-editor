import { buildColors, BuildColorsParams, ColorsTokens } from "./colors";

export interface DesignTokens {
  colors: ColorsTokens;
}

export interface BuildDesignTokensParams extends BuildColorsParams {}

export function buildDesignTokens(
  params: BuildDesignTokensParams
): DesignTokens {
  return {
    colors: buildColors({
      primaryKey: params.primaryKey,
      secondaryKey: params.secondaryKey,
      errorKey: params.errorKey,
      mode: params.mode
    })
  };
}
