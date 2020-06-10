import "tingle.js/dist/tingle.min.css";
import { modal as Modal } from "tingle.js";

class DaliaClient {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.currentPage = options.currentPage;
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

  _setupModal() {
    const template = `<div>
      <h2>Not ready to apply for positions we have?</h2>
      <p>We will keep you posted on updates</p>
      <form method="POST" action="//dalia-ca.goodniceweb.me/subscribe?apiKey=${this.apiKey}">
        <input id="dalia-email" name="dalia-email" placeholder="your@email.com" />
      </form>
      <p>We won't send you any spam. <strong>Ever</strong></p>
    </div>`;
    const modal = new Modal({ footer: true });
    modal.addFooterBtn("Cancel", "tingle-btn tingle-btn--danger", () =>
      modal.close()
    );
    modal.addFooterBtn("Submit", "tingle-btn tingle-btn--primary", () => {
      // TODO: get email from input and send it to a correct url
      //       add some data to localStorage
      modal.close();
    });
    modal.setContent(template);
    return modal;
  }

  _shouldAddEventListener() {
    return this.currentPage || this._pathMatches();
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
}

export default DaliaClient;
