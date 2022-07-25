class Person {
  constructor(props){
    const defaultProps = {
      id: ''
    }
    Object.assign(this,defaultProps);
    Object.assign(this,props);
  }
  valid(){
    const t = this;
    if(typeof(t.id) != 'string') return false;
    if(t.id.length == 0) return false;
    return true;
  }
}

module.exports = Person;