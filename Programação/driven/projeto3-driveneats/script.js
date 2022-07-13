function marcar(objeto,categoria){
    const before = document.querySelector("."+ categoria + ".selecionado");

    if(before != null){
        before.classList.remove("selecionado");
      }

    objeto.classList.add("selecionado");

    fazerPedido();
}

function fazerPedido(){
    const comida = document.querySelector(".comida.selecionado");
    const bebida = document.querySelector(".bebida.selecionado");
    const doce = document.querySelector(".doce.selecionado");
  
    if (comida != null && bebida != null && doce != null) {
      document.querySelector(".button-nao-pode-comprar").style.display ="none";
      document.querySelector(".button-pode-comprar").style.display ="flex";
    }
  }

  function custo(preco){
    return Number(preco.slice(0, -3)) + Number(preco.slice(-2)) / 100;
  }

  function fechar_pedido(){
    const comida = document.querySelector(".comida.selecionado");
    const bebida = document.querySelector(".bebida.selecionado");
    const doce = document.querySelector(".doce.selecionado");
    const total = (custo(comida.querySelector(".preco").textContent) + custo(bebida.querySelector(".preco").textContent) + custo(doce.querySelector(".preco").textContent)).toFixed(2);
    
    const pedido = `Olá, gostaria de fazer o pedido: \n -Prato: Salmão \n -Bebida: Coquinha Gelada \n Sobremesa: Sorvete \n Total: R$${total}`
    window.open(`https://wa.me/5518988116427?text=${encodeURIComponent(pedido)}`)

  }