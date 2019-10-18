$(document).ready(function() {
	var wholehtml = $('html, body'),
		janela = $(window),

		btFotos = $('div.imagem > div.img-container'),
		fotosMultiplas = btFotos.find('div.slider'),
		fotos = $('#foto-ampliada'),
		fotoClose = fotos.find('button.fechar'),
		fotosControle = fotos.find('button.controle'),
		fotos_btNext = fotosControle.filter('.nextfoto'),
		fotos_btPrev = fotosControle.filter('.prevfoto'),
		intervaloSlider = 3500,
		arrayFotosGaleria = [],
		arrayDescricoesGaleria = [],
		galeriaFotoAtual = 0,

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

		fotosMultiplas.each(function(index, el) {
			$(el).children('img.imagemdefato').eq(0).addClass(c_visivel);
			var fotoAtual = 0;
			setInterval(function() {
				if (fotoAtual == $(el).length+1) {
					fotoAtual = 0;
					$(el).children('img.imagemdefato:not(:first-of-type)').removeClass(c_visivel);
					
				} else{
					fotoAtual += 1;
					$(el).children('img.imagemdefato').eq(fotoAtual).addClass(c_visivel);

				}
				
			}, intervaloSlider);
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
			todasFotosBt = $(this).find('img.imagemdefato');
			grupoDescricoes = $(this).find('div.descricoes');
			if (todasFotosBt.length == 1) {
				fotos.find('img.tagfoto').attr('src', todasFotosBt.attr('src'));
			} else{

				fotos_btNext.addClass(c_visivel);
				todasFotosBt.each(function(index, el) {
					arrayFotosGaleria.push($(el).attr('src'));	
				});
				fotos.find('img.tagfoto').attr('src', arrayFotosGaleria[0]);
				galeriaFotoAtual = 0;
				console.log(todasFotosBt.length+' fotos nessa galeria');

			}

			if (grupoDescricoes.length > 0) {
				descricoes = grupoDescricoes.find('p');
				descricoes.each(function(index, el) {
					arrayDescricoesGaleria.push($(el).html());
				});
				fotos.find('.descricao').html(arrayDescricoesGaleria[0]);
			} else{
				fotos.find('.descricao').html($(this).parent().children('p').html());

			}
			
			wholehtml.addClass(c_stopscroll);

			/* Act on the event */
		});

		function proximaFotoGaleria(argument) {
				

			if (galeriaFotoAtual !== arrayFotosGaleria.length-1) {
				galeriaFotoAtual +=1;
				fotos.find('img.tagfoto').attr('src', arrayFotosGaleria[galeriaFotoAtual]);
				fotos_btPrev.addClass(c_visivel);
				if (arrayDescricoesGaleria.length > 0) {
					fotos.find('.descricao').html(arrayDescricoesGaleria[galeriaFotoAtual]);
				}
				if (galeriaFotoAtual == arrayFotosGaleria.length-1) {
				fotos_btNext.removeClass(c_visivel);
				} 
			}
			
		}

		function previousFotoGaleria(argument) {

			if (galeriaFotoAtual !== 0) {
				galeriaFotoAtual -=1;
				fotos.find('img.tagfoto').attr('src', arrayFotosGaleria[galeriaFotoAtual]);
				fotos_btNext.addClass(c_visivel);
				if (arrayDescricoesGaleria.length > 0) {
					fotos.find('.descricao').html(arrayDescricoesGaleria[galeriaFotoAtual]);
				}
				if (galeriaFotoAtual == 0) {
				fotos_btPrev.removeClass(c_visivel);
			}

			}


			
		}

		fotos_btNext.on('click', function(event) {
			proximaFotoGaleria();
			/* Act on the event */
		});

		fotos_btPrev.on('click', function(event) {
			previousFotoGaleria();
			/* Act on the event */
		});

		fotoClose.on('click', function(event) {
			fotos.removeClass(c_visivel);
			setTimeout(function(){
				fotos.removeClass(c_existe);
				fotos.find('img.tagfoto').attr('src', '');
				fotos.find('.descricao').html('');
				arrayFotosGaleria = [];
				arrayDescricoesGaleria = [];
				galeriaFotoAtual = 0;
				fotosControle.removeClass(c_visivel);
			wholehtml.removeClass(c_stopscroll);

			}, intervalo_classes);
			
		});


});