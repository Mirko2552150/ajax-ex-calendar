
var htmlGiorno = $('#day-template').html();
var templateGiorno = Handlebars.compile(htmlGiorno); // mettiamo la SOURCE ED IL TEPLATE PARLANTI

var dataIniziale = moment('2018-01-01'); // inseriamo la data da cui vogliamo partire
stampaGiorniMese(dataIniziale); // mi stampo i giorni ed il mese corrente
stampaFestivi(0, 2018); // lo faccio partire dal mese 0 = gennaio
var limiteIniziale = moment('2018-01-01');
var limiteFinale = moment('2018-12-31');
$('.prev').prop('disabled', true);
$('.succ').prop('disabled', false);

var giornoMeseIniziale = dataIniziale.day();

$('.succ').click(function (){ // al click sul bottone succ
    dataIniziale.add(1 , "months"); // aggiungo un mese al mese corrente
    stampaGiorniMese(dataIniziale);
    var mese = dataIniziale.month();
    var anno = dataIniziale.year();
    $('.prev').prop('disabled', false);
    stampaFestivi(mese, anno);
    if (dataIniziale.isSameOrAfter(limiteFinale, 'months')) {
        $('.succ').prop('disabled', true);
    }
});

$('.prev').click(function (){ // al click sul bottone succ
    if(dataIniziale.isSameOrBefore(limiteIniziale)){
        alert('Hai provato ad hackerarmi! :( ');
    } else {
        dataIniziale.subtract(1, 'month');
        stampaGiorniMese(dataIniziale);
        var mese = dataIniziale.month();
        var anno = dataIniziale.year();
        stampaFestivi(mese, anno);
        $('.succ').prop('disabled', false);
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
    var giornoMeseIniziale = dataIniziale.isoWeekday();
    stampaGiorniFittizi(giornoMeseIniziale); // invochiamo funzione template gg clear
    var giorniMese = meseDaStampare.daysInMonth(); // indica i gg del mese  (in questo caso della dataIniziale)
    var nomeMese = meseDaStampare.locale('it').format('MMMM'); // richiediamo il nome mese con MMMM e in lingua IT
    var standardDay = meseDaStampare.clone();
    $('#nome-mese').text(nomeMese); // allo scatenare della funzione sovrascrivo in # nome mese il NomeMEse che dalla VAR in Ingress
    for (var i = 1; i <= giorniMese; i++) { // da uno a i giorni del mese
        var giornoDaInserire = { // creiamo oggetto per HBars
            day: i + ' ' + nomeMese,
            dataDay: standardDay.format('YYYY-MM-DD') // usiamo il nostro clone che potrò modificare, standardDay scritto = dataFestivo, cosi da poter usare selezionatore avanzato a riga 63
        }
        var templatePop = templateGiorno(giornoDaInserire); // popoliamo il template con i dati dell'oggetto
        $('.calendar').append(templatePop);
        standardDay.add(1, 'day'); // aggiungo un giorno per modificare il dataDay
    }
}

function stampaGiorniFittizi(gMeseInizi) {
    for (var i = 0; i < gMeseInizi - 1; i++) {
        var contenitore = '<div class="ggCalendario2"></div>';
        $('.calendar').append(contenitore);
    }
}
