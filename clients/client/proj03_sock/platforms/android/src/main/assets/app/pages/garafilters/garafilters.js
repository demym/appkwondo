var page;
var context;
var closeCallback;

var filters={}

exports.pageLoaded = function (args) {
    page = args.object;

}

function onShownModally(args) {
    context = args.context;
    closeCallback = args.closeCallback;
    filters=context.filters;
    console.log("filters",JSON.stringify(filters));

    var filtercampi=["sesso","categoria","medaglie","quadrato"];

    filtercampi.forEach(function(item,idx){ 
        var btn=page.getViewById(item);
        if (filters.hasOwnProperty(item)){
            btn.text=item.toUpperCase()+" ("+filters[item].toUpperCase()+")";
            //btn.css="background-color: yellow";
        } else {
            btn.text=item.toUpperCase()+" (Qualsiasi)";
            //btn.style.backgroundColor = new colorModule.Color("D");
        }

    })

}

exports.applyFilters=function(args){
    //alert(JSON.stringify(filters));
    closeCallback(filters); 
}

exports.setFilter = function (args) {
    var btn = args.object;
    var id = btn.id;
    console.log("pressed " + id);

    var opt_sesso=["Qualsiasi","M","F"];
    var opt_categoria=["Qualsiasi","esordienti","cadetti a","cadetti b","junior","senior a","senior b"];
    var opt_medaglie=["Qualsiasi","oro","argento","bronzo"];
    var opt_quadrato=["Qualsiasi","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];

    opt_categoria.forEach(function(item,idx){
        item=item.toUpperCase();
    })

    var options=[];

    if (id=="sesso") options=opt_sesso;
    if (id=="categoria") options=opt_categoria;
    if (id=="medaglie") options=opt_medaglie;
    if (id=="quadrato") options=opt_quadrato;



    var dialogs = require("ui/dialogs");
    dialogs.action({
        message: "Seleziona "+id,
        cancelButtonText: "Annulla",
        actions: options
    }).then(function (result) {
        console.log("Dialog result: " + result)

        if (result!="Annulla"){
            var but=page.getViewById(id);

            if (result!="Qualsiasi"){
                but.text=id.toUpperCase()+" ("+result+")";
                filters[id]=result;
            } else {
                but.text=id.toUpperCase()+" (Qualsiasi)";
                delete filters[id];
            }

        }
    });
}

exports.resetFilters=function(args){
    filters={};
     closeCallback(filters); 

}


exports.onShownModally=onShownModally;