
const server = new StellarSdk.Server('http://47.52.0.154:8888')
const source = StellarSdk.Keypair.fromSecret('SA3W53XXG64ITFFIYQSBIJDG26LMXYRIMEVMNQMFAQJOYCZACCYBA34L')
const destination = StellarSdk.Keypair.random()
server.transactions()
    .forLedger(1400)
    .call().then(function(r){ console.log(r); });

// get a list of transactions submitted by a particular account
server.transactions()
    .forAccount('GDO33QAVIF62OP3UMQWLTZVDYXAVRL3W6LLPJ2AHZ33IAUEZKK4DCHFK')
    .call().then(function(r){ console.log(r); });