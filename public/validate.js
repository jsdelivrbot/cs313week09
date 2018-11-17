$(document).ready(function () {

    $('#weight').on('input', function () {
        checkValidation();
    });

    $('#mailType').on('change', function () {
        checkValidation();
    });
});

function checkValidation() {
    //alert('called validation');
    var valid = true;
    var mailType = $('#mailType').val();
    var weight = $('#weight').val();
    var btn = $('#getResult');

    if (!weight || !mailType) {
        valid = false;
    }

    if (parseFloat(weight) > 3.5 && (mailType == 'stamped' || mailType == 'metered')) {
        valid = false;
        $('#mailType').addClass('is-invalid');
        $('#mailType').css('border-color', '#dc3545');
        $('#msgLimit').addClass('text-danger');
        $('#msgLimit').addClass('bold');
    }
    else {
        $('#mailType').removeClass('is-invalid');
        $('#mailType').css('border-color', '#ccc');
        $('#msgLimit').removeClass('text-danger');
        $('#msgLimit').removeClass('bold');
    }

    if (valid) {
        if (btn.hasClass('disabled'))
            btn.removeClass('disabled');
    }
    else {
        if (!btn.hasClass('disabled'))
            btn.addClass('disabled');
    }
}