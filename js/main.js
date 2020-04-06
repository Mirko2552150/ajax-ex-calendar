
var htmlGiorno = $('#day-template').html();
var templateGiorno = Handlebars.compile(htmlGiorno); // mettiamo la SOURCE ED IL TEPLATE PARLANTI
// stiampiamo il mese corrente
var dataIniziale = moment('2018-01-01'); // inseriamo la data da cui vogliamo partire
stampaGiorniMese(dataIniziale); // mi stampo i giorni ed il mese corrente
// a seguito del click stampare il mese successivo
stampaFestivi(0, 2018); // lo faccio partire dal mese 0 = gennaio

var dataIniziale = moment('2018-01-01');
var limiteIniziale = moment('2018-01-01');
var limiteFinale = moment('2018-12-31');

$('.succ').click(function (){ // al click sul bottone succ
    dataIniziale.add(1 , "months"); // aggiungo un mese al mese corrente
    $('.prev').prop('disabled', false);
    stampaGiorniMese(dataIniziale);
    var mese = dataIniziale.month();
    var anno = dataIniziale.year();
    stampaFestivi(mese, anno);
    if (anno == 2019) { // se trovo l'anno 2019
        $('body').empty(); // svuoto il body
        alert("NON SEI NELL'ANNO CORRETTO"); // esce l'alert
        location.reload(); // ripristina la pagina iniziale (esempio refresh)
    }
});

// a seguito del click stampare il mese precedente
$('.prev').click(function (){ // al click sul bottone succ
    if(dataIniziale.isSameOrBefore(limiteIniziale)){
         alert('Hai provato ad hackerarmi! :( ');
    } else {
        dataIniziale.subtract(1, 'month');
        stampaGiorniMese(dataIniziale);
        var mese = dataIniziale.month();
        var anno = dataIniziale.year();
        stampaFestivi(mese, anno);
        if(dataIniziale.isSameOrBefore(limiteIniziale)) {
           $('.prev').prop('disabled', true);
        }
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
            console.log(data.response);
            var festivita = data.response; // var richiamando dot notation
            for (var i = 0; i < festivita.length; i++) { // cicliamo sulla lunghezza dell'arrey
                var festivo = festivita[i]; // diamo una var agli iesimi contenuti (in questo caso oggetti)
                var nomeFestivo = festivo.name;
                var dataFestivo = festivo.date;
                $('.calendar span[data-day="' + dataFestivo + '"]').addClass('festivo').append('<div>' + nomeFestivo + '</div>'); // cerco  il S.Avan. = al data:dataDay cosi da trovare le festivita
            }
        },
    });
}

function stampaGiorniMese(meseDaStampare) {
    $('.calendar').empty(); // ad ogni click cancello il contenuto
    var giorniMese = meseDaStampare.daysInMonth(); // indica i gg del mese  (in questo caso della dataIniziale)
    var nomeMese = meseDaStampare.locale('it').format('MMMM'); // richiediamo il nome mese con MMMM e in lingua IT
    var standardDay = meseDaStampare.clone();
    $('#nome-mese').text(nomeMese); // allo scatenare della funzione sovrascrivo in # nome mese il NomeMEse che dalla VAR in Ingress
    for (var i = 1; i <= giorniMese; i++) { // da uno a i giorni del mese
        // $('.calendar').append('<div class="ggCalendario">' + i + ' ' + nomeMese + '</div>');
        var giornoDaInserire = { // creiamo oggetto per HBars
            day: i + ' ' + nomeMese,
            dataDay: standardDay.format('YYYY-MM-DD') // usiamo il nostro clone che potrò modificare, standardDay scritto = dataFestivo, cosi da poter usare selezionatore avanzato a riga 63
        }
        var templatePop = templateGiorno(giornoDaInserire); // popoliamo il template con i dati dell'oggetto
        $('.calendar').append(templatePop);
        standardDay.add(1, 'day'); // aggiungo un giorno per modificare il dataDay
    }
}
