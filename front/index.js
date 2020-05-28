
$('#inputGroupSelect01').change(function(){
    $(this).find(':selected').addClass('selected')
           .siblings('option').removeClass('selected');
});

// bouton afficher les ressources
$( "#title" ).click(function() {
    var elemSelect = $('.selected').val()
    tabOfResources(elemSelect);
  });

// bouton supprimer un element
$('.btn-danger').click(function() {
    var elemSelect = $('.selected').val()
    var id = $('.identity').val()
    deleteElem(id, elemSelect)
    $('#exampleModal').modal('hide')
})  

// bouton editer un element
$('#editer').click(function() {

    var tabInput = []
    $('.modal-body :input').each(function(){
        tabInput.push($(this).val())
    })

    if(tabInput.indexOf("") !== -1){
        alert("Il faut remplir tout les champs ! ")
    } else{
        var elemSelect = $('.selected').val()
        var id = $('.identity').val()
        editElem(id, elemSelect)
        $('#exampleModal').modal('hide')
    }

    
}) 

// btn edit modal
$(document).on('click','#modalForEdit', function() {
    var elemSelect = $('.selected').val()
    var id = $(this).parent().parent().attr('id')
    modalForms(id, elemSelect)
})

// modalInfo
$(document).on('click','#modalForInfo', function() {
    var elemSelect = $('.selected').val()
    var id = $(this).parent().parent().attr('id')
    modalInfo(id, elemSelect)
})

// modal ajout
$(document).on('click','#add', function() {
    var elemSelect = $('.selected').val()
    addmodal(elemSelect)
})

// ajout elem
$('#ajouter').click(function() {
    
    var tabInput = []
    $('.modal-body-add :input').each(function(){
        tabInput.push($(this).val())
    })

    if(tabInput.indexOf("") !== -1){
        alert("Il faut remplir tout les champs ! ")
    } else{
        var elemSelect = $('.selected').val()
        addElem(elemSelect) 
        $('#addModal').modal('hide') 
    } 
}) 

// back to top 
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


const tabOfResources = function (selected) {
    $('.title').text(selected);
    $('#add').css('display', 'block').text("ajout " + selected)

    // var tab = $('<div class="test">'+selected+'</div>').appendTo('.test')
    var tabHead = $('thead tr');
    var tabBody = $('tbody');

    tabHead.children().remove();
    tabBody.children().remove();

    $.get( "http://127.0.0.1:8000/api/" + selected, function( data ) {
        $.each(data[0], function(key, value) {
            tabHead.append($('<th>').addClass('col').html(key));
        });
            tabHead.append($('<th>').addClass('col').html('edit'));
            
        if (selected == 'articles'){

            data.forEach(element => {
                tabBody.append('<tr id="'+ element.refart + '"><td scope="row">' + element.refart + '</td><td>' + element.descart + '</td><td>' + element.prixhtart + '</td><td>' + element.poidsart + '</td><td>' + element.typeart + '</td><td>' + element.qtestock + '</td><td>' + element.stockalert + '</td><td>' + element.delailiv + '</td><td><button id="modalForEdit" class="btn btn-outline-success" type="button">Editer</button></td></tr>')
            });

        } else if (selected == 'clients'){

            tabHead.append($('<th>').addClass('col').html('Info'));

            data.forEach(element => {
                tabBody.append('<tr id="'+ element.id + '"><td scope="row">' + element.id + '</td><td>' + element.nomcli + '</td><td>' + element.adrcli + '</td><td>' + element.villecli + '</td><td><button id="modalForEdit" class="btn btn-outline-success" type="button">Editer</button></td><td><button id="modalForInfo" class="btn btn-outline-info" type="button">Info</button></td></tr>')
            });

        } else {
            tabBody.append('<div class="alert alert-danger" role="alert">Cette ressource n\'existe pas !</div>')
        }
      });
}

