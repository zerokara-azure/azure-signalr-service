const LOCAL_BASE_URL = 'http://localhost:7071';

const app = new Vue({
    el: '#app',
    data() { 
        return {
            stocks: []
        }
    },
    methods: {
        // 株価一覧を取得する
        async getStocks() {
            try {
                const apiUrl = `${LOCAL_BASE_URL}/api/getStocks`;
                const response = await axios.get(apiUrl);
                console.log('Stocks fetched from ', apiUrl);
                app.stocks = response.data;
            } catch (ex) {
                console.error(ex);
            }
        }
    },
    created() {
        this.getStocks();
    }
});

const connect = () => {
    // SignalR Serviceインスタンスと接続する
    const connection = new signalR.HubConnectionBuilder().withUrl(`${LOCAL_BASE_URL}/api`).build();

    connection.onclose(()  => {
        console.log('SignalR connection disconnected');
        setTimeout(() => connect(), 2000);
    });

    // 株価の更新情報をSignalR Serviceインスタンスから受信して画面に反映する
    connection.on('updated', updatedStock => {
        const index = app.stocks.findIndex(s => s.id === updatedStock.id);
        app.stocks.splice(index, 1, updatedStock);
    });

    connection.start().then(() => {
        console.log("SignalR connection established");
    });
};

connect();
