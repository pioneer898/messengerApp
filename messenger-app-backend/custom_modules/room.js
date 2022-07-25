class Room {
  constructor(props){
    const defaultProps = {
      id: '',
      people: {},
      messages: []
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
  addPerson(person){
    const t = this;
    if(!(person.id in t.people))t.people[person.id] = person;
    return t.people[person.id];
  }
  getPerson(personId){
    const t = this;
    return t.people[personId];
  }
  addMessage(message){
    const t = this;
    t.messages.push(message)
  }
}

module.exports = Room;