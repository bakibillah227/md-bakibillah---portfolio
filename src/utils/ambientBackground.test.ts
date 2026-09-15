import { describe, it, expect } from 'vitest';
import { getAmbientConfig, hexToRgb } from './ambientBackground';

describe('getAmbientConfig', () => {
  it('desktop with a fine pointer uses the full subtle effect', () => {
    const cfg = getAmbientConfig(1280, false);
    expect(cfg.particleCount).toBe(26);
    expect(cfg.mouseRadius).toBeGreaterThan(0);
    expect(cfg.mouseStrength).toBeGreaterThan(0);
  });

  it('tablet reduces particles and weakens mouse influence', () => {
    const cfg = getAmbientConfig(800, false);
    expect(cfg.particleCount).toBe(14);
    expect(cfg.mouseStrength).toBeLessThan(getAmbientConfig(1280, false).mouseStrength);
  });

  it('mobile is minimal and disables mouse influence', () => {
    const cfg = getAmbientConfig(375, false);
    expect(cfg.particleCount).toBe(8);
    expect(cfg.mouseRadius).toBe(0);
    expect(cfg.mouseStrength).toBe(0);
  });

  it('coarse pointers reduce particle counts across all tiers', () => {
    expect(getAmbientConfig(375, true).particleCount).toBe(5);
    expect(getAmbientConfig(800, true).particleCount).toBe(8);
    expect(getAmbientConfig(1280, true).particleCount).toBe(12);
  });

  it('coarse pointers never get mouse influence', () => {
    expect(getAmbientConfig(1280, true).mouseRadius).toBe(0);
    expect(getAmbientConfig(1280, true).mouseStrength).toBe(0);
  });
});

describe('hexToRgb', () => {
  it('parses a 6-digit hex color', () => {
    expect(hexToRgb('#2B664C')).toEqual({ r: 43, g: 102, b: 76 });
  });

  it('accepts a hex color without the hash', () => {
    expect(hexToRgb('C06429')).toEqual({ r: 192, g: 100, b: 41 });
  });

  it('falls back to the accent color for invalid input', () => {
    expect(hexToRgb('nope')).toEqual({ r: 43, g: 102, b: 76 });
  });
});
