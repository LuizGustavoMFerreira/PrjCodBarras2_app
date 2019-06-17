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

$(document).on("click","#btnSalvar", function(){

  var parametros = {
    "nome": $("#nome").val(),
    "cod": $("#cod").val(),
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
      navigator.notification.alert("Certo:"+data);
      navigator.notification.beep(1);
      $("#nome").val("");
      $("#cod").val("");
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

function pesquisa(){
   $.ajax({
        type:"post", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/lista.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.celular,function(i,dados){
              itemlista += "<option value='"+dados.id+"'>"+dados.nome+"</option>"; 
            });
        $("#pesquisa").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });        
};

$(document).on("change","#pesquisa", function(){
   var codigoescolhido = $("option:selected", ("#pesquisa")).val();
    $.ajax({
        type:"get", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/lista-um.php",//para onde enviar
        data: "id="+codigoescolhido,
        dataType:"json",
          //se der certo
        success: function(data){
          $("#id").val(data.celular.id);
          $("#nome").val(data.celular.nome);
          $("#cod").val(data.celular.codigo)
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

function habilita(){
  $("#nome").prop("readonly",false);
  $("#cod").prop("readonly",false);
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
  $("#cod").prop("readonly",true); 
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
        data: "cod="+codigoescolhido,
        dataType:"json",
          //se der certo
        success: function(data){
          $("#id").val(data.celular.id);
          $("#nome").val(data.celular.nome);
          $("#cod").val(data.celular.codigo)
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
        "cod": $("#cod").val(),
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

$(document).on("click", "#btnDeletar", function(){
  $.ajax({
        type:"get", //como enviar
        url:"https://prjcodbarras-andersonrf.c9users.io/webservice/deleta.php",//para onde enviar
        data:"id="+$("#id").val(),
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