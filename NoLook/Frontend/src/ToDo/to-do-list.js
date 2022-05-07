"use strict";

import Page from "../page.js";
import HtmlTemplate from "./to-do-list.html";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */

var data;

export default class PageList extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;
        this._dataset = {
            title:"humlae", 
            date: "25.08.2000",
            duration: 30,
            kind: "termin"
        }
    }

    /**
     * HTML-Inhalt und anzuzeigende Daten laden.
     *
     * HINWEIS: Durch die geerbte init()-Methode wird `this._mainElement` mit
     * dem <main>-Element aus der nachgeladenen HTML-Datei versorgt. Dieses
     * Element wird dann auch von der App-Klasse verwendet, um die Seite
     * anzuzeigen. Hier muss daher einfach mit dem üblichen DOM-Methoden
     * `this._mainElement` nachbearbeitet werden, um die angezeigten Inhalte
     * zu beeinflussen.
     *
     * HINWEIS: In dieser Version der App wird mit dem üblichen DOM-Methoden
     * gearbeitet, um den finalen HTML-Code der Seite zu generieren. In größeren
     * Apps würde man ggf. eine Template Engine wie z.B. Nunjucks integrieren
     * und den JavaScript-Code dadurch deutlich vereinfachen.
     */
    async init() {
        // HTML-Inhalt nachladen
        await super.init();

        data = await this._app.backend.fetch("GET", "/termine");
        
       
        
        
        for (var datensatz in data) {
            let dataset = data[datensatz];
            if(dataset.kind=="todo"){
            
                let text = this._mainElement.querySelector(".toDos");
                var input = document.createElement("textarea");
                input.value=dataset.title;
                text.appendChild(input)


            } 

        }


        /////////////////////////////////////////////////////
        this._url = `/terminedb/termine`;
        let TestButton = this._mainElement.querySelector(".underTabs");
       TestButton.addEventListener("click", () => this._save());



    }

    async _save() {
        await this._app.backend.fetch("PUT", this._url, {body: this._dataset});
    //    await this.app.backend.fetch("PUT", this._url, {body: this._dataset});
        alert("Test");
        
    }
  
};
