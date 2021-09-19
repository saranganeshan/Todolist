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

	$('#name').click(function(e){
		$('#submit').on('click', function(e) {
			if ($('#name').val().length !== 0){
				$('#submit').click();
			}
		});
	});

	$('#submit').click(function(){
		var value = $('#name').val();
		items.push(value);
		$('#name').val('');
		assign_value(items);
		set_localstorage('item', items);
		// set button 
		$('button').prop('disabled', true);
	});
// DELETE 
	$('ul').delegate("span", "click", function(){
		index = $('span').index(this);
		$('li').eq(index).remove();
		items.splice(index, 1);
		set_localstorage('item', items);
		
	});

// EDIT 
	$('ul').delegate('li', 'click', function(){
		index = $('li').index(this);
		var content = items[index];
		console.log(content);
		$('#edit-input').val(content );
	});

	$('#edit-button').click(function(){
		items[index] = $('#edit-input').val();
		assign_value(items);
		set_localstorage("item", items);
	});

// ADD VALUE
	function assign_value(items){
		$('li').remove();
		if(items.length > 0) {
			for(var i = 0; i < items.length; i++) {
				$('ul').append('<li class= "list-group-item"  data-toggle="modal" data-target="#editModal">' + items[i] + 
				'<span class="icon-remove btn btn-primary">DELETE</span></li>');
			}
		}
	};

	function set_localstorage(key, items){
		localStorage[key] = JSON.stringify(items);
	}

	function get_value_local(key){
		if(localStorage[key])
			return JSON.parse(localStorage[key]);
		else 
			return [];
	}

});
    
























// =================================================================
// $(document).ready(function () {     
//     $('.submit').click(function () {
//         var name_value = localStorage.displayMessages || '[]',
//             assign_value = JSON.parse(name_value)
//             assign_value.push($('#name').val());
//             localStorage.displayMessages = JSON.stringify(assign_value);
//          showMessages();        
//     });
    
//     function showMessages() {
//         var name_value = localStorage.displayMessages || '[]',
//             assign_value = JSON.parse(name_value);
//        var one= $('.result').html(assign_value.join('<br>'));
//         $('.edit').click(function () {
//            var curr= $('#name').val(assign_value);
//         })
//     }
//     showMessages();
// });

// =======================================

