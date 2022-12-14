/**
 * @return input < 0? -1. input = 0? 0. input > 0? 1.
 */
export function signum(input: number): number {
  if (input < 0) {
    return -1
  } else if (input === 0) {
    return 0
  } else {
    return 1
  }
}

/**
 * Ensure min <= input <= max
 */
export function clamp(min: number, max: number, input: number) {
  return Math.min(Math.max(input, min), max)
}

/**
 * Linearly interpolate from start to stop, by amount (0.0 <= amount <= 1.0)
 */
export function lerp(start: number, stop: number, amount: number) {
  return (1.0 - amount) * start + amount * stop
}

/**
 * Determine the shortest angle between two angles, measured in degrees.
 */
export function differenceDegrees(a: number, b: number): number {
  return 180.0 - Math.abs(Math.abs(a - b) - 180.0)
}

/**
 * Ensure 0 <= degrees < 360
 */
export function sanitizeDegrees(degrees: number) {
  if (degrees < 0) {
    return (degrees % 360) + 360
  } else if (degrees >= 360.0) {
    return degrees % 360
  } else {
    return degrees
  }
}

/**
 * Convert radians to degrees.
 */
export function toDegrees(radians: number) {
  return (radians * 180.0) / Math.PI
}

/**
 * Convert degrees to radians.
 */
export function toRadians(degrees: number) {
  return (degrees / 180.0) * Math.PI
}
