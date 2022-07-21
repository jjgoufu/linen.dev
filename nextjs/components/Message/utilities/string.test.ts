import { truncate, decodeHTML } from './string';

describe('#truncate', () => {
  it('truncates text to 223 characters', () => {
    const text = 'foo'.repeat(100);
    const truncated = truncate(text);
    expect(truncated.length).toEqual(223);
    expect(truncated.endsWith('...')).toBeTruthy();
  });

  describe('when text is shorter than 220 characters', () => {
    it('does not truncate it', () => {
      const text = 'foo';
      expect(truncate(text)).toEqual(text);
    });
  });
});

describe('#decodeHTML', () => {
  it('replaces &lt; with <', () => {
    const code = '&lt;';
    expect(decodeHTML(code)).toEqual('<');
  });

  it('replaces &gt; with >', () => {
    const code = '&gt;';
    expect(decodeHTML(code)).toEqual('>');
  });

  it('replaces &amp; with &', () => {
    const code = '&amp;';
    expect(decodeHTML(code)).toEqual('&');
  });

  it('replaces &quot; with "', () => {
    const code = '&quot;';
    expect(decodeHTML(code)).toEqual('"');
  });

  it("replaces &apos; with '", () => {
    const code = '&apos;';
    expect(decodeHTML(code)).toEqual("'");
  });

  it('is idempotent', () => {
    const code = '&lt;';
    expect(decodeHTML(decodeHTML(code))).toEqual('<');
  });

  describe('when text is undefined', () => {
    it('returns an empty string', () => {
      expect(decodeHTML(undefined)).toEqual('');
    });
  });
});
