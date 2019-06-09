$('.quienes_somos_show').click(function()
                               {
    hide('.quienes_somos_show');
    $('.quienes_somos_show').css('display','none');
    $('.quienes_somos_text').show();
    $('.quienes_somos_hide').show();
});

$('.quienes_somos_hide').click(function()
                               {
    $('.quienes_somos_hide').css('display','none');
    $('.quienes_somos_text').hide();
    $('.quienes_somos_show').show();
});

$('.ayuda_contacto_show').click(function()
                                {
    hide('.ayuda_contacto_show');
    $('.ayuda_contacto_show').css('display','none');
    $('.ayuda_contacto_text').show();
    $('.ayuda_contacto_hide').show();
});

$('.ayuda_contacto_hide').click(function()
                                {
    $('.ayuda_contacto_hide').css('display','none');
    $('.ayuda_contacto_text').hide();
    $('.ayuda_contacto_show').show();
});

$('.trabajar_club_show').click(function()
                               {
    hide('.trabajar.club_show');
    $('.trabajar_club_show').css('display','none');
    $('.trabajar_club_text').show();
    $('.trabajar_club_hide').show();
});

$('.trabajar_club_hide').click(function()
                               {
    $('.trabajar_club_hide').css('display','none');
    $('.trabajar_club_text').hide();
    $('.trabajar_club_show').show();
});

function hide(aux)
{
    var object = ['.quienes_somos_text', '.ayuda_contacto_text', '.trabajar_club_text'];
    for(var i in object)
    {
        if(aux !== object[i])
            $(object[i]).hide();
    }
}
