// This is a JavaScript file

$(document).on("click", "#btnCadastro", function(){
  document.getElementById("imgIndex").src = "img/cdbarras.gif";
  window.setTimeout('$(location).attr("href", "cadastro.html")', 2500);
});

$(document).on("click", "#btnPesquisa", function(){
  $(location).attr("href", "pesquisar.html");
});

$(document).on("click", "#btnVoltar", function(){
  $(location).attr("href", "index.html");
});

$(document).on("click", "#img", function(){
  var img = $("#img").val();
  $("#imgShow").val(img);
});

$(document).on("click","#btnSalvar", function(){

  var parametros = {
    "nome": $("#nome").val(),
    "codigo": $("#codigo").val(),
    "valor": $("#valor").val(),
    "descricao": $("#descricao").val(),
    "processador": $("#processador").val(),
    "sistemaop": $("#sistemaop").val(),
    "tamtela": $("#tamtela").val(),
    "tecwifi": $("#tecwifi").val(),
    "qtcam": $("#qtcam").val(),
    "rescam": $("#rescam").val(),
    "memflash": $("#memflash").val()
  }

  $.ajax({
    type: "post", //Como enviar
    url: "https://prjcodbarras-andersonrf.c9users.io/webservice/cadastrar.php", //Para onde enviar
    data: parametros, //O que enviar
    //Se der certo
    success: function (data){
      navigator.notification.alert(data);
      navigator.notification.beep(1);
      $("#nome").val("");
      $("#codigo").val("");
      $("#valor").val("");
      $("#descricao").val("");
      $("#processador").val("");
      $("#sistemaop").val("");
      $("#tamtela").val("");
      $("#tecwifi").val("");
      $("#qtcam").val("");
      $("#rescam").val("");
      $("#memflash").val("");

    },
    //Se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });

});

function lista(){
   $.ajax({
        type:"post", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/lista.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.celular,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>"; 
            });
        $("#lista").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
};

$(document).on("change","#lista", function(){
   var codigoescolhido = $("option:selected", ("#lista")).val();
    $.ajax({
        type:"get", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/lista-um.php",//para onde enviar
        data: "codigo="+codigoescolhido,
        dataType:"json",
          //se der certo
        success: function(data){
          $("#cd").val(data.celular.cd);
          $("#nome").val(data.celular.nome);
          $("#codigo").val(data.celular.codigo)
          $("#valor").val(data.celular.valor);
          $("#descricao").val(data.celular.descricao);
          $("#processador").val(data.celular.processador);
          $("#sistemaop").val(data.celular.sistemaop);
          $("#tamtela").val(data.celular.tamtela);
          $("#tecwifi").val(data.celular.tecwifi);
          $("#qtcam").val(data.celular.qtcam);
          $("#rescam").val(data.celular.rescam);
          $("#memflash").val(data.celular.memflash);        
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});

$(document).on("click", "#btnScan", function(){
  scanBarcode();
});

function scanBarcode() {
    window.plugins.barcodeScanner.scan( function(result) {
      listascan(result.text);
    }, 
    function(error) {
       alert("Falha de escaneamento: " + error);
    }
    );
}

function listascan(resultado){
  var codigoescolhido = resultado;
    $.ajax({
        type:"get", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/listascan.php",//para onde enviar
        data: "codigo="+codigoescolhido,
        dataType:"json",
          //se der certo
        success: function(data){
          $("#cd").val(data.celular.cd);
          $("#nome").val(data.celular.nome);
          $("#codigo").val(data.celular.codigo)
          $("#valor").val(data.celular.valor);
          $("#descricao").val(data.celular.descricao);
          $("#processador").val(data.celular.processador);
          $("#sistemaop").val(data.celular.sistemaop);
          $("#tamtela").val(data.celular.tamtela);
          $("#tecwifi").val(data.celular.tecwifi);
          $("#qtcam").val(data.celular.qtcam);
          $("#rescam").val(data.celular.rescam);
          $("#memflash").val(data.celular.memflash);        
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
}

$(document).on("click", "#btnEditar", function(){
  habilita();
});

$(document).on("click", "#btnCancelar", function(){
  desabilita();
});

$(document).on("click", "#btnSalvaAlt", function(){
  var parametros = {
        "nome": $("#nome").val(),
        "codigo": $("#codigo").val(),
        "valor": $("#valor").val(),
        "descricao": $("#descricao").val(),
        "processador": $("#processador").val(),
        "sistemaop": $("#sistemaop").val(),
        "tamtela": $("#tamtela").val(),
        "tecwifi": $("#tecwifi").val(),
        "qtcam": $("#qtcam").val(),
        "rescam": $("#rescam").val(),
        "memflash": $("#memflash").val()
    };

    $.ajax({
        type:"post", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/update.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});


function habilita(){
  $("#nome").prop("readonly",false);
  $("#codigo").prop("readonly",false);
  $("#valor").prop("readonly",false);
  $("#descricao").prop("readonly",false);
  $("#processador").prop("readonly",false);
  $("#sistemaop").prop("readonly",false);
  $("#tamtela").prop("readonly",false);
  $("#tecwifi").prop("readonly",false);
  $("#qtcam").prop("readonly",false);
  $("#rescam").prop("readonly",false);
  $("#memflash").prop("readonly",false);
}
function desabilita(){
  $("#nome").prop("readonly",true);
  $("#codigo").prop("readonly",true); 
  $("#valor").prop("readonly",true);
  $("#descricao").prop("readonly",true);
  $("#processador").prop("readonly",true);
  $("#sistemaop").prop("readonly",true);
  $("#tamtela").prop("readonly",true);
  $("#tecwifi").prop("readonly",true);
  $("#qtcam").prop("readonly",true);
  $("#rescam").prop("readonly",true);
  $("#memflash").prop("readonly",true);
}

$(document).on("click", "#btnDeletar", function(){
  $.ajax({
        type:"get", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/deleta.php",//para onde enviar
        data:"cd="+$("#cd").val(),
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();//recarrega a pagina
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});