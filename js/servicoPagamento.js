const ServicoPagamento = {
  processar(dados) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transacaoId = "TX" + Date.now().toString().slice(-10);
        const formaPagamento = String(dados.formaPagamento || "").toLowerCase();

        let aprovado = true;
        let motivo = "";

        if (!dados.valor || Number(dados.valor) <= 0) {
          aprovado = false;
          motivo = "Valor do pagamento inválido.";
        }

        if (aprovado && formaPagamento.includes("cart")) {
          const numeroCartao = String(dados.numeroCartao || "").replace(
            /\D/g,
            "",
          );

          if (!numeroCartao) {
            aprovado = false;
            motivo = "Número do cartão não informado.";
          } else if (numeroCartao.length < 13) {
            aprovado = false;
            motivo = "Número do cartão inválido.";
          }
        }

        if (aprovado && formaPagamento.includes("pix")) {
          if (dados.pixAprovado === false) {
            aprovado = false;
            motivo = "Pagamento PIX não confirmado.";
          }
        }

        resolve({
          aprovado,
          transacaoId,
          valor: Number(dados.valor || 0),
          formaPagamento: dados.formaPagamento || "",
          pedidoId: dados.pedidoId || "",
          motivo,
          data: new Date().toISOString(),
        });
      }, 2000);
    });
  },
};
