import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>
    <input id="jwToken" placeholder = "Json Web Token" />
    <button id="btnConnect" >Connect</button>
    <br/>
    <span id="server-status">offline</span>
    <ul id="clients-ul"></ul>

    <form id="message-form">
    <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`
//

const jwToken = document.querySelector<HTMLInputElement>('#jwToken')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!;

btnConnect.addEventListener('click',()=>{
  if(jwToken.value.trim().length <= 0) return alert('Ingrese el JWT')
  connectToServer(jwToken.value.trim());
} )


