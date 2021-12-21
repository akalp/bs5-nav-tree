class NavTree {
  constructor(element, config) {
    this.element = element
    this.props = this.#prepareProps(config)
    this.#init()

    NavTree.#set(this.element, this)
  }

  #prepareProps(config){
    return {
      searchable: config.searchable || false,
      showEmptyGroups: config.showEmptyGroups || false,
      groupOpenIconClass: (config.groupOpenIconClass && config.groupOpenIcon) ? config.groupOpenIconClass : 'fas',
      groupOpenIcon: (config.groupOpenIconClass && config.groupOpenIcon) ? config.groupOpenIcon : 'fa-chevron-down',
      groupCloseIconClass: (config.groupCloseIconClass && config.groupCloseIcon) ? config.groupCloseIconClass : 'fas',
      groupCloseIcon: (config.groupCloseIconClass && config.groupCloseIcon) ? config.groupCloseIcon : 'fa-chevron-right',
      linkIconClass: (config.linkIconClass && config.linkIcon) ? config.linkIconClass : 'fas',
      linkIcon: (config.linkIconClass && config.linkIcon) ? config.linkIcon : 'fa-link',
      searchPlaceholderText: config.searchPlaceholderText || ''
    }
  }

  #init(){
      this.element.classList.add('nav', 'd-flex', 'flex-column')
      this.element.querySelectorAll('ul').forEach((ul) => ul.classList.add('nav', 'd-flex', 'flex-column'))
      this.element.querySelectorAll('li').forEach((li) => {
          const li_id = li.getAttribute('id')
          li.classList.add('nav-item', 'd-flex', 'flex-column', 'nt-li')
          
          const li_container = document.createElement('div')
          li_container.classList.add('d-flex')

          const prefix_container = document.createElement('span')
          prefix_container.classList.add('prefix', 'd-flex', 'flex-row', 'align-items-center')
          
          const icon_container = document.createElement('span')
          icon_container.classList.add('mx-1')

          const a = li.querySelector(':scope > a')
          a.classList.add('nav-link', 'flex-grow-1', 'text-break')

          li.replaceChild(li_container, a)
          li_container.append(a)

          const icon_link = a.cloneNode()
          icon_link.classList.add('px-0')
          const icon = document.createElement('i')

          const ul = li.querySelector('ul')
          if (ul){
            li.classList.add('nt-li-g')
              a.setAttribute('data-bs-toggle', 'collapse')
              a.setAttribute('role', 'button')
              a.setAttribute('aria-expanded', 'false')
              a.setAttribute('href', '#ntc-' + li_id)
              a.setAttribute('aria-controls', 'ntc-' + li_id)

              var collapsable = document.createElement('div')
              collapsable.classList.add('collapse')
              collapsable.setAttribute('id', 'ntc-' + li_id)

              li.replaceChild(collapsable, ul)
              ul.classList.add('ms-4')
              collapsable.appendChild(ul)

              new bootstrap.Collapse(collapsable, {
                  toggle: false
              })

              icon.classList.add(this.props.groupCloseIconClass, this.props.groupCloseIcon)

              collapsable.addEventListener('show.bs.collapse', (e) => {
                  icon.classList.replace(this.props.groupCloseIcon, this.props.groupOpenIcon)
                  icon.classList.replace(this.props.groupCloseIconClass, this.props.groupOpenIconClass)
                  e.stopPropagation()
              })
              collapsable.addEventListener('hide.bs.collapse', (e) => {
                  icon.classList.replace(this.props.groupOpenIcon, this.props.groupCloseIcon)
                  icon.classList.replace(this.props.groupOpenIconClass, this.props.groupCloseIconClass)
                  e.stopPropagation()
        
                  bootstrap.Collapse.getInstance(e.target.querySelector('.collapse'))?.hide()
                })

          } else {
              if(li.dataset.icon)
                icon.className = li.dataset.icon
              else
                icon.classList.add(this.props.linkIconClass, this.props.linkIcon)

              a.addEventListener('click', () => {
                  this.element.querySelectorAll('li').forEach((li) => li.classList.remove('active'))
                  a.closest('li').classList.add('active')
              })
          }

          icon_link.appendChild(icon)
          icon_container.appendChild(icon_link)
          prefix_container.appendChild(icon_container)

          var prevs = []
          var prev = li_container
          while(prev = prev.previousSibling){
            if (prev.nodeName.toUpperCase() === 'SPAN'){
              prevs.push(prev)
            }
          }
          prevs.forEach((prev) => {
            var prev_container = document.createElement('span')
              prev_container.className = 'mx-1'
              li.replaceChild(prev_container, prev)
              prev_container.append(prev)
              prefix_container.prepend(prev_container)
          })

          li_container.prepend(prefix_container)

          
          const suffix_container = document.createElement('span')
          suffix_container.classList.add('suffix', 'd-flex', 'flex-row', 'align-items-center')
          
          var nexts = []
          var next = li_container
          while(next = next.nextSibling){
            if (next.nodeName.toUpperCase() === 'SPAN'){
              nexts.push(next)
            }
          }
          nexts.forEach((next) => {
            var next_container = document.createElement('span')
              next_container.className = 'mx-1'
              li.replaceChild(next_container, next)
              next_container.append(next)
              suffix_container.append(next_container)
          })

          li_container.append(suffix_container)
      })

      if(this.props.searchable) {
        const search_parent = document.createElement('element')
        search_parent.innerHTML = `<input type='text' id='nav-tree-search' class='form-control mx-3 my-2' placeholder='${this.props.searchPlaceholderText}'>`
        this.element.prepend(search_parent.firstChild)

        this.element.querySelector('#nav-tree-search').addEventListener('keyup', (e) => {
          const nodes = Array.from(this.element.querySelectorAll('li[data-value]'))
          nodes.forEach((i) => i.classList.remove('d-none', 'fw-bold', 'fst-italic'))
  
          if (e.target.value !== '') {
            nodes.forEach((i) => {
              if (!i.dataset.value.toLowerCase().includes(e.target.value.toLowerCase()))
                i.classList.add('d-none')
              else
                i.classList.add('fw-bold', 'fst-italic')
            })

            nodes.filter((node) => node.classList.contains('nt-li-g')).forEach((node) => {
              console.log(node)
              const lis = Array.from(node.querySelectorAll('li'))
              const hidden = lis.filter((li) => li.classList.contains('d-none'))
              if (lis.length - hidden.length > 0) {
                const c = node.querySelector('.collapse')
                if (c){
                  c.classList.add('no-transition')
                  bootstrap.Collapse.getInstance(c).show()
                }
                node.classList.remove('d-none')
                hidden.forEach((h) => {
                  h.classList.remove('d-none')
                })
                c?.classList.remove('no-transition')
              } else if (!this.props.showEmptyGroups) {
                node.classList.add('d-none')
              }
            })
          } else {
            nodes.forEach((i) => i.classList.remove('d-none', 'fw-bold', 'fst-italic'))
          }
        })
      }
  }

  update(menu_html){
    const old = this.element.cloneNode(true);

    const template = document.createElement('span')
    template.innerHTML = menu_html

    this.element.innerHTML = template.firstChild.innerHTML
  
    this.#init();
    Array.from(old.querySelectorAll("[id]")).forEach((i) => {
      var new_node = this.element.querySelector("#" + i.getAttribute('id'));
      if (new_node){
        for (let attr of i.attributes) {
          if (attr.name == 'class')
            attr.value.split(' ').forEach((cls) => new_node.classList.add(cls))
          else
            new_node.setAttribute(attr.name, attr.value)
        }
      }
    });
  }
  
  static createBySelector(selector, config) {
    const elements = document.querySelectorAll(selector)
    elements.forEach(e => {
      new this(e, config)
    })
  }

  static #elementMap = new Map()

  static #set(element, instance) {
    if (!this.#elementMap.has(element)) {
      this.#elementMap.set(element, instance)
    } 
  }

  static #get(element) {
    if (this.#elementMap.has(element)) {
      return this.#elementMap.get(element)
    }

    return null
  }

  static #remove(element) {
    if (this.#elementMap.has(element)) {
      this.#elementMap.delete(element)
    }
  }

  static getOrCreateInstance(element, config) {
    return this.#get(element) || new this(element, config)
  }

}
  