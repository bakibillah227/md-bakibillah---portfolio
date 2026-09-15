import { describe, it, expect } from 'vitest';
import { getAmbientConfig, hexToRgb, tripletToRgb } from './ambientBackground';

describe('getAmbientConfig', () => {
  it('desktop with a fine pointer uses the full visual treatment', () => {
    const cfg = getAmbientConfig(1280, false);
    expect(cfg.particleCount).toBe(34);
    expect(cfg.shapeCount).toBe(6);
    expect(cfg.secondGlow).toBe(true);
    expect(cfg.mouseRadius).toBeGreaterThan(0);
    expect(cfg.mouseStrength).toBeGreaterThan(0);
  });

  it('tablet reduces effect density', () => {
    const cfg = getAmbientConfig(800, false);
    expect(cfg.particleCount).toBe(20);
    expect(cfg.shapeCount).toBe(3);
    expect(cfg.mouseStrength).toBeLessThan(getAmbientConfig(1280, false).mouseStrength);
  });

  it('mobile is simplified and disables mouse influence', () => {
    const cfg = getAmbientConfig(375, false);
    expect(cfg.particleCount).toBe(10);
    expect(cfg.shapeCount).toBe(2);
    expect(cfg.mouseRadius).toBe(0);
    expect(cfg.mouseStrength).toBe(0);
  });

  it('coarse pointers reduce density across all tiers', () => {
    expect(getAmbientConfig(375, true).particleCount).toBe(6);
    expect(getAmbientConfig(800, true).particleCount).toBe(12);
    expect(getAmbientConfig(1280, true).particleCount).toBe(20);
    expect(getAmbientConfig(1280, true).shapeCount).toBe(4);
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

describe('tripletToRgb', () => {
  it('parses an "r g b" token triplet', () => {
    expect(tripletToRgb('79 116 158')).toEqual({ r: 79, g: 116, b: 158 });
  });

  it('returns null for invalid input', () => {
    expect(tripletToRgb('nope')).toBeNull();
    expect(tripletToRgb(null)).toBeNull();
  });
});