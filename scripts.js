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
  const crossOutBtn = $(".create-checklist");
  const deleteItemBtn = $(".delete-item");

  //function to call all the functions that handle individual functionality
  function functionality() {
    menuContainer.hide();
    menu();
    addItem();
    addItemValue();
    crossOut();
    deleteItem();
  }

  function menu() {
    //an event listener on the ol to dynamically open every menu container when the menu buttons for each item are clicked
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

    //an event listner to close the menu-container when clicking outside of it or on another button
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

  //function that handles the input functionality, allowing users to add their items withe the enter button
  function addItemValue() {
    //an event listener that checks to see if the enter key is pressed when the item is focused
    $("ol").on("keydown", $("input"), (e) => {
      if ($("input").is($(e.target))) {
        const target = $(e.target);
        const keyPresseed = e.key;
        if (keyPresseed === "Enter" && target.focus()) {
          const newItem = target.val();
          target.blur();
          console.log(newItem);
          if (!target.is(".first-item") && target.val() === "") {
            target.parents("li").hide();
          }
        }
      }
    });
  }

  //a function to make the add item button functional
  function addItem() {
    //an event listener that dynamically updates the ol by adding an item and their respective elements to the ol when the add item button is pressed
    ol.on("click", (e) => {
      const target = $(e.target);
      //if statement to handle the actions when the add item button is pressed
      if (target.is($(".add-item"))) {
        //new item elements
        const currentMenuContainer = $(".menu-container");
        const newLi = $('<li class="list-item new-li items"></li>');
        const newMenuBtn = $('<button class="menu-btn btn">*</button>');
        const newInput = $(
          '<input class="new-input item" type="text" placeholder="create item" />'
        );
        const newMenuContainer = $("<div class='menu-container'></div>");
        const newAddItemBtn = $(
          '<button class="add-item btn">Add Item</button>'
        );
        const crossOutBtn = $(
          "<button class='cross-out' btn'>Cross Out</button>"
        );
        const newDeleteItemBtn = $(
          "<button class='delete-item btn'>Delete Item</button>"
        );

        //making sure the menu's are hidden when adding another menu container
        currentMenuContainer.hide();
        newMenuContainer.hide();

        //appending the elements
        newMenuContainer.append(newAddItemBtn, crossOutBtn, newDeleteItemBtn);
        newLi.append(newMenuContainer, newMenuBtn, newInput);
        $('.item-list').append(newLi);

        //making sure the newly added input from the added item is focused when we add the item to the list
        newInput.focus();

        //an event listener to delete the newly added li if the user chooses to add no value to it when it's created
        $(document).on("click", (e) => {
          const target = $(e.target);
          // if statement to narrow down the selection of the users target when clicking the mouse by making sure it's not the menu container, it's respective elements,or the newly added input itself
          if (
            !target.is($(".item")) &&
            !target.closest(".menu-container").length
          ) {
          //if statement to make sure that if a newly added item is added to the ol with no value and the use chooses to click outside of it, then the item gets deleted
            if (ol.children(".new-li") && $(newInput).val() === "") {
              newInput.parent("li").remove();
              console.log("hello");
              $(document).off();
            }
          }
        });
      }
    });
  }
  //a function to make the cross out button functional 
  function crossOut() {
    //an event listener to dynamically update each individual button if the cross out button is checked to cross out the parent li's input
    const errorMessageVisible = $('.error-message').css('visibility', true);
    ol.on("click", (e) => {
      const inputElement = $(e.target).parents('li').children('.item');
      //if statement to cross out the item when the cross out button is clicked
      if ($(e.target).is($(".cross-out")) && !inputElement.parent('.first-item')) {
        inputElement.addClass("strike");
        inputElement.attr("disabled", true);
        $('.menu-container').hide();
      }
      //if statement to move the crossout item to the done section
      if (inputElement.hasClass('strike') && !inputElement.parent('.first-item')) {
        $('.finished-items-list-container').append(inputElement.parent('li'));
      }
      //if statement to give an error if first item has no value
      if ($(e.target).is('.cross-out') && inputElement.parent('.first-item') && inputElement.val() === ''){
        $('.error-message').css('visibility', 'visible');
        //adds a click event listener so that the error leaves when you click on the first item's input
        $('.first-item').on('click', () => {
        $('.error-message').css('visibility', 'hidden');
     })
      }
    });
    
   
  }

  //a function to make the delete button functional
  function deleteItem() {
    ol.on("click", (e) => {
        if (
          $(e.target).is(".delete-item") &&
          !$(e.target).parents().is(".first-item")
        ) {
          $(e.target).parents("li").remove();
          console.log($(e.target).parent());
        }
      }); 
    //event listener for handling the first item when clicking the delete button
    $(".delete-item").on("click", (e) => {
      //global variables for the event
      const inputElement = $(e.target).parents("li").children(".item");
      const errorMessage = $('.error-message');
      //if statement to delete the value of the first item's input
      if (
        $(e.target).is(".delete-item") &&
        $(e.target).parents().is(".first-item")
      ) {
        inputElement.val("");
      }
      //if statement to create an error message if the delete button is clicked when the first item has no value
      if ($(e.target).is(".delete-item") && inputElement.val() === "") {
        $(".delete-item").parent().hide();
        errorMessage.css('visibility', 'visible');
        //adds a listener to the first item to remove the error when the first item's input gets clicked
        $(".first-input").on("click", () => {
          $(".error-message").css('visibility', 'hidden');
        });
      }
      //if statement to delete the value of the first item if the delete button is clicked
      if ($(e.target).is('.delete-item') && inputElement.val() === true) {
        inputElement.val() = '';
      }
      //event listener to delete added items to the list
     
    });
  }

  //returns the functionality function so it's accessible outside of the IIFE;
  return {
    functionality: functionality,
  };
})();

//calls the functionality function from the toDoList IIFE
toDoList.functionality();
