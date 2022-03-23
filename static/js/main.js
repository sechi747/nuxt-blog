$(function () {

  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 60) {
      $('header').addClass('scrollhead')
    } else {
      $('header').removeClass('scrollhead')
    }
  });

  let s1 = '2022-03-23';
  s1 = new Date(s1.replace(/-/g, "/"));
  let s2 = new Date();
  let days = s2.getTime() - s1.getTime();
  let number_of_days = parseInt(days / (1000 * 60 * 60 * 24));
  document.getElementById('days').innerHTML = number_of_days;

  let i = 1;
  $('.menu-icon').click(function () {
    if (i === 1) {
      $('.nav-menu').addClass('menu-show')
      $('.menu-icon').addClass('menu-icon-show')
      $('.opacity').css('display', 'block')
      i = 2
    } else {
      $('.nav-menu').removeClass('menu-show')
      $('.menu-icon').removeClass('menu-icon-show')
      $('.opacity').css('display', 'none')
      i = 1
    }
  })
  $('.opacity').click(function () {
    $('.nav-menu').removeClass('menu-show')
    $('.menu-icon').removeClass('menu-icon-show')
    $('.opacity').css('display', 'none')
    i = 1
  })
});



