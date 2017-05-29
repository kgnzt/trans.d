
/*
  describe('from', () => {
    const { from } = iterable;

    it('throws with unknown type', () => {
      class ZooZoo {}

      (function () {
        from(new ZooZoo());
      }).should.throw('Cannot determine the iterator to create for type ZooZoo.');
    });

    it('handles an Array', () => {
      const iterable = [];

      const result = from(iterable);

      result.should.be.an.Array();
    });

    it('handles an Object', () => {
      const iterable = {};

      const result = from(iterable);

      result.should.be.an.Object();
      result.should.eql({});
    });

    it('handles a Map', () => {
      const iterable = new Map();

      const result = from(iterable);

      result.should.be.an.instanceOf(Map);
    });

    it('handles a Set', () => {
      const iterable = new Set();

      const result = from(iterable);

      result.should.be.an.instanceOf(Set);
    });
  });
*/
