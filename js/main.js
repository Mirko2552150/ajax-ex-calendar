// moment().format();
// // console.log(moment().format());

// var now = moment().locale('it').format("dddd"); // STAMPIANO IL GG CORRENTE si configura con la data del momento della generazione
// console.log(now);
//
// var now2 = moment();
// console.log(now2.month() + 1 ); // mettiamo il + 1 perchè si parte da 0
//
//
// var dataAttuale = moment();
// // console.log(dataAttuale);
//
// var dataAttuale = moment();
// var dataAttuale1 = dataAttuale;
// var dataAttualeMoment = moment(dataAttuale);
// var dataAttualeClone = dataAttuale.clone();
//
// console.log(dataAttuale1.format('DD')); // stampa il giorno corrente
//
// dataAttuale.add(7, "days");
// console.log(dataAttuale.format('DD')); // stampa il giorno corrente +7 days
// console.log(dataAttuale1.format('DD')); // stampa il giorno corrente +7 days
// console.log(dataAttualeMoment.format('DD')); // stampa il giorno corrente
// console.log(dataAttualeClone.format('DD')); // stampa il giorno corrente
//
// var fineMese  = moment().endOf("month"); // ci indica il giono finale del mese
// console.log(fineMese);
//
// var prova = moment('2010-10-20').isBetween('2010-01-01', '2012-01-01', 'year'); //false il 2010 NON è tra il 2010 e il 2012
// var prova2 = moment('2010-10-20').isBetween('2009-12-31', '2012-01-01', 'year'); //true il 2010 è tra il 2009 e il 2012
// console.log(prova);
// console.log(prova2);

var htmlGiorno = $('#day-template').html();
var templateGiorno = Handlebars.compile(htmlGiorno); // mettiamo la SOURCE ED IL TEPLATE PARLANTI
// stiampiamo il mese corrente
var dataIniziale = moment('2018-01-01'); // inseriamo la data da cui vogliamo partire
// console.log(dataIniziale);
stampaGiorniMese(dataIniziale); // mi stampo i giorni ed il mese corrente
// a seguito del click stampare il mese successivo
stampaFestivi();
$('.succ').click(function (){ // al click sul bottone succ
    dataIniziale.add(1 , "months"); // aggiungo un mese al mese corrente
    // console.log(dataIniziale);
    stampaGiorniMese(dataIniziale)
    console.log(dataIniziale);
    var meseAjax = dataIniziale.clone().format('mm');
    console.log(meseAjax);
    stampaFestivi();

});
// a seguito del click stampare il mese precedente
$('.prev').click(function (){ // al click sul bottone succ
    dataIniziale.subtract(1 , "months"); // tolgo un mese al mese corrente
    // console.log(dataIniziale);
    stampaGiorniMese(dataIniziale);
    // stampaFestivi(meseAjax);

});

function stampaFestivi(){ // usiamo una funzione che procedera a fare un chiamata AJAX per richiamare i gg festivi dell'anno 2018
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
            year: 2018,
            month: 0
        },
        success: function (data) { // al successo della chiamata
            // console.log(data);
            var festivita = data.response; // var richiamando dot notation
            for (var i = 0; i < festivita.length; i++) { // cicliamo sulla lunghezza dell'arrey
                var festivo = festivita[i]; // diamo una var agli iesimi contenuti (in questo caso oggetti)
                // console.log(festivo);
                var nomeFestivo = festivo.name;
                var dataFestivo = festivo.date;
                // console.log(nomeFestivo);
                // console.log(dataFestivo);
                $('.calendar span[data-day="' + dataFestivo + '"]').addClass('festivo').append('<div>' + nomeFestivo + '</div>');
            }

        }
    });
}

function stampaGiorniMese(meseDaStampare) {
    $('.calendar').empty(); // ad ogni click cancello il contenuto
    var giorniMese = meseDaStampare.daysInMonth(); // indica i gg del mese  (in questo caso della dataIniziale)
    // console.log(giorniMese);
    var nomeMese = meseDaStampare.locale('it').format('MMMM'); // richiediamo il nome mese con MMMM e in lingua IT
    // console.log(nomeMese);
    var standardDay = meseDaStampare.clone();
    $('#nome-mese').text(nomeMese); // allo scatenare della funzione sovrascrivo in # nome mese il NomeMEse che dalla VAR in Ingress
    for (var i = 1; i <= giorniMese; i++) { // da uno a i giorni del mese
        // console.log(i + ' ' + nomeMese); // il contatore da 1 a ìl numero di gg
        // $('.calendar').append('<div class="ggCalendario">' + i + ' ' + nomeMese + '</div>');
        var giornoDaInserire = { // creiamo oggetto per HBars
            day: i + ' ' + nomeMese,
            dataDay: standardDay.format('YYYY-MM-DD') // usiamo il nostro clone che potrò modificare
        }
        var templatePop = templateGiorno(giornoDaInserire); // popoliamo il template con i dati dell'oggetto
        $('.calendar').append(templatePop);
        standardDay.add(1, 'day'); // aggiungo un gg ad ogni ciclo per ogni data contenuto nella SPAN
    }
}
