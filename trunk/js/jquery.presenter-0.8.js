/* 
jquery-presenter plugin 
Copyright (c) 2008, Rahul Upakare (rahulu@gmail.com) 
All rights reserved.  

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

$.fn.presenter = function(options) {
  var settings = { }

  if(options)
    $.extend(settings, options);

  var pid = $(this).attr("id");

  $(this).find(".slide").hide();
  $(this).find(".notes").hide();
  $(this).find(".effects").hide();
  $(this).find(".footer").hide();

  var total_slides = $(this).find(".slide").size();
  var curr_slide_num = 0;

  var first = $(this).find(".slide:first");
  var footer = $(this).find(".footer");
  var pagenumber = $(this).find(".pagenumber");
  var curslide = first;

  $.presenter.showSlide(first);

  $(document).keypress(function(e) {
    var pressedKey = e.charCode || e.which || e.keyCode || -1;
    alert("key pressed " + pressedKey);
  
    var showslide;
    var hideslide = curslide; 

    if(pressedKey == 37 || pressedKey == 38) { 
      curr_slide_num--;
    
      if(curr_slide_num < 0) {
        curr_slide_num = total_slides-1;
        showslide = $(this).find("#" + pid + " .slide:last");
      } else {
        $.presenter.hideSlide(curslide);
        showslide = curslide.prev();
      }
      pagenumber.html((curr_slide_num + 1) + "/" + total_slides);
      curslide = $.presenter.showNextSlide(showslide, hideslide);
    }

    
    if(pressedKey == 39 || pressedKey == 40) { 
      curr_slide_num++;
    
      if(curr_slide_num < total_slides) {
        $.presenter.hideSlide(curslide);
        showslide = curslide.next();
      } else {
        curr_slide_num = 0;
        showslide = $(this).find("#" + pid + " .slide:first");
      }
      pagenumber.html((curr_slide_num + 1) + "/" + total_slides);
      curslide = $.presenter.showNextSlide(showslide, hideslide);
    }
  });

  $(this).find(".slide").click(function () {
  curr_slide_num++;
  var next;
    
  if(curr_slide_num < total_slides) {
    next = $(this).next();
    $.presenter.hideSlide($(this));
    pagenumber.html((curr_slide_num + 1) + "/" + total_slides);
    curslide = next;
      $.presenter.showSlide(next);
    } else {
      curr_slide_num = 0;
      pagenumber.html((curr_slide_num + 1) + "/" + total_slides);
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
  slide.hide(); 
}

$.presenter.showNextSlide = function(showSlide, hideSlide) {
  $.presenter.hideSlide(hideSlide);
  $.presenter.showSlide(showSlide);
  return showSlide;
}
