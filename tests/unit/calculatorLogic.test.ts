import {
  calculateTotalLoad,
  checkSafetyStatus,
  getRecommendation,
  getSafetyMessage,
} from '../../utils/calculatorLogic';

describe('calculatorLogic', () => {
  it('calculates total load in kg and tons', () => {
    const result = calculateTotalLoad(25, 40, 8);
    expect(result.kg).toBe(8000);
    expect(result.tons).toBe(8);
  });

  it('flags dangerous status for heavy total tonnage', () => {
    expect(checkSafetyStatus(5.1, 20)).toBe(true);
    expect(checkSafetyStatus(4.9, 26)).toBe(true);
    expect(checkSafetyStatus(4.9, 20)).toBe(false);
  });

  it('returns recommendation by payload band', () => {
    expect(getRecommendation(20).productUrl).toBe('/products/schmalz/vacuum-tube-lifter');
    expect(getRecommendation(60).label).toContain('JumboErgo');
    expect(getRecommendation(120).productUrl).toBe('/products/schmalz/vacumaster');
    expect(getRecommendation(160).productUrl).toBe('/products/binar/qla-50i-om');
  });

  it('returns safety message based on weight and danger', () => {
    expect(getSafetyMessage(false, 30)).toContain('manual lifting limit');
    expect(getSafetyMessage(true, 20)).toContain('high risk');
    expect(getSafetyMessage(false, 20)).toContain('within factory ergonomic standards');
  });
});
