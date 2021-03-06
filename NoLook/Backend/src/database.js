"use strict"

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */
class DatabaseFactory {
    /**
     * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
     * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
     * auch gleich die Verbindung hergestellt.
     *
     * @param {String} connectionUrl URL-String mit den Verbindungsdaten
     */
    async init(connectionUrl) {
        // Datenbankverbindung herstellen
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("terminedb");

        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlegen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
    async _createDemoData() {
        let termine = this.database.collection("termine");

        if (await termine.estimatedDocumentCount() === 0) {
            termine.insertMany([
                {
                    title: "Mittagessen",
                    date: "07.05.2022 14:00:00",
                    duration: 60,
                    kind: "termin",
                },
                {
                    title: "Fussball",
                    date: "07.05.2022 10:00:00",
                    duration: 120,
                    kind: "termin",
                },
                {
                    title: "Lernen",
                    date: "07.05.2022 00:00:00",
                    duration: 0,
                    kind: "todo",
                },
                {
                    title: "Bus",
                    date: "08.05.2022 09:00:00",
                    duration: 60,
                    kind: "termin",
                },
                {
                    title: "Frühstück",
                    date: "08.05.2022 08:00:00",
                    duration: 60,
                    kind: "termin",
                },
            ]);
        }
    }
}

export default new DatabaseFactory();
