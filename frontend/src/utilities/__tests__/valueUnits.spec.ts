import {
  isCpuLimitEqual,
  isMemoryLimitEqual,
  isCpuLimitLarger,
  isMemoryLimitLarger,
} from '~/utilities/valueUnits';

describe('isCpuLimitEqual', () => {
  test('correctly compares non-undefined values', () => {
    expect(isCpuLimitEqual('1', '1')).toBe(true);
    expect(isCpuLimitEqual(1, '1')).toBe(true);
    expect(isCpuLimitEqual('1000m', '1')).toBe(true);
    expect(isCpuLimitEqual('1000m', 1)).toBe(true);
    expect(isCpuLimitEqual('1001m', '1')).toBe(false);
  });
  test('correctly compares undefined values', () => {
    expect(isCpuLimitEqual('1000m', undefined)).toBe(false);
    expect(isCpuLimitEqual('1', undefined)).toBe(false);
    expect(isCpuLimitEqual(1, undefined)).toBe(false);
    expect(isCpuLimitEqual(undefined, undefined)).toBe(true);
  });
});

describe('isMemoryLimitEqual', () => {
  test('correctly compares non-undefined values', () => {
    expect(isMemoryLimitEqual('1Gi', '1Gi')).toBe(true);
    expect(isMemoryLimitEqual('1Gi', '1024Mi')).toBe(true);
    expect(isMemoryLimitEqual('1Gi', '1025Mi')).toBe(false);
  });
  test('correctly compares undefined values', () => {
    expect(isMemoryLimitEqual('1Gi', undefined)).toBe(false);
    expect(isMemoryLimitEqual('1024Mi', undefined)).toBe(false);
    expect(isMemoryLimitEqual(undefined, undefined)).toBe(true);
  });
});

describe('isCpuLimitLarger', () => {
  test('correctly compares non-undefined values', () => {
    expect(isCpuLimitLarger('1', '1')).toBe(false);
    expect(isCpuLimitLarger('1', '1', true)).toBe(true);
    expect(isCpuLimitLarger(1, '1')).toBe(false);
    expect(isCpuLimitLarger(1, '1', true)).toBe(true);
    expect(isCpuLimitLarger('1000m', '1')).toBe(false);
    expect(isCpuLimitLarger('1000m', '1', true)).toBe(true);
    expect(isCpuLimitLarger('1', '1001m')).toBe(true);
  });
  test('correctly compares undefined values', () => {
    expect(isCpuLimitLarger(undefined, '1000m')).toBe(false);
    expect(isCpuLimitLarger('1000m', undefined)).toBe(false);
    expect(isCpuLimitLarger(1, undefined)).toBe(false);
    expect(isCpuLimitLarger(undefined, undefined)).toBe(false);
  });
});

describe('isMemoryLimitLarger', () => {
  test('correctly compares non-undefined values', () => {
    expect(isMemoryLimitLarger('1Gi', '1Gi')).toBe(false);
    expect(isMemoryLimitLarger('1Gi', '1Gi', true)).toBe(true);
    expect(isMemoryLimitLarger('1Gi', '1024Mi')).toBe(false);
    expect(isMemoryLimitLarger('1Gi', '1024Mi', true)).toBe(true);
    expect(isMemoryLimitLarger('1Gi', '1025Mi')).toBe(true);
  });
  test('correctly compares undefined values', () => {
    expect(isMemoryLimitLarger(undefined, '1Gi')).toBe(false);
    expect(isMemoryLimitLarger('1Gi', undefined)).toBe(false);
    expect(isMemoryLimitLarger(undefined, undefined)).toBe(false);
  });
});
