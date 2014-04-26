var lb;

$(document).ready(function() {

	$('.like').click(function() {
		lb = $(this);
		$.ajax({
			type: 'POST',
			url: '/like',
			data: {id: $(this).attr('id')},
			success: function() {
				var count = ('#'+lb.attr('id')+'.likeCount');
				console.log(count);
				console.log(lb);
				var countInt = parseInt($(count).text());
				$(count).replaceWith(countInt+1);
			}
		});
	});

	$('.dislike').click(function() {
		lb = $(this);
		$.ajax({
			type: 'POST',
			url: '/dislike',
			data: {id: $(this).attr('id')},
			success: function() {
				var count = ('#'+lb.attr('id')+'.dislikeCount');
				console.log(count);
				console.log(lb);
				var countInt = parseInt($(count).text());
				$(count).replaceWith(countInt+1);
			}
		});
	});
});