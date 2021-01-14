import React, { Component } from 'react';
import Message from './Message.js';
import LetterIcon from '../assets/mail.svg';

class Mailbox extends Component {

    constructor(props) {
        super(props);
        this.getMessages = this.getMessages.bind(this);
        this.state = {messages: []};
    }

    getMessages(){
        fetch(`/msg/read/?ssid=${this.props.ssid}`)
            .then(res => res.json())
            .then((messages) => {
                if (!Array.isArray(messages)) messages = [];
                console.log(messages);
                return this.setState({messages});
            })
            .catch(err => console.log('getMessages GET /msg/read: ERROR: ', err));
    }

    render(){

        const messages = [];

        for (let i = 0; i < this.state.messages.length; i++){
            messages.push(<Message id={`message#${i}`} key={`message#${i}`} data={this.state.messages[i]} />);
        }

        return (
            <div>
                <img src={LetterIcon} style={{height:'200px', width: '500px'}} onClick={this.props.clickEvent} />
                Messages go here: <br/>
                {messages}
                For user:
                {this.props.ssid}
            </div>
        );
    }
}
  
export default Mailbox;