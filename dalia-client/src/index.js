import "tingle.js/dist/tingle.min.css";
import { modal as Modal } from "tingle.js";

class DaliaClient {
  constructor(options) {
    this.modal = null;
    this.apiKey = options.apiKey;
    this.currentPage = options.currentPage;
    this.localStorageKey = options.localStorageKey || "dalia-email-sent";
    this.formId = options.formId || "dalia-form";
    this.formEmail = options.formEmail || "dalia-email";
    this.pages = options.pages || Array(options.page || ".*/careers.*");
    this.regexpKeys = options.regexpKeys || "gi";
    this.targetEvent = "mouseleave";
    if (this._shouldAddEventListener()) {
      document.addEventListener(this.targetEvent, this.handleExit);
    }
  }

  handleExit = (e) => {
    const modal = this._setupModal();
    if (this._userClosingPage(e)) {
      modal.open();
      document.removeEventListener(this.targetEvent, this.handleExit);
    }
  };

  handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const url = `//127.0.0.1:3000/api/v1/subscribe`;
    const method = "post";
    const body = JSON.stringify({
      api_key: this.apiKey,
      email: this._getEmail(),
    });
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "Content-Type",
        "Access-Control-Request-Method": "POST",
      },
      mode: "cors",
      cache: "no-cache",
      method,
      body,
    })
      .then((response) => {
        localStorage.setItem(this.localStorageKey, "true");
        this.modal.close();
        console.log("success subscription", response);
      })
      .catch((e) => {
        this.modal.close();
        console.error("subscription was not succeed", e);
      });
  };

  _setupModal() {
    const template = `<div>
      <h2>Not ready to apply for positions we have?</h2>
      <p>We will keep you posted on updates</p>
      <form id="${this.formId}" method="POST" action="//127.0.0.1:3000/api/v1/subscribe?api_key=${this.apiKey}">
        <input id="${this.formEmail}" name="dalia-email" type="email" required placeholder="your@email.com" />
      </form>
      <p>We won't send you any spam. <strong>Ever</strong></p>
    </div>`;
    this.modal = new Modal({
      footer: true,
      onOpen: () =>
        this._getForm().addEventListener("submit", this.handleSubmit),
      onClose: () =>
        this._getForm().removeEventListener("submit", this.handleSubmit),
    });
    this.modal.addFooterBtn("Cancel", "tingle-btn tingle-btn--danger", () =>
      modal.close()
    );
    this.modal.addFooterBtn("Submit", "tingle-btn tingle-btn--primary", () => {
      this.handleSubmit();
    });
    this.modal.setContent(template);
    return this.modal;
  }

  _shouldAddEventListener() {
    return (
      !localStorage.getItem(this.localStorageKey) &&
      (this.currentPage || this._pathMatches())
    );
  }

  _pathMatches() {
    const { pathname } = window.location;
    return this.pages.some((page) => {
      if (page === pathname) {
        return true;
      }
      const regex = new RegExp(page);
      return regex.test(pathname);
    });
  }

  _userClosingPage(e) {
    return e.pageY - window.scrollY <= 1;
  }

  _getForm() {
    return document.getElementById(this.formId);
  }

  _getEmail() {
    return document.getElementById(this.formEmail).value;
  }
}

export default DaliaClient;
