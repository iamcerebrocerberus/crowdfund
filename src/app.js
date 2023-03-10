$(document).ready(function () {
  const humburger = $(".js-humburger");
  const menu = $(".js-menu");
  const page = $(".js-page");
  const bookmark = $(".js-bookmark");
  const backProjBtn = $(".js-backproject-btn");
  const thanksModal = $(".js-thanks-modal");
  const thanksModalBtn = $(".js-thanks-modal-btn");
  const backProject = $(".js-back-project-modal");
  const selectReward = $(".js-select-btn");
  const backProjectInner = $(".js-back-project-modal-inner");

  const continuebtns = $(".js-continue");
  const closeBackProject = $(".js-back-project-close");
  const backRadio = $(".js-back-radio");

  humburger.click(function () {
    menu.toggleClass("menu-opened");
    if (menu.hasClass("menu-opened")) {
      $(".js-humburger img").attr("src", "./images/icon-close-menu.svg");
      page.attr("data-menu-overlay", "in");
      menu.slideDown();
      menu.show();
    } else {
      $(".js-humburger img").attr("src", "./images/icon-hamburger.svg");
      page.attr("data-menu-overlay", "out");
      menu.slideUp("slow");
      menu.show();
    }
  });

  /*bookmarked btn*/
  bookmark.click(function () {
    $(this).toggleClass("bookmarked");
    if ($(this).hasClass("bookmarked")) {
      $(this).find("span").append("<span id='marked'>ed</span>");
      $("#marked").css("padding", "0");
    } else {
      $(this).find("span#marked").remove();
    }
  });

  /*back project display*/
  backProjBtn.click(function () {
    backProject.css("display", "flex");
    page.attr("data-overlay", "in");
  });

  /*close back project modal*/
  closeBackProject.click(function () {
    backProject.hide();
    page.attr("data-overlay", "out");
  });

  /*expand back project components when checked*/
  $.each(backRadio, function (index, element) {
    $(this).prop("checked", false);
    $(element).on("click", function () {
      $.each(backRadio, function (i, ele) {
        if (ele == element) {
          $(ele)
            .prop("checked", true)
            .parents(".back-component")
            .addClass("modal-expand")
            .find(".comp-expand")
            .slideDown()
            .show();
        } else {
          $(ele)
            .parents(".back-component")
            .removeClass("modal-expand")
            .find(".comp-expand")
            .slideUp();
        }
      });
    });
  });

  /*show thanks modal when continue buttton is clicked*/
  $(continuebtns).each(function () {
    $(this).click(function (event) {
      event.preventDefault();
      let field = $(this).parents("form").find("input").val();
      if (field === undefined || field === "" || field === null) {
        alert("field cannot be empty");
        return;
      }
      if (!$.isNumeric(field)) {
        alert("field can only be number");
        return;
      }
      field = "";
      backProject.hide();
      thanksModal.css("display", "flex");
      thanksModalBtn.click(function () {
        page.attr("data-overlay", "out");
        thanksModal.hide();
      });
    });
  });

  selectReward.each(function () {
    $(this).click(function () {
      page.attr("data-overlay", "in");
      thanksModal.css("display", "flex");
      thanksModalBtn.click(function () {
        thanksModal.hide();
        page.attr("data-overlay", "out");
      });
    });
  });
});
