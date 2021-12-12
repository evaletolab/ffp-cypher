const assert = require('chai').assert;
const should = require("chai").should();


describe('chai', function() {

  it('assert', function(done){
    let foo = 'bar'
      , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
    
    assert.typeOf(foo, 'string'); // without optional message
    assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
    assert.equal(foo, 'bar', 'foo equal `bar`');
    assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
    assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');    
    done();
  });

  it('should',done=>{
    const foo = 'bar'
        , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
  
    should.not.exist(undefined);
    should.exist({});

    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.lengthOf(3);
    beverages.should.have.property('tea').with.lengthOf(3);
  
    done();
  });

  xit('should-async',done=>{
    done();
  });

  xit('should-throw',done=>{
    done();
  });



});
