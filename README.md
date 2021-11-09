### How to use bs5-nav-tree v0.2.1
#### Initializing the tree
1. Make sure you have a list object with id "nav-tree" like ``<ul id="nav-tree"></ul>`` and, all list items must have its own id like ``<li id="li1"></li>``. If you have speacial list item or link add 'extra' class to exulude it. 
   
   For example:
    ```html
    <ul id="nav-tree">
      <li id="li0" class="extra nav-item"><a class="nav-link">extra</a></li>
      <li id="li8">
        <a>
          Collapse 3
        </a>
        <a class="extra">
          extra link
        </a>
        <ul>
          <li id="li9">
            <a href="#">
              Link 4
            </a>
          </li>
          <li id="li10">
            <a href="#">
              Link 5
            </a>
          </li>
        </ul>
      </li>
    </ul>
    ```
2. Add this to your js file:
   ```js
   const nav = new NavTree("#nav-tree",
     {
        searchable: false, // default
        showEmptyGroups: false, // default

        groupOpenIconClass: "fas", // default
        groupOpenIcon: "fa-chevron-down", // default

        groupCloseIconClass: "fas", // default
        groupCloseIcon: "fa-chevron-right", // default

        linkIconClass: "fas", // default
        linkIcon: "fa-link", // default

        iconWidth: "",  // default

        searchPlaceholderText: "Search", // default
      }
   );
   ```

#### Updating the tree
```js
nav.update(menu_html);
```


### How to use bs5-nav-tree v0.2
#### Initializing the tree
1. Make sure you have a list object with id "nav-tree" like ``<ul id="nav-tree"></ul>`` and, all list items must have its own id like ``<li id="li1"></li>``.  If you want to search on tree add "data-searchable" attribute to the list, and if you want to show empty groups after search add "data-show-empty-groups" attribute to the list.
   
   For example:
    ```html
    <ul id="nav-tree" data-searchable data-show-empty-groups>
      <li id="li8">
        <a>
          Collapse 3
        </a>
        <ul>
          <li id="li9">
            <a href="#">
              Link 4
            </a>
          </li>
          <li id="li10">
            <a href="#">
              Link 5
            </a>
          </li>
        </ul>
      </li>
    </ul>
    ```
2. Add this to your js file:
   ```js
   const nav = new NavTree({ obj_id: "#nav-tree" });
   ```

#### Updating the tree
```js
nav.update(menu_html);
```

### How to use bs5-nav-tree v0.1
__This is a very primitive version, so I do NOT recommend using it.__ But you want to use it:
#### Initializing the tree 
1. Make sure you have a list object with id "menu-tree". All elements of the list must have an id. If you want to search on tree add "searchable" attribute to the list, and if you want to show empty groups after search add "show-empty" attribute to the list. 
   
   For example:
    ```html
    <ul id="menu-tree" searchable show-empty>
      <li id="li8">
        <a id="a8">
          Collapse 3
        </a>
        <ul id="ul3">
          <li id="li9">
            <a id="a9" href="#">
              Link 4
            </a>
          </li>
          <li id="li10">
            <a id="a10" href="#">
              Link 5
            </a>
          </li>
        </ul>
      </li>
    </ul>
    ```

1. Add this to your js file:
    ```js
    let menu = document.querySelector('#menu-tree');

    init_tree(menu);

    if (menu.getAttribute("searchable") !== null) {
      menu.parentElement.prepend(htmlToElement(searchInput));

      init_search(menu.getAttribute("show-empty") !== null);
    }
    ```
#### Updating the tree
```js
 update_tree(menu, menu_html)
```

