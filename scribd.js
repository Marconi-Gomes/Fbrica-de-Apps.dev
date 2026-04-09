document.addEventListener('DOMContentLoaded', () => {

    // 1. Otimização de Links (Segurança e SEO)
    const botoesCompra = document.querySelectorAll('.btn-comprar');
    botoesCompra.forEach(botao => {
        botao.setAttribute('target', '_blank');
        botao.setAttribute('rel', 'noopener noreferrer');
    });

    // 2. Observer de Alta Performance
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Pára de observar para economizar processamento
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Seleciona todos os elementos que devem "revelar"
    const elementsToReveal = document.querySelectorAll('.card, .reveal, .about-container, .faq-item');
    
    elementsToReveal.forEach((el, index) => {
        // Estilo inicial via JS para evitar "pulo" visual antes do CSS carregar
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.willChange = "transform, opacity";
        
        // Efeito cascata: cada elemento demora 100ms a mais que o anterior na mesma visualização
        el.style.transitionDelay = `${(index % 3) * 0.1}s`; 
        
        revealObserver.observe(el);
    });

    // 3. Injeção de CSS otimizado
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        /* FAQ Interativo funcional */
        .faq-answer {
            overflow: hidden;
            max-height: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);

    // 4. Lógica de FAQ (Integrada e melhorada)
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('i');
            const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';

            if (isOpen) {
                answer.style.maxHeight = '0px';
                answer.style.paddingBottom = '0px';
                icon.classList.replace('fa-minus', 'fa-plus');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingBottom = '20px';
                icon.classList.replace('fa-plus', 'fa-minus');
            }
        });
    });
});