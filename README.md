# BS5-Nav-Tree

## v0.3.1 Changelog
1. Added iconPlace value to config to determine location of group/link icons. It can be 'start' or 'end'.
2. Link and group icons have ahref attribute.

### NOTE: ALL OLD VERSIONS ARE DEPRECATED. PLEASE USE v0.3.
### NOTE 2: THIS PROJECT IS OPEN FOR CONTRIBUTION. PLEASE FEEL FREE FOR PULL REQUEST.
## How to use bs5-nav-tree v0.3
1. Create an unordered list as example. Make sure all list items have its own id. If you want to create searchable nav-tree, you have to add data-value attribute to the list items.  
```html
<ul id="arbitrary_id" class="arbitrary_class">
  <li id="li0" data-value="li0">
    <a href="#">extra list</a>
  </li>
  <li id="li1" data-value="li1">
    <a href="#">
      Link 1
    </a>
  </li>
  <li id="li2" data-value="li2">
    <span><i class="fas fa-chevron-left"></i></span>
    <a>
      Collapse 1
    </a>
    <span>t</span>
    <ul>
      <li id="li4" data-value="li4">
        <a>
          Collapse 2
        </a>
        <ul>
          <li id="li6" data-value="li6">
            <a href="#">
              Link 2
            </a>
          </li>
          <li id="li7" data-value="li7">
            <a href="#">
              Link 3
            </a>
          </li>
          <li id="li8" data-value="li8">
            <a>
              Collapse 3
            </a>
            <ul>
              <li id="li9" data-value="li9">
                <a href="#">
                  Link 4
                </a>
              </li>
              <li id="li10" data-value="li10">
                <a href="#">
                  Link 5
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li id="li5" data-value="li5">
        <a href="#">
          Link 6
        </a>
      </li>
    </ul>
  </li>
</ul>
```
2. There are multiple ways to create NavTree.
```js
NavTree.createBySelector("#nav-tree", {
    searchable: true,
    showEmptyGroups: true,

    groupOpenIconClass: "fas",
    groupOpenIcon: "fa-chevron-down",

    groupCloseIconClass: "fas",
    groupCloseIcon: "fa-chevron-right",

    linkIconClass: "fas",
    linkIcon: "fa-link",

    searchPlaceholderText: "Search",
  });
```
```js
new NavTree(document.querySelector('#arbitrary_id'), {
    searchable: true,
    showEmptyGroups: true,

    groupOpenIconClass: "fas",
    groupOpenIcon: "fa-chevron-down",

    groupCloseIconClass: "fas",
    groupCloseIcon: "fa-chevron-right",

    linkIconClass: "fas",
    linkIcon: "fa-link",

    searchPlaceholderText: "Search",
  });
```
```js
NavTree.getOrCreateInstance(document.querySelector('#arbitrary_id'), {
    searchable: true,
    showEmptyGroups: true,

    groupOpenIconClass: "fas",
    groupOpenIcon: "fa-chevron-down",

    groupCloseIconClass: "fas",
    groupCloseIcon: "fa-chevron-right",

    linkIconClass: "fas",
    linkIcon: "fa-link",

    searchPlaceholderText: "Search",
  });
```
You can access the NavTree instance by using the getOrCreateInstance function in the example above. If an instance has not been created before, it will give you a new instance.

3. Using data-icon attribute, you can set special icon to the links.
```html
<li data-icon="fas fa-cloud" id="li0" data-value="li0">
  <a href="#">extra list</a>
</li>
```

4. If you want to add some special things to the list, you can add them as prefix or suffix. Just wrap them with span and put them before or after than 'a' element.
```html
<li data-icon="fas fa-cloud" id="li0" data-value="li0">
  <span><a href="#">1</a></span>
  <span><i class="fas fa-plane"></i></span>
  <a href="#">extra list</a>
  <span><a href="#">1</a></span>
  <span><i class="fas fa-plane text-danger"></i></span>
</li>
```

5. Done! You can experience it using the example in the example folder.

#### Update the tree
```js
navtree_instance.update(html_string)
```