import { AnyColor, colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import namesPlugin from "colord/plugins/names";
import { hexFromInt, intFromHex } from "../color_utils";
import { HCT } from "../hct/hct";
import { TonalPalette } from "../palettes/tonal_palette";

extend([a11yPlugin, namesPlugin]);

export interface ColorsTokens {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
}

export interface BuildColorsParams {
  primaryKey: AnyColor;
  secondaryKey: AnyColor;
  errorKey?: AnyColor;
  mode?: "light" | "dark";
}

function buildPalette(colorKey: AnyColor) {
  return TonalPalette.fromInt(intFromHex(colord(colorKey).toHex()));
}

function buildPaletteWithChroma(colorKey: AnyColor, chroma: number) {
  return TonalPalette.fromHueAndChroma(
    HCT.fromInt(intFromHex(colord(colorKey).toHex())).hue,
    chroma
  );
}

function buildPaletteOrDefaultHueAndChroma(
  colorKey: AnyColor | undefined,
  hue: number,
  chroma: number
) {
  return colorKey
    ? TonalPalette.fromInt(intFromHex(colord(colorKey).toHex()))
    : TonalPalette.fromHueAndChroma(hue, chroma);
}

function hexFromPaletteTone(palette: TonalPalette, tone: number) {
  return (hexFromInt(palette.tone(tone)) as unknown) as string;
}

export function buildColors({
  primaryKey,
  secondaryKey,
  errorKey,
  mode = "light"
}: BuildColorsParams): ColorsTokens {
  const primaryPalette = buildPalette(primaryKey);
  const secondaryPalette = buildPalette(secondaryKey);
  const neutralPalette = buildPaletteWithChroma(primaryKey, 4);
  const neutralVariantPalette = buildPaletteWithChroma(primaryKey, 8);
  const errorPalette = buildPaletteOrDefaultHueAndChroma(errorKey, 25, 84);

  if (mode === "light") {
    return {
      primary: hexFromPaletteTone(primaryPalette, 40),
      onPrimary: hexFromPaletteTone(primaryPalette, 100),
      primaryContainer: hexFromPaletteTone(primaryPalette, 90),
      onPrimaryContainer: hexFromPaletteTone(primaryPalette, 10),
      secondary: hexFromPaletteTone(secondaryPalette, 40),
      onSecondary: hexFromPaletteTone(secondaryPalette, 100),
      secondaryContainer: hexFromPaletteTone(secondaryPalette, 90),
      onSecondaryContainer: hexFromPaletteTone(secondaryPalette, 10),
      error: hexFromPaletteTone(errorPalette, 40),
      onError: hexFromPaletteTone(errorPalette, 100),
      errorContainer: hexFromPaletteTone(errorPalette, 90),
      onErrorContainer: hexFromPaletteTone(errorPalette, 10),
      background: hexFromPaletteTone(neutralPalette, 99),
      onBackground: hexFromPaletteTone(neutralPalette, 10),
      surface: hexFromPaletteTone(neutralPalette, 99),
      onSurface: hexFromPaletteTone(neutralPalette, 10),
      surfaceVariant: hexFromPaletteTone(neutralVariantPalette, 90),
      onSurfaceVariant: hexFromPaletteTone(neutralVariantPalette, 30),
      outline: hexFromPaletteTone(neutralVariantPalette, 50)
    };
  } else {
    // mode === "dark"
    return {
      primary: hexFromPaletteTone(primaryPalette, 80),
      onPrimary: hexFromPaletteTone(primaryPalette, 20),
      primaryContainer: hexFromPaletteTone(primaryPalette, 30),
      onPrimaryContainer: hexFromPaletteTone(primaryPalette, 90),
      secondary: hexFromPaletteTone(secondaryPalette, 80),
      onSecondary: hexFromPaletteTone(secondaryPalette, 20),
      secondaryContainer: hexFromPaletteTone(secondaryPalette, 30),
      onSecondaryContainer: hexFromPaletteTone(secondaryPalette, 90),
      error: hexFromPaletteTone(errorPalette, 80),
      onError: hexFromPaletteTone(errorPalette, 20),
      errorContainer: hexFromPaletteTone(errorPalette, 30),
      onErrorContainer: hexFromPaletteTone(errorPalette, 80),
      background: hexFromPaletteTone(neutralPalette, 10),
      onBackground: hexFromPaletteTone(neutralPalette, 90),
      surface: hexFromPaletteTone(neutralPalette, 10),
      onSurface: hexFromPaletteTone(neutralPalette, 90),
      surfaceVariant: hexFromPaletteTone(neutralVariantPalette, 30),
      onSurfaceVariant: hexFromPaletteTone(neutralVariantPalette, 80),
      outline: hexFromPaletteTone(neutralVariantPalette, 60)
    };
  }
}

export function findColorTokenNameByColor(
  colorsTokens: ColorsTokens,
  color: string
) {
  const colorsNames = (Object.keys(colorsTokens) as unknown) as [
    keyof typeof colorsTokens
  ];
  return colorsNames.find((colorName) => colorsTokens[colorName] === color);
}

export function generateOnColor(colorsTokens: ColorsTokens, color: string) {
  const colorName = findColorTokenNameByColor(colorsTokens, color);
  if (colorName) {
    const colorsNames = (Object.keys(colorsTokens) as unknown) as [
      keyof typeof colorsTokens
    ];
    const existentOnColor = colorsNames.find((targetColorName) =>
      new RegExp(`^on${colorName}$`, "i").test(targetColorName)
    );
    if (existentOnColor) {
      return colorsTokens[existentOnColor];
    }
  }
  const containerColorPalette = buildPalette(color as AnyColor);
  const contrastMap = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99].map(
    (tone) => {
      return {
        tone,
        contrast: colord(
          hexFromPaletteTone(containerColorPalette, tone) as AnyColor
        ).contrast(color as AnyColor)
      };
    }
  );
  const perfectContrastMap = contrastMap.filter(
    ({ contrast }) => contrast >= 7
  );
  const goodContrastMap = contrastMap.filter(
    ({ contrast }) => contrast >= 4.5 && contrast < 7
  );
  const okContrastMap = contrastMap.filter(
    ({ contrast }) => contrast >= 3 && contrast < 4.5
  );

  let newContrastMap: typeof contrastMap = [];

  if (perfectContrastMap.length > 0) {
    newContrastMap = perfectContrastMap;
  } else if (goodContrastMap.length > 0) {
    newContrastMap = goodContrastMap;
  } else if (okContrastMap.length > 0) {
    newContrastMap = okContrastMap;
  }

  const toneWithLowestValidContrast = newContrastMap.reduce((prev, current) => {
    return prev.contrast < current.contrast ? prev : current;
  }).tone;
  return hexFromPaletteTone(containerColorPalette, toneWithLowestValidContrast);
}
