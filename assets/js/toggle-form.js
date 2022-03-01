{
    let toggleForm = function(){
        console.log('hmm');
        $('#toggle-button').click(function(){
            console.log('hh');
            $('#expense-container').toggleClass('toggle-view-1');
            $('#expense-container').toggleClass('toggle-view-2');
            $('#form-container').toggleClass('toggle-view-1');
            $('#form-container').toggleClass('toggle-view-2');

            $('.toggle-circle').toggleClass('toggle-left');
            $('#toggle-button').toggleClass('toggle-color');
        })
    }

    toggleForm();
}