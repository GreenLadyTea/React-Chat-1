const URL = 'http://localhost:3000';

class App extends React.Component
{
    constructor()
    {
        super();

        this.state =
            {
                serverMessages: []
            };

        setInterval(this.getMessages.bind(this), 1000);
    }

    postMessage(newMessage)
    {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', URL);
        xhr.send(JSON.stringify(
            {
                nick: newMessage.nick,
                message: newMessage.message
            }));

        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.error('Ошибка!');
            } else {
                this.parseMessages(xhr.response);
            }
        };

        xhr.onerror = function() {
            console.log('Запрос не удался');
        }
    }

    getMessages()
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.send();
        xhr.onload = () =>
        {
            if (xhr.status !== 200)
            {
                console.error('Ошибка!');
            } else {
                    this.parseMessages(xhr.response);
            }
        };
    }

    parseMessages(response)
    {
        const newServerMessages = JSON.parse(response);
        this.setState({
            serverMessages: newServerMessages
        })
    }

    render()
    {
        const {serverMessages} = this.state;
        return <>
            <h1>Чат</h1>
            <Form postMessage={(newMessage) => this.postMessage(newMessage)}/>
            <MessagesList messages={serverMessages}/>
        </>
     }
}