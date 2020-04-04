
var htmlGiorno = $('#day-template').html();
var templateGiorno = Handlebars.compile(htmlGiorno); // mettiamo la SOURCE ED IL TEPLATE PARLANTI
// stiampiamo il mese corrente
var dataIniziale = moment('2018-01-01'); // inseriamo la data da cui vogliamo partire
console.log(dataIniziale.month());
stampaGiorniMese(dataIniziale); // mi stampo i giorni ed il mese corrente
// a seguito del click stampare il mese successivo
stampaFestivi(0, 2018); // lo faccio partire dal mese 0 = gennaio

stampaFestivi();
$('.succ').click(function (){ // al click sul bottone succ
    dataIniziale.add(1 , "months"); // aggiungo un mese al mese corrente
    // console.log(dataIniziale);
    stampaGiorniMese(dataIniziale);
    // console.log(dataIniziale);
    console.log(dataIniziale.month());
    var mese = dataIniziale.month();
    var anno = dataIniziale.year();
    stampaFestivi(mese, anno);
    if (anno == 2019) { // se trovo l'anno 2019
        $('body').empty(); // svuoto il body
        alert("NON SEI NELL'ANNO CORRETTO"); // esce l'alert
        location.reload(); // ricarica le condizioni iniziali della pagina

    }
});
// a seguito del click stampare il mese precedente
$('.prev').click(function (){ // al click sul bottone succ
    dataIniziale.subtract(1 , "months"); // tolgo un mese al mese corrente
    // console.log(dataIniziale);
    stampaGiorniMese(dataIniziale);

    console.log(dataIniziale.month());
    var mese = dataIniziale.month();
    var anno = dataIniziale.year();
    stampaFestivi(mese, anno);
    if (anno == 2017) { // se trovo il
        $('body').empty(); // svuoto il body
        alert("NON SEI NELL'ANNO CORRETTO"); // esce l'alert
        location.reload(); // ricarica le condizioni iniziali della pagina

    }
});

function stampaFestivi(mes, ann) { // usiamo una funzione che procedera a fare un chiamata AJAX per richiamare i gg festivi dell'anno 2018
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
            year: ann,
            month: mes
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
                $('.calendar span[data-day="' + dataFestivo + '"]').addClass('festivo').append('<div>' + nomeFestivo + '</div>'); // prendi lo span quando equivalente Push il contenuto dell'oggetto
            }
        },
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
