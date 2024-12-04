const toDoList = (() => {
  //getElements
  //list item elements
  const listContainer = $(".list-container");
  const ol = $(".order-list");
  const li = $(".list-item");
  const menuBtn = $(".menu-btn");
  const input = $(".item");
  //menu elements
  const menuContainer = $(".menu-container");
  const addItemBtn = $(".add-item");
  const makeChecklistBtn = $(".create-checklist");
  const deleteItemBtn = $(".delete-item");

  function functionality() {
    menuContainer.hide();
    menu();
    addItem();
    addItemValue();
    makeCheckList();
  }

  function menu() {
    //show the menu container when clicking on the button
    ol.on("click", li, (e) => {
      const target = $(e.target);
      if (target.hasClass("menu-btn")) {
        const getMenuContainer = target
          .parents()
          .first()
          .children(".menu-container");
        $(".menu-container").hide();
        if (getMenuContainer) {
          getMenuContainer.show();
        }
        console.log(e.target);
      }
    });

    //close menu-container when click outside of it or on another button
    $(document).on("click", (e) => {
      const target = $(e.target);

      if (
        !$(e.target).closest(".menu-container").length &&
        !$(e.target).is($(".menu-btn"))
      ) {
        if (target.is(".menu-btn")) {
          openMenu.hide();
          const getMenuContainer = target
            .parents()
            .first()
            .children(".menu-container");
          if (getMenuContainer) {
            getMenuContainer.show();
          }
        }
        $(".menu-container").hide();
      }
    });

    return menu;
  }

  function addItemValue() {
    //close the focused item if it has no value
    $("ol").on("keydown", $("input"), (e) => {
      if ($("input").is($(e.target))) {
        const target = $(e.target);
        const keyPresseed = e.key;
        if (keyPresseed === "Enter" && target.focus()) {
          const newItem = target.val();
          target.blur();
          console.log(newItem);
          if (target.val() === "") {
            target.parents("li").hide();
          }
        }
      }
    });

    /* let previousTarget = null;
    $(document).on("click", (e) => {

       if (
        $(previousTarget).is("input") &&
        !$(previousTarget).parent().hasClass("firstItem") &&
        noInput === ""
      ) {
        if ($(previousTarget).is(".firstItem")) {
          !$(".firstItem").hide();
        } else {
          $(previousTarget).parent("li").hide();
        }
      }
      previousTarget = e.target; 
    }); */
  }

  function addItem() {
    //adds an item to the list
    ol.on("click", (e) => {
      const target = $(e.target);
      if (target.is($(".add-item"))) {
        const currentMenuContainer = $(".menu-container");
        const newLi = $('<li class="list-item items"></li>');
        const newMenuBtn = $('<button class="menu-btn btn">*</button>');
        const newInput = $(
          '<input class="item" type="text" placeholder="create item" />'
        );
        const newMenuContainer = $("<div class='menu-container'></div>");
        const newAddItemBtn = $(
          '<button class="add-item btn">Add Item</button>'
        );
        const newMakeChecklistBtn = $(
          "<button class='create-checklist btn'>Make Checklist</button>"
        );
        const newDeleteItemBtn = $(
          "<button class='delete-item btn'>Delete Item</button>"
        );

        currentMenuContainer.hide();

        newMenuContainer.hide();

        newMenuContainer.append(
          newAddItemBtn,
          newMakeChecklistBtn,
          newDeleteItemBtn
        );
        newLi.append(newMenuContainer, newMenuBtn, newInput);
        ol.append(newLi);
        newInput.focus();
      }
    });
  }

  function makeCheckList() {
    ol.on("click", (e) => {
      const target = $(e.target);
      if (target.is(".create-checklist")) {
        const getLiElement = target.parents("li");
        const getCheckListInput = getLiElement.children(".checkbox");
        if (getCheckListInput !== true) {
          const checkListInput = $(
            '<input class="checkbox item" type="checkbox" />'
          );
          getLiElement.append(checkListInput);
        }

        /*    const getInputElement = getLiElement.children("input");
        const addCheckListType = getInputElement.attr("type", "checkbox"); */
      }
    });
    /*     const addChecklistAttr = getInputElement.attr("checked", true);
     */
  }

  function deleteItem() {}

  return {
    functionality: functionality,
    menu: menu,
  };
})();

toDoList.functionality();
