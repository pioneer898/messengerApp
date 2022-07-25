const com = require('./com');

class Message {
  constructor(props){
    const defaultProps = {
      id: com.uuidv4(),
      from: null,
      text: null,
      media: null
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
  json(){
    const t = this;
    return JSON.stringify({
      id: t.id,
      from: t.from,
      text: t.text,
      media: t.media
    })
  }
}

module.exports = Message;