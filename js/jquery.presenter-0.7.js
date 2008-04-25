/* jquery-presenter plugin - Rahul Upakare (rahulu@gmail.com) */

$.fn.presenter = function(options) {
	var settings = { }
  if(options)
    $.extend(settings, options);
	
	var pid = $(this).attr("id");

  $(this).find(".slide").hide();
  $(this).find(".notes").hide();
  $(this).find(".effects").hide();
	$(this).find(".footer").hide();

  var ts = $(this).find(".slide").size();

	var cs = 0;
	var listenKeyEvent = 0;

	var first = $(this).find(".slide:first");
	var footer = $(this).find(".footer");
	var pagenumber = $(this).find(".pagenumber");
	var curslide = first;

	$.presenter.showSlide(first);

	$(document).keypress(function(e) {
		var pressedKey = e.charCode || e.keyCode || -1;
	
		var toggledKeyEvent = 0;

		var presentationid = pressedKey - 48;

		if(listenKeyEvent == 1 && pid.match(presentationid) == ("" + presentationid)) {
			listenKeyEvent = 0; toggledKeyEvent = 1;
		} 
		
		if(toggledKeyEvent != 1 && listenKeyEvent == 0 && pid.match(presentationid) == ("" + presentationid)) {
			listenKeyEvent = 1;
		} 
		
		listenKeyEvent = 1; /* this is hard-coded for time being to avoid user to press key '1' -- rahulu */
			
		if(listenKeyEvent == 0) {
			return; /* I know, this is a bad practice, but I am too lazy to change this right now */
		}

		var showslide;
		var hideslide = curslide; 

		if(pressedKey == 37 || pressedKey == 38) { 
			cs--;
			var prev;
			var last;
		
			if(cs < 0) {
				cs = ts-1;
				showslide = $(this).find("#" + pid + " .slide:last");
			} else {
				$.presenter.hideSlide(curslide);
				showslide = curslide.prev();
			}
			pagenumber.html((cs+1) + "/" + ts);
			curslide = $.presenter.showNextSlide(showslide, hideslide);
		}

		
		if(pressedKey == 39 || pressedKey == 40) { 
			cs++;
			var prev;
			var last;
		
			if(cs < ts) {
				$.presenter.hideSlide(curslide);
				showslide = curslide.next();
			} else {
				cs = 0;
				showslide = $(this).find("#" + pid + " .slide:first");
			}
			pagenumber.html((cs+1) + "/" + ts);
			curslide = $.presenter.showNextSlide(showslide, hideslide);
		}
	});

  $(this).find(".slide").click(function () {
  cs++;
  var next;
		
  if(cs < ts) {
    next = $(this).next();
    $.presenter.hideSlide($(this));
    pagenumber.html((cs+1) + "/" + ts);
    curslide = next;
			$.presenter.showSlide(next);
		} else {
			cs = 0;
			pagenumber.html((cs+1) + "/" + ts);
			curslide = $.presenter.showNextSlide(first, $(this));
		}
	});
	footer.show();
};

$.presenter = function() {}

$.presenter.showSlide = function(slide) {
	slide.show();
} 

$.presenter.hideSlide = function(slide) {
	slide.hide(); //(500);
}

$.presenter.showNextSlide = function(showSlide, hideSlide) {
	$.presenter.hideSlide(hideSlide);
	$.presenter.showSlide(showSlide);
	return showSlide;
}
