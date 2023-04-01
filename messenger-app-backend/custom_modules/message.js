const com = require('./com');

class Message {
  constructor(props){
    const d = new Date();
    const defaultProps = {
      id: com.uuidv4(),
      timestamp:  `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()} ${d.getUTCHours()}:${d.getUTCMinutes()}`,
      from: null,
      text: null,
      media: null,
      forAdminId: null,
      statMessage: false
    }
    Object.assign(this,defaultProps);
    Object.assign(this,props);
  }
  valid(){
    const t = this;
    if(!t.from?.valid()) return false;
    if((t.text == null && t.media == null) || (t.text?.length == 0 || t.media?.length == 0)) return false;
    return true;
  }
}

module.exports = Message;