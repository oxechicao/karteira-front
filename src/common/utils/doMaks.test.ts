import { doMask, moneyMask } from "@common/utils/doMask";

describe('doMask', () => {
  it('should correctly apply a basic mask (left-to-right)', () => {
    const result = doMask('123456', '#-#-#');
    expect(result).toBe('1-2-3');
  });

  it('should correctly handle an empty value', () => {
    const result = doMask('', '#-#-#');
    expect(result).toBe('');
  });

  it('should correctly handle an empty pattern', () => {
    const result = doMask('123456', '');
    expect(result).toBe('');
  });

  it('should correctly apply a mask with special characters', () => {
    const result = doMask('123456', '###.###');
    expect(result).toBe('123.456');
  });

  it('should stop applying the mask when the value is fully consumed', () => {
    const result = doMask('123', '###.###');
    expect(result).toBe('123');
  });

  it('should apply a reversed mask correctly', () => {
    const result = doMask('1234', '###.###', { reverse: true });
    expect(result).toBe('1.234');
  });

  it('should apply a custom character pattern', () => {
    const result = doMask('ABCDEF', '**-**', { charPattern: '*' });
    expect(result).toBe('AB-CD');
  });

  it('should correctly handle a value shorter than the mask length', () => {
    const result = doMask('12', '###.###.###');
    expect(result).toBe('12');
  });

  it('should correctly handle a reversed mask with shorter value', () => {
    const result = doMask('12', '###.###', { reverse: true });
    expect(result).toBe('12');
  });
});

describe('moneyMask', () => {
  it('should format a value into a money mask pattern', () => {
    const result = moneyMask('123456');
    expect(result).toBe('1.234,56');
  });

  it('should handle an empty value gracefully', () => {
    const result = moneyMask('');
    expect(result).toBe('');
  });

  it('should handle a value shorter than the money mask pattern', () => {
    const result = moneyMask('12');
    expect(result).toBe('0,12');
  });

  it('should handle non-numeric input gracefully', () => {
    const result = moneyMask('abcd');
    expect(result).toBe('');
  });
});