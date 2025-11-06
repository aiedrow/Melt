/*!
 * Melt v3 (https://expo.aiedrow.co.in/Melt/)
 * Copyright 2019-2022 Aiedrow.co.in
 * Licensed under MIT (https://github.com/aiedrow/Melt/blob/master/LICENSE)
 * Fixes applied: event handling, animation, ajax, DOM utils, chaining, safety guards
 !*/

const Melt = (function () {

  //Core Selector Utility
  const $ = function (selector) {
    if (!(this instanceof $)) return new $(selector);

    // $(fn) -> DOM ready
    if (typeof selector === "function") {
      if (document.readyState !== "loading") selector();
      else document.addEventListener("DOMContentLoaded", selector);
      this.elements = [];
      return this;
    }

    // NodeList, array, HTMLElement, or selector
    if (typeof selector === "string") {
      this.elements = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof NodeList || Array.isArray(selector)) {
      this.elements = Array.from(selector);
    } else if (selector instanceof HTMLElement || selector === window || selector === document) {
      this.elements = [selector];
    } else {
      this.elements = [];
    }

    return this;
  };


  //Prototype / Methods
  $.fn = $.prototype = {

    /* BASIC ITERATOR */
    each(callback) {
      this.elements.forEach((el, i) => callback.call(el, i, el));
      return this;
    },

    /* EVENT SYSTEM */
    on(event, callback, options = false) {
      return this.each((i, el) => el.addEventListener(event, callback, options));
    },
    off(event, callback) {
      return this.each((i, el) => el.removeEventListener(event, callback));
    },

    trigger(eventName, detail = {}) {
      return this.each((i, el) =>
        el.dispatchEvent(new CustomEvent(eventName, { bubbles: true, cancelable: true, detail }))
      );
    },

    /* SHORTCUT EVENTS */
    click(cb) { return cb ? this.on("click", cb) : this.trigger("click"); },
    dblclick(cb) { return this.on("dblclick", cb); },
    keypress(cb) { return this.on("keypress", cb); },
    keydown(cb) { return this.on("keydown", cb); },
    keyup(cb) { return this.on("keyup", cb); },
    change(cb) { return this.on("change", cb); },
    submit(cb) { return this.on("submit", cb); },
    focus(cb) { return cb ? this.on("focus", cb) : (this.elements[0]?.focus(), this); },
    blur(cb) { return cb ? this.on("blur", cb) : (this.elements[0]?.blur(), this); },

    // Window-only events
    resize(cb) { if (this.elements[0] === window) window.addEventListener("resize", cb); return this; },
    scroll(cb) { if (this.elements[0] === window) window.addEventListener("scroll", cb); return this; },

    /* SHOW / HIDE */
    show() { return this.each((i, el) => el.style.display = ""); },
    hide() { return this.each((i, el) => el.style.display = "none"); },
    toggle() {
      return this.each((i, el) =>
        el.style.display = (getComputedStyle(el).display === "none" ? "" : "none")
      );
    },

    //FADING ANIMATIONS (fixed opacity type issue)    
   fadeIn(duration = 400, callback) {
      return this.each((i, el) => {
        el.style.opacity = 0;
        el.style.display = "";
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          el.style.opacity = p;
          if (p < 1) requestAnimationFrame(tick);
          else if (callback) callback.call(el);
        };
        requestAnimationFrame(tick);
      });
    },

    fadeOut(duration = 400, callback) {
      return this.each((i, el) => {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          el.style.opacity = 1 - p;
          if (p < 1) requestAnimationFrame(tick);
          else {
            el.style.display = "none";
            if (callback) callback.call(el);
          }
        };
        requestAnimationFrame(tick);
      });
    },

    fadeToggle(duration = 400, callback) {
      return this.each((i, el) =>
        getComputedStyle(el).display === "none"
          ? $(el).fadeIn(duration, callback)
          : $(el).fadeOut(duration, callback)
      );
    },


    // SLIDE ANIMATIONS (fixed height reset bug)
    slideDown(duration = 400, callback) {
      return this.each((i, el) => {
        el.style.overflow = "hidden";
        el.style.display = "";
        const target = el.scrollHeight;
        el.style.height = "0px";
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          el.style.height = (target * p) + "px";
          if (p < 1) requestAnimationFrame(tick);
          else {
            el.style.height = "";
            el.style.overflow = "";
            callback?.call(el);
          }
        };
        requestAnimationFrame(tick);
      });
    },

    slideUp(duration = 400, callback) {
      return this.each((i, el) => {
        const target = el.scrollHeight;
        el.style.overflow = "hidden";
        el.style.height = target + "px";
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          el.style.height = (target * (1 - p)) + "px";
          if (p < 1) requestAnimationFrame(tick);
          else {
            el.style.display = "none";
            el.style.height = "";
            el.style.overflow = "";
            callback?.call(el);
          }
        };
        requestAnimationFrame(tick);
      });
    },

    slideToggle(duration = 400, callback) {
      return this.each((i, el) =>
        getComputedStyle(el).display === "none"
          ? $(el).slideDown(duration, callback)
          : $(el).slideUp(duration, callback)
      );
    },


    /* GENERAL ANIMATION (fixed unit parsing crash + RAF tracking)*/
    animate(props, duration = 400, callback) {
      return this.each((i, el) => {
        const start = performance.now();
        const initial = {};
        const units = {};

        for (let prop in props) {
          const comp = getComputedStyle(el)[prop];
          const match = String(comp).match(/^([\d.]+)(.*)$/);
          initial[prop] = match ? parseFloat(match[1]) : 0;
          units[prop] = match ? match[2] : "px";
        }

        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          for (let prop in props) {
            const target = parseFloat(props[prop]);
            el.style[prop] = (initial[prop] + (target - initial[prop]) * p) + units[prop];
          }
          if (p < 1) {
            el._meltRAF = requestAnimationFrame(tick);
          } else callback?.call(el);
        };
        el._meltRAF = requestAnimationFrame(tick);
      });
    },

    stop() {
      return this.each((i, el) => {
        if (el._meltRAF) cancelAnimationFrame(el._meltRAF);
      });
    },


    /* HTML / TEXT / ATTR */
    html(v) { return v === undefined ? this.elements[0]?.innerHTML : this.each((i, e) => e.innerHTML = v); },
    text(v) { return v === undefined ? this.elements[0]?.textContent : this.each((i, e) => e.textContent = v); },
    val(v) { return v === undefined ? this.elements[0]?.value : this.each((i, e) => e.value = v); },

    attr(name, value) {
      if (value === undefined) return this.elements[0]?.getAttribute(name);
      return this.each((i, el) => el.setAttribute(name, value));
    },
    removeAttr(name) { return this.each((i, el) => el.removeAttribute(name)); },

    prop(name, value) {
      if (value === undefined) return this.elements[0]?.[name];
      return this.each((i, el) => el[name] = value);
    },

    addClass(c) { return this.each((i, el) => el.classList.add(...c.split(" "))); },
    removeClass(c) { return this.each((i, el) => el.classList.remove(...c.split(" "))); },
    toggleClass(c) { return this.each((i, el) => el.classList.toggle(c)); },
    hasClass(c) { return this.elements[0]?.classList.contains(c); },

    css(prop, value) {
      if (typeof prop === "object") return this.each((i, el) => Object.assign(el.style, prop));
      if (value === undefined) return getComputedStyle(this.elements[0] ?? {})[prop];
      return this.each((i, el) => el.style[prop] = value);
    },

    width(v) { return v === undefined ? this.elements[0]?.offsetWidth : this.css("width", typeof v === "number" ? v + "px" : v); },
    height(v) { return v === undefined ? this.elements[0]?.offsetHeight : this.css("height", typeof v === "number" ? v + "px" : v); },


    /* DOM INSERTION */
    append(content) {
      return this.each((i, el) => {
        if (typeof content === "string") el.insertAdjacentHTML("beforeend", content);
        else el.append(content instanceof $ ? content.elements[0] : content);
      });
    },

    prepend(content) {
      return this.each((i, el) => {
        if (typeof content === "string") el.insertAdjacentHTML("afterbegin", content);
        else el.prepend(content instanceof $ ? content.elements[0] : content);
      });
    },

    before(content) {
      return this.each((i, el) => {
        if (typeof content === "string") el.insertAdjacentHTML("beforebegin", content);
        else el.before(content instanceof $ ? content.elements[0] : content);
      });
    },

    after(content) {
      return this.each((i, el) => {
        if (typeof content === "string") el.insertAdjacentHTML("afterend", content);
        else el.after(content instanceof $ ? content.elements[0] : content);
      });
    },

    remove() { return this.each((i, el) => el.remove()); },
    empty() { return this.each((i, el) => el.innerHTML = ""); },


    /* DOM TRAVERSAL */
    parent() { return $(this.elements.map(e => e.parentElement).filter(Boolean)); },

    parents(selector) {
      const result = [];
      this.each((i, el) => {
        let p = el.parentElement;
        while (p) {
          if (!selector || p.matches(selector)) result.push(p);
          p = p.parentElement;
        }
      });
      return $(result);
    },

    children(selector) {
      const res = [];
      this.each((i, el) => {
        const kids = [...el.children];
        res.push(...(selector ? kids.filter(c => c.matches(selector)) : kids));
      });
      return $(res);
    },

    find(sel) {
      const res = [];
      this.each((i, el) => res.push(...el.querySelectorAll(sel)));
      return $(res);
    },

    siblings(selector) {
      const res = [];
      this.each((i, el) => {
        const sibs = [...el.parentElement.children].filter(s => s !== el);
        res.push(...(selector ? sibs.filter(s => s.matches(selector)) : sibs));
      });
      return $(res);
    },

    next(selector) {
      const res = this.elements.map(e => e.nextElementSibling).filter(Boolean);
      return $(selector ? res.filter(e => e.matches(selector)) : res);
    },

    prev(selector) {
      const res = this.elements.map(e => e.previousElementSibling).filter(Boolean);
      return $(selector ? res.filter(e => e.matches(selector)) : res);
    },

    first() { return $(this.elements[0] ?? []); },
    last() { return $(this.elements[this.elements.length - 1] ?? []); },
    eq(i) { return $(this.elements[i] ?? []); },

    filter(sel) {
      return $(typeof sel === "function"
        ? this.elements.filter(sel)
        : this.elements.filter(e => e.matches(sel))
      );
    },

    not(sel) {
      return $(typeof sel === "function"
        ? this.elements.filter((el, i) => !sel(i, el))
        : this.elements.filter(el => !el.matches(sel))
      );
    },

    is(sel) {
      if (sel === ":visible") {
        return this.elements.some(el => el.offsetWidth > 0 || el.offsetHeight > 0);
      }
      if (sel === ":hidden") {
        return this.elements.some(el => el.offsetWidth === 0 && el.offsetHeight === 0);
      }
      return this.elements.some(el => el.matches(sel));
    },

    visible() {
      const el = this.elements[0];
      return !!el && (el.offsetWidth > 0 || el.offsetHeight > 0);
    }

  }; // end prototype



  $.ajax = function (opts) {
    const config = Object.assign({
      method: "GET",
      url: "",
      data: null,
      headers: {},
      success: () => {},
      error: () => {}
    }, opts);

    let url = config.url;

    // Handle GET ?query
    if (config.method.toUpperCase() === "GET" && config.data && typeof config.data === "object") {
      const qs = new URLSearchParams(config.data).toString();
      url += (url.includes("?") ? "&" : "?") + qs;
    }

    return fetch(url, {
      method: config.method,
      headers: config.headers,
      body: config.method.toUpperCase() === "GET" ? null : JSON.stringify(config.data)
    })
    .then(res => {
      const type = res.headers.get("content-type") || "";
      return type.includes("application/json") ? res.json() : res.text();
    })
    .then(data => config.success(data))
    .catch(err => config.error(err));
  };

  $.get = (url, success) => $.ajax({ url, success });
  $.post = (url, data, success) => $.ajax({ method: "POST", url, data, success });


  $.noConflict = function () {
    window.$ = window._$;
    return $;
  };

  if (window.$) window._$ = window.$;
  window.$ = window.Melt = $;
  return $;

})();
