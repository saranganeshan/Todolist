$(document).ready(function(){
	var items = get_value_local('item');
	var index;
	assign_value(items);

// SUBMIT & SAVE CHANGES BUTTON
	$('button').prop('disabled', true);
	$('input').keyup(function(){
		if($(this).val().length !== 0) {
			$('button').prop('disabled', false);
		} else {
			$('button').prop('disabled', true);
		}
	});

// SUBMIT
    $('#submit').click(function() {
        var value = $('#name').val();
        if (value.length !== 0) {
            items.push(value);
            $('#name').val('');
            assign_value(items);
            set_localstorage('item', items);
            $('button').prop('disabled', true);
        }
    });

// DELETE 
    $('ul').on('click', '.delete-item', function() {
        index = $(this).closest('li').index();
        items.splice(index, 1);
        assign_value(items);
        set_localstorage('item', items);
    });

// EDIT 
    $('ul').on('click', '.edit-item', function() {
        index = $(this).closest('li').index();
        var content = items[index];
        $('#edit-input').val(content);
    });

// SAVE
    $('#edit-button').click(function() {
        var editedValue = $('#edit-input').val();
        if (editedValue.length !== 0) {
            items[index] = editedValue;
            assign_value(items);
            set_localstorage('item', items);
            $('#edit-input').val(''); 
        }
    });

// ASSIGN VALUES TO LIST
    function assign_value(items) {
        $('ul').empty();
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                $('ul').append('<li class="list-group-item">' + items[i] +
                    '<span class="edit-item btn btn-primary ml-2" data-toggle="modal" data-target="#editModal">EDIT</span>' +
                    '<span class="delete-item btn btn-danger pl-2 mx-2">DELETE</span></li>');
            }
        }
    }

   
    function set_localstorage(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    function get_value_local(key) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    }
});
