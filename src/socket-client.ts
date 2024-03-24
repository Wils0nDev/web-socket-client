import { Manager, Socket } from "socket.io-client"


let socket : Socket;
export const connectToServer = ( token : string) =>{ 

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders: {
            hola:'mundo',
            authentication: token
        }
    });

    socket?.removeAllListeners(); //*Aqui le decimos que si existe el tocket que borre todos los anteriores
    socket = manager.socket('/'); //aqui nos estamos conectado al namespace (root)
    addListeners(/*socket*/) //* si pasamos el token, este enviara el token antiguo que existía
    
}

//*Aqui cremos listeners que basicamente son los socket.on
//! Al enviar el token antiguo generara problemas al emitir el mensaje, 
//! ya que el socket que esta dentro del "scope" de la función es angtiguo
const addListeners = (/*socket : Socket*/) => {
    //*Para solucionar el problema, mejor hacemos uso de socket global (line 4)
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUL = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput =  document.querySelector<HTMLInputElement>('#message-input')!;
    const messageUL =  document.querySelector<HTMLInputElement>('#messages-list')!;

    socket.on('connect', () =>{
        serverStatusLabel.innerHTML = 'connected';
    })

    socket.on('disconnect', () =>{
        serverStatusLabel.innerHTML = 'disconnected'
    })

    socket.on('clients-updated',(clients:string[])=>{
        let clientsHtml = '';
        clients.forEach(ClientId => {
            clientsHtml += `<li>${ClientId}</li>`
        });

        clientsUL.innerHTML = clientsHtml
    })

    //* Aqui vamos a emitir un mensaje hacia el backend, para que este sea encargado de distribuir la información
    messageForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        if( messageInput?.value.trim().length <= 0 ) return;

        
        socket.emit('message-from-client', 
        {id:'YO!!', message: messageInput.value}
        );

        messageInput.value = '';

    })

    socket.on('message-from-server', (payload : {fullName:  string, message:string})=>{
            
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <strong>${payload.message}</strong>
            </li>
        ` 
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messageUL.append(li);
    });
}