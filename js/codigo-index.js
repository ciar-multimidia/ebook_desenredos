$(document).ready(function() {
	var wholehtml = $('html, body'),
		janela = $(window),

		btFotos = $('div.imagem'),
		fotos = $('#foto-ampliada'),
		fotoClose = fotos.find('button.fechar'),

		scrollAtual = janela.scrollTop(),

		header = $('header'),
		altura_header = header.height(),

		pulaPag = $('#navegador'),
		bt_pagAnt = pulaPag.find('#pagant'),
		bt_proxPag = pulaPag.find('#proxpag'),
		box_pagAtual = pulaPag.find('#pagatual'),
		folios = $('span.lauda'),
		paginaatual = folios.eq(0).attr('data-pagina'),
		primeira_pagina = parseInt(paginaatual),
		porcentagem_novapag = 0.3,
		altura_trechoJanela = janela.height()*porcentagem_novapag,


		btMenu = $('#btsumario'),
		offmenu = $('#offmenu'),
		menuMesmo = offmenu.find('.menu'),
		menuClose = $('#offmenu > .darken'),
		menuAberto = false,

		intervalo_classes = 80,
		c_existe = 'db',
		c_visivel = 'visivel'
		c_ativo = 'ativo',
		c_stopscroll = 'stop-scroll';


		janela.on('resize', function(event) {
			altura_trechoJanela = janela.height()*porcentagem_novapag;

			/* Act on the event */
		});

		function atualizarPaginaAtual(){
			

			folios.each(function(index, el) {
				if (janela.scrollTop() >= ($(el).offset().top - altura_trechoJanela) ) {
					paginaatual = $(el).attr('data-pagina');
				}
			});
			box_pagAtual.text(paginaatual);			
		}

		atualizarPaginaAtual();



		janela.on('scroll', function(event) {
			atualizarPaginaAtual();
			if ($(this).scrollTop() < scrollAtual) {
					header.addClass(c_ativo);
					scrollAtual = $(this).scrollTop();

			} else{
					header.removeClass(c_ativo);
					scrollAtual = $(this).scrollTop();
				
			};
			
			/* Act on the event */
		});


		bt_pagAnt.on('click', function(event) {
			var pagatual_int = parseInt(paginaatual);
			if (pagatual_int - primeira_pagina + 1 == 1) {
				janela.scrollTop( folios.eq(pagatual_int - primeira_pagina).offset().top - altura_header );
			} else {
				janela.scrollTop( folios.eq(pagatual_int - primeira_pagina-1).offset().top - altura_header );

			}
		atualizarPaginaAtual();

			/* Act on the event */
		});

		bt_proxPag.on('click', function(event) {
			var pagatual_int = parseInt(paginaatual);

			if (pagatual_int - primeira_pagina + 1 != folios.length) {
				janela.scrollTop( folios.eq(pagatual_int - primeira_pagina + 1).offset().top);
				
			}
		atualizarPaginaAtual();
			
			/* Act on the event */
		});

		function closeOffMenu(){
			offmenu.removeClass(c_ativo);
			menuAberto = false;
			wholehtml.removeClass(c_stopscroll);
			menuMesmo.off('swipeleft');
		}

		btMenu.on('click', function(event) {
			offmenu.addClass(c_ativo);
			menuAberto = true;
			wholehtml.addClass(c_stopscroll);
			menuMesmo.on('swipeleft', function(event) {
				closeOffMenu();
				/* Act on the event */
			});
			/* Act on the event */
		});

		menuClose.on('click', function(event) {
				closeOffMenu();
				/* Act on the event */
			});

		btFotos.on('click', function(event) {
			fotos.addClass(c_existe);
			setTimeout(function(){
				fotos.addClass(c_visivel);
			}, intervalo_classes);
			fotos.find('img').attr('src', $(this).find('img').attr('src'));
			fotos.find('.descricao').html($(this).find('p').html());
			wholehtml.addClass(c_stopscroll);

			/* Act on the event */
		});

		fotoClose.on('click', function(event) {
			fotos.removeClass(c_visivel);
			setTimeout(function(){
				fotos.removeClass(c_existe);
				fotos.find('img').attr('src', '');
				fotos.find('.descricao').html('');
			wholehtml.removeClass(c_stopscroll);

			}, intervalo_classes);
			
		});


});