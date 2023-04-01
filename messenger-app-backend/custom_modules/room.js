const Message = require("./message");
const Person = require("./person");

class Room {
  constructor(props){
    const defaultProps = {
      id: '',
      people: {},
      messages: [],
    }
    Object.assign(this,defaultProps);
    Object.assign(this,props);
    this.addPerson(new Person({id: 'System'}));
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
  addStatMessage(person){
    const t = this;
    var distributionString = '';
    var distribution = t.getMessageDistribution();
    for(var k in distribution){
      distributionString += `${distribution[k].personId}: ${distribution[k].pctOfTotalMessages*100}% \n`
    }

    var newMessage = new Message({
      from: t.people['System'],
      text: `Current Stats: \n People: ${t.getCountOfPeople()} \n Average Message Length: ${t.getAverageMessageLength()} \n Distribution: \n ${distributionString}`,
      forAdminId: person.id
    });
    t.addMessage(newMessage);
  }
  getCountOfPeople(){
    const t = this;
    var count = 0;
    for(var k in t.people){
      if(k != 'System') count++;
    }
    return count;
  }
  getAverageMessageLength(){
    const t = this;
    var messages = t.getNonSystemMessages();
    var messageCount = messages.length;
    var messageTextLengthSum = 0;
    for(var m=0;m<messages.length;m++){
      messageTextLengthSum += messages[m].text.length;
    }
    return messageTextLengthSum/messageCount;
  }
  getMessageDistribution(){
    const t = this;
    var messages = t.getNonSystemMessages();
    var messageCounts = {};
    for(var m=0;m<messages.length;m++){
      if(!(messages[m].from.id in messageCounts)) messageCounts[messages[m].from.id] = 0;
      messageCounts[messages[m].from.id] ++
    }
    var messageDistribution = [];
    for(var k in messageCounts){
      this
      messageDistribution.push({
        personId: k,
        pctOfTotalMessages: messageCounts[k]/messages.length
      });
    }
    return messageDistribution;
  }
  getNonSystemMessages(){
    const t = this;
    return t.messages.filter(e => e.forAdminId == null);
  }
  getMessages(person){
    const t = this;
    var messages = t.messages.filter(e => e.forAdminId == person.id || e.forAdminId == null);
    return messages;
  }
}

module.exports = Room;