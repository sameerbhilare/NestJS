/*
    Within the spec file, we already have access to the Jest framework. 
    We don't have to manually import it.
*/

describe('my test', () => {
  it('return true', () => {
    expect(true).toEqual(true);
  });
});
