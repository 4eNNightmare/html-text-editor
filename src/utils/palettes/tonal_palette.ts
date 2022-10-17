import { HCT } from '../hct/hct'

/**
 *  A convenience class for retrieving colors that are constant in hue and
 *  chroma, but vary in tone.
 */
export class TonalPalette {
  private readonly cache = new Map<number, number>()

  /**
   * @param argb ARGB representation of a color
   * @return Tones matching that color's hue and chroma.
   */
  static fromInt(argb: number): TonalPalette {
    const hct = HCT.fromInt(argb)
    return TonalPalette.fromHueAndChroma(hct.hue, hct.chroma)
  }

  /**
   * @param hue HCT hue
   * @param chroma HCT chroma
   * @return Tones matching hue and chroma.
   */
  static fromHueAndChroma(hue: number, chroma: number): TonalPalette {
    return new TonalPalette(hue, chroma)
  }

  private constructor(
    private readonly hue: number,
    private readonly chroma: number
  ) {}

  /**
   * @param tone HCT tone, measured from 0 to 100.
   * @return ARGB representation of a color with that tone.
   */
  tone(tone: number): number {
    let argb = this.cache.get(tone)
    if (argb === undefined) {
      argb = HCT.from(this.hue, this.chroma, tone).toInt()
      this.cache.set(tone, argb)
    }
    return argb
  }
}
