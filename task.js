const fs = require('fs');
const prompt = require("prompt-sync")()
let stocks = [];


function cekData() {
    data = fs.readFileSync('stocks.json', 'utf8');
    stocks = JSON.parse(data);
    return stocks
}
function generateId() {
    const data = fs.readFileSync('stocks.json', 'utf8');
    const stocks = JSON.parse(data);
    let lastId;
    if (stocks.length > 0) {
        lastId = stocks[stocks.length - 1].id;
    } else {
        lastId = 0;
    }
    const newId = parseInt(lastId) + 1;
    return newId;
};

function addStock() {
    if (!fs.existsSync("stocks.json")) {
        const id = `1`;
        const name = prompt('Masukkan nama barang: ');
        const price = parseInt(prompt('Masukkan harga barang: '));
        const quantity = parseInt(prompt('Masukkan kuantitas barang: '));
        stocks.push({ id, name, price, quantity });
        fs.writeFileSync('stocks.json', JSON.stringify(stocks));
        console.log('Data berhasil ditambahkan.');
    } else if (fs.existsSync("stocks.json")) {
        data = fs.readFileSync('stocks.json', 'utf8');
        stocks = JSON.parse(data);
        fs.writeFileSync('stocks.json', JSON.stringify(stocks));
        const id = `${generateId()}`;
        const name = prompt('Masukkan nama barang: ');
        const price = parseInt(prompt('Masukkan harga barang: '));
        const quantity = parseInt(prompt('Masukkan kuantitas barang: '));
        stocks.push({ id, name, price, quantity });
        fs.writeFileSync('stocks.json', JSON.stringify(stocks));
    }
};

function showStocks() {
    const data = fs.readFileSync('stocks.json', 'utf8');
    stocks = JSON.parse(data);
    console.log('Data barang:');
    stocks.forEach(stock => {
        console.log(`ID: ${stock.id}, Nama: ${stock.name}, Harga: ${stock.price}, Kuantitas: ${stock.quantity}`);
    });
};

function calculateTotalPrice() {
    cekData()
    let totalPrice = 0;
    stocks.forEach(stock => {
        totalPrice += stock.price * stock.quantity;
    });

    console.log(`Total harga semua barang: Rp. ${totalPrice}`);
};

function updateStock() {
    stocks.push(cekData())
    const id = prompt('Masukkan id barang yang ingin diupdate: ');
    const index = stocks.findIndex(stock => stock.id === id);
    if (index !== -1) {
        const field = prompt('Masukkan field yang ingin diupdate (name/price/quantity): ');
        const value = prompt('Masukkan nilai baru: ');
        stocks[index][field] = value;
        fs.writeFileSync('stocks.json', JSON.stringify(stocks));
        console.log('Data berhasil diupdate.');
    } else {
        console.log('Data barang tidak ditemukan.');
    }
    stocks = []
};

function deleteStock() {
    stocks.push(cekData())
    const id = prompt('Masukkan id barang yang ingin dihapus: ');
    const index = stocks.findIndex(stock => stock.id === id);
    if (index !== -1) {
        stocks.splice(index, 1);
        fs.writeFileSync('stocks.json', JSON.stringify(stocks));
        console.log('Data berhasil dihapus.');
    } else {
        console.log('Data barang tidak ditemukan.');
    }
    stocks = []
};

function main() {
    console.log('Aplikasi Stok Barang');
    console.log('1. Tambah Data Barang');
    console.log('2. Tampilkan Semua Data Barang');
    console.log('3. Hitung Total Harga Semua Barang');
    console.log('4. Update Data Barang');
    console.log('5. Hapus Data Barang');
    const choice = parseInt(prompt('Masukkan pilihan Anda (1-5): '));
    switch (choice) {
        case 1:
            addStock();
            break
        case 2:
            showStocks();
            break
        case 3:
            calculateTotalPrice();
            break
        case 4:
            updateStock();
            break
        case 5:
            deleteStock();
            break
        default:
            console.log('Pilihan tidak valid.');
    }
}
menu()
function menu() {
    main()
    while (true) {
        const stay = prompt('ketik y untuk lanjut, n untuk selesai: ');
        switch (stay) {
            case "y":
                main()
                continue
            default:
                process.exit(0)
        }
    }
}
