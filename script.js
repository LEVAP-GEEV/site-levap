/* ===== Efeito PAIRAR (entrada suave de textos e imagens) =====
   Cada texto ou imagem do conteúdo aparece e sobe levemente quando entra na tela.
   Não afeta o cabeçalho, o menu nem o rodapé.
   Quem desativa as animações no sistema (acessibilidade) vê a página sem o efeito.
   Não usa cookies nem rastreadores. */
(function () {
  // ---- AJUSTES (mude aqui, se quiser) ----
  var DISTANCIA = "28px";   // quanto o elemento sobe ao aparecer
  var DURACAO = "0.9s";     // duração da animação

  // O que recebe o efeito (somente dentro de <main>)
  var SELETORES = "main h2, main h3, main h4, main p, main ul:not(li ul), main ol, " +
                  "main img:not(.grade img):not(.galeria-dacs img), main .grade, main .galeria-dacs";

  // Sem suporte do navegador ou com animações desativadas no sistema: não faz nada
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var css = ".anima{opacity:0;transform:translateY(" + DISTANCIA + ");" +
            "transition:opacity " + DURACAO + " ease-out,transform " + DURACAO + " cubic-bezier(.2,.6,.2,1)}" +
            ".anima.visivel{opacity:1;transform:none}";
  var estilo = document.createElement("style");
  estilo.textContent = css;
  document.head.appendChild(estilo);

  function iniciar() {
    var itens;
    try { itens = document.querySelectorAll(SELETORES); } catch (erro) { return; }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);   // anima só uma vez
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

    itens.forEach(function (el) {
      el.classList.add("anima");
      observador.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