const modalForms = function (id, elemSelect) {

    $('#exampleModal').modal('show')

    var modal = $('.modal-body')
    modal.children().remove();
    $.get( "http://127.0.0.1:8000/api/" + elemSelect + '/' + id, function( data ) {
        
        if (elemSelect == 'articles'){

            modal.append('<div class="input-group mb-3"><div class="input-group-prepend" ><span class="input-group-text" id="basic-addon1">Refart</span></div><input type="text" class="form-control identity" placeholder="Refart" aria-label="Username" aria-describedby="basic-addon1" value="' + data.refart + '" readonly></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">descart</span></div><input type="text" class="form-control" placeholder="descart" aria-label="Username" aria-describedby="basic-addon1" value="' + data.descart + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">prixhtart</span></div><input type="number" class="form-control" placeholder="prixhtart" aria-label="Username" aria-describedby="basic-addon1" value="' + data.prixhtart + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">poidsart</span></div><input type="number" class="form-control" placeholder="poidsart" aria-label="Username" aria-describedby="basic-addon1" value="' + data.poidsart + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">typeart</span></div><input type="text" class="form-control" placeholder="typeart" aria-label="Username" aria-describedby="basic-addon1" value="' + data.typeart + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">qtestock</span></div><input type="number" class="form-control" placeholder="qtestock" aria-label="Username" aria-describedby="basic-addon1" value="' + data.qtestock + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">stockalert</span></div><input type="number" class="form-control" placeholder="stockalert" aria-label="Username" aria-describedby="basic-addon1" value="' + data.stockalert + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">delailiv</span></div><input type="number" class="form-control" placeholder="delailiv" aria-label="Username" aria-describedby="basic-addon1" value="' + data.delailiv + '"></div>')

        } else if (elemSelect == 'clients') {

            modal.append('<div class="input-group mb-3"><div class="input-group-prepend" ><span class="input-group-text" id="basic-addon1">id</span></div><input type="number" class="form-control identity" placeholder="id" aria-label="Username" aria-describedby="basic-addon1" value="' + data.id + '" readonly></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">nomcli</span></div><input type="text" class="form-control" placeholder="nomcli" aria-label="Username" aria-describedby="basic-addon1" value="' + data.nomcli + '"></div><div class="input-group mb-3"><div class="input-group-prepend" ><span class="input-group-text" id="basic-addon1">adrcli</span></div><input type="text" class="form-control identity" placeholder="adrcli" aria-label="Username" aria-describedby="basic-addon1" value="' + data.adrcli + '"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">villecli</span></div><input type="text" class="form-control" placeholder="villecli" aria-label="Username" aria-describedby="basic-addon1" value="' + data.villecli + '"></div>')

        } else {
            modal.append('<div class="alert alert-danger" role="alert">Oups il y a un soucis :/</div>')
        }
    })
}

const deleteElem = function (id, elemSelect) {

    $.ajax({ url: "http://127.0.0.1:8000/api/" + elemSelect + '/' + id,
             method: "DELETE" })
            .then(function () {
                $('#'+id).fadeOut();
            })
            .catch(function (err) {
                alert('Impossible de supprimer car le client a des commandes')
            });
}

const editElem = function (id, elemSelect) {

    var tab = []

    $('.modal-body :input').each(function(){
        var input = $(this);
        tab.push(input.val())
    })

    if (elemSelect == 'articles'){

        var json = {
            "refart":"" + tab[0] + "",
            "descart": "" + tab[1] + "",
            "prixhtart": + tab[2],
            "poidsart": + tab[3],
            "typeart": "" + tab[4] + "",
            "qtestock": + tab[5],
            "stockalert": + tab[6],
            "delailiv": + tab[7],
        }

    } else if (elemSelect == 'clients'){

        var json = {
            "nomcli": "" + tab[1] + "",
            "adrcli": "" + tab[2] + "",
            "villecli":"" + tab[3] + "",
        }
    }

    var request = JSON.stringify(json)

    $.ajax({ url: "http://127.0.0.1:8000/api/" + elemSelect + '/' + id,
             method: "PUT",
             contentType: 'application/json',
             data: request,
             dataType: "json" 
            })
            .done(function() {
                $( "#title" ).trigger("click");
                alert( "Vos modification ont été enregistré");
            })
            .catch(function (err) {
                console.log(err)
                alert('Impossible d\'editer contacter votre administrateur')
            });
}

