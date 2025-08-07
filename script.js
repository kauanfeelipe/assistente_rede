document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const optionsDiv = document.getElementById('options');
    let currentNode = 'start'; 

    const nodes = {
        'start': {
            text: 'Olá! Sou seu assistente de rede e vou te ajudar a resolver seu problema de internet. Vamos começar?',
            options: [
                { text: 'Sim, vamos lá!', next: 'checkCables' }
            ]
        },
        'checkCables': {
            text: 'Ótimo. Primeiro, por favor, verifique se todos os cabos (de força e de rede) estão bem conectados no seu roteador e no seu modem.',
            options: [
                { text: 'Já verifiquei, estão todos firmes.', next: 'checkLights' },
                { text: 'Encontrei um cabo solto e conectei.', next: 'testConnection' }
            ]
        },
        'checkLights': {
            text: 'Excelente. Agora, olhe para as luzes do seu roteador. A luz que parece um globo ou está escrita "WAN", "Internet" ou "@" está acesa e verde/azul?',
            options: [
                { text: 'Sim, está acesa e estável.', next: 'isProblemOnOneDevice' },
                { text: 'Não, está apagada ou piscando vermelho/laranja.', next: 'restartModem' }
            ]
        },
        'isProblemOnOneDevice': {
            text: 'Ok, parece que o sinal de internet está chegando bem. O problema acontece em todos os seus dispositivos (celular, TV, computador) ou em apenas um?',
            options: [
                { text: 'Acontece em todos os dispositivos.', next: 'restartRouter' },
                { text: 'Apenas em um dispositivo específico.', next: 'deviceProblem' }
            ]
        },
        'restartRouter': {
            text: 'Entendi. O próximo passo é o mais comum e eficaz: vamos reiniciar seu roteador. Tire-o da tomada, espere 30 segundos e ligue-o novamente. Aguarde uns 2 minutos até todas as luzes se estabilizarem.',
            options: [
                { text: 'Fiz isso e a internet voltou!', next: 'solutionFound' },
                { text: 'Fiz isso e o problema continua.', next: 'contactSupport' }
            ]
        },
        'restartModem': {
            text: 'Isso indica um problema de sinal. Vamos reiniciar o modem (o aparelho que recebe o cabo da rua). Desligue-o da tomada, espere 30 segundos e ligue-o de novo. Isso pode demorar alguns minutos.',
            options: [
                { text: 'Fiz isso e a luz da internet acendeu!', next: 'testConnection' },
                { text: 'Fiz isso e a luz continua apagada/vermelha.', next: 'contactSupport' }
            ]
        },
        'deviceProblem': {
            text: 'Certo. Se o problema é em um só dispositivo, tente reiniciar apenas este aparelho. Se for um computador, verifique se o Wi-Fi está ativado. Se for via cabo, veja se está bem conectado no computador.',
            options: [
                { text: 'Reiniciar o aparelho resolveu!', next: 'solutionFound' },
                { text: 'Já verifiquei tudo isso e não resolveu.', next: 'contactSupportDevice' }
            ]
        },
        'testConnection': {
            text: 'Maravilha! Parece que resolvemos. Tente abrir um site para confirmar se a internet voltou.',
            options: [
                { text: 'Sim, a internet voltou! Obrigado!', next: 'solutionFound' },
                { text: 'Ainda não voltou.', next: 'checkLights' }
            ]
        },
        'solutionFound': {
            text: 'Que bom! Fico feliz em ajudar. Problema resolvido com sucesso!',
            options: []
        },
        'contactSupport': {
            text: 'Sinto muito, parece que esgotamos as soluções básicas. O problema pode ser externo (na sua região) ou precisar de um técnico. Recomendo que você entre em contato com o suporte do seu provedor de internet.',
            options: []
        },
        'contactSupportDevice': {
            text: 'Entendi. Nesse caso, o problema parece ser uma configuração específica nesse dispositivo. Recomendo procurar ajuda de um técnico de informática ou o suporte específico do aparelho.',
            options: []
        }
    };


    function addMessage(text, sender = 'bot') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatLog.appendChild(messageElement);
        // Rola o chat para a última mensagem
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function showNode(nodeId) {
        const node = nodes[nodeId];
        currentNode = nodeId;

        addMessage(node.text);

        optionsDiv.innerHTML = '';

        node.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('option-button');
            button.addEventListener('click', () => selectOption(option));
            optionsDiv.appendChild(button);
        });
    }

    function selectOption(option) {
        addMessage(option.text, 'user');
        showNode(option.next);
    }

    // Inicia o chatbot
    showNode('start');
});