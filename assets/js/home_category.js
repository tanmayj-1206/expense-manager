{
    let assignCategory = function() {
        $('.category-icon').each(function(){
            let category = $(this).attr('value');
            
            if(category == 'Grocery'){
                $(this).html('<i class="fa-solid fa-carrot"></i>')
                $(this).css('color', 'green');
            }
            else if(category == 'Shopping'){
                $(this).html('<i class="fa-solid fa-bag-shopping"></i>')
                $(this).css('color', 'orange');
            }
            else if(category == 'Leisure'){
                $(this).html('<i class="fa-solid fa-clapperboard"></i>')
                $(this).css('color', 'red');
            }
            else if(category == 'Income'){
                $(this).html('<i class="fa-solid fa-dollar-sign"></i>')
                $(this).css('color', 'violet');
            }
            else if(category == 'Other'){
                $(this).html('<i class="fa-solid fa-cart-plus"></i>')
                $(this).css('color', 'blue');
            }
        })
    }

    let assignDate = function(){
        $('.created-at').each(function(){
            let date = $(this).attr('value');
            let dateString = new Date(date);
            dateString = dateString.toLocaleDateString('it-IT');
            $(this).html(dateString);
        })
    }

    assignDate()

    assignCategory();
}