const addmodal = function (elemSelect) {

    $('#addModal').modal('show')

    var modal = $('.modal-body-add')
    modal.children().remove();

    if (elemSelect == 'articles'){

        modal.append('<div class="input-group mb-3"><div class="input-group-prepend" ><span class="input-group-text" id="basic-addon1">Refart</span></div><input type="text" class="form-control identity" placeholder="Refart" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">descart</span></div><input type="text" class="form-control" placeholder="descart" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">prixhtart</span></div><input type="number" class="form-control" placeholder="prixhtart" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">poidsart</span></div><input type="number" class="form-control" placeholder="poidsart" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">typeart</span></div><input type="text" class="form-control" placeholder="typeart" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">qtestock</span></div><input type="number" class="form-control" placeholder="qtestock" aria-label="Username" aria-describedby="basic-addon1"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">stockalert</span></div><input type="number" class="form-control" placeholder="stockalert" aria-label="Username" aria-describedby="basic-addon1"></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">delailiv</span></div><input type="number" class="form-control" placeholder="delailiv" aria-label="Username" aria-describedby="basic-addon1"></div>')

    } else if (elemSelect == 'clients') {

        modal.append('<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">nomcli</span></div><input type="text" class="form-control" placeholder="nomcli" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend" ><span class="input-group-text" id="basic-addon1">adrcli</span></div><input type="text" class="form-control identity" placeholder="adrcli" aria-label="Username" aria-describedby="basic-addon1" required></div><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">villecli</span></div><input type="text" class="form-control" placeholder="villecli" aria-label="Username" aria-describedby="basic-addon1" required></div>')

    } else {
        modal.append('<div class="alert alert-danger" role="alert">Oups il y a un soucis :/</div>')
    }
}

const addElem = function(elemSelect) {

    var tab = []
    // if ($('.modal-body-add :input').val() != ''){}
    $('.modal-body-add :input').each(function(){
        
        var input = $(this);
        tab.push(input.val())
    })

    if (elemSelect == 'articles'){

        var json = {
            "refart":"" + tab[0] + "",
            "descart": "" + tab[1] + "",
            "prixhtart": + tab[2],
            "poidsart": + tab[3],
            "typeart": "" + tab[4] + "",
            "qtestock": + tab[5],
            "stockalert": + tab[6],
            "delailiv": + tab[7],
        }

    } else if (elemSelect == 'clients'){

        var json = {
            "nomcli": "" + tab[0] + "",
            "adrcli": "" + tab[1] + "",
            "villecli":"" + tab[2] + "",
        }
    }

    var request = JSON.stringify(json)
    
    $.ajax({ url: "http://127.0.0.1:8000/api/" + elemSelect,
             method: "POST",
             contentType: 'application/json',
             data: request,
             dataType: "json" 
            })
            .done(function() {
                $( "#title" ).trigger("click");
                alert( "Ajout réussi");
            })
            .catch(function (err) {
                console.log(err)
                alert('Impossible d\'ajouter contacter votre administrateur')
            });
}

const modalInfo = function(id, elemSelect) {

    $('#infoModal').modal('show')

    var modal = $('.modal-body-info')
    modal.children().remove();
    
    $.get( "http://127.0.0.1:8000/api/commandes?idclient=" + id + "&order%5Bdatecde%5D=asc", function( data ) {
        console.log(data)
        var chiffreAf = 0;
        var dataChart = [{x: 2017, y: 1}];
        data.forEach(element => {

            var d = new Date(element.datecde);
            var year = d.getFullYear()
            
            $.each(element.refart, function(key, value) {

                
                chiffreAf += value.prixhtart;
                
                dataChart.push({x: year, y: chiffreAf})
            })

        });
        console.log(dataChart)
        

        modal.append('<p>Nombre de Commande : ' + data.length + '</p><p>CA : ' + chiffreAf + ' €</p>')
        modal.append('<div id="chartContainer" style="height: 370px; width: 100%;"></div>')

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "dark2",
            title:{
                text: "Chiffre affaire"
            },
            axisX:{
                title: "Date",
                valueFormatString: "####",
                interval: 2
            },
            axisY:{
                logarithmic: true, //change it to false
                title: "Profit en EUR",
                prefix: "€",
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                gridThickness: 0,
                lineThickness: 1,
                //includeZero: false,
                labelFormatter: addSymbols
            },
            legend:{
                verticalAlign: "top",
                fontSize: 16,
                dockInsidePlotArea: true
            },
            data: [{
                type: "line",
                xValueFormatString: "####",
                yValueFormatString: "$#,##0.##",
                showInLegend: true,
                name: "Evolution",
                dataPoints: dataChart
            }]
        });
        chart.render();
        
        function addSymbols(e){
            var suffixes = ["", "K", "M", "B"];
        
            var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
            if(order > suffixes.length - 1)
                order = suffixes.length - 1;
        
            var suffix = suffixes[order];
            return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
        } 
    })
}



   